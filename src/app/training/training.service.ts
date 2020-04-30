import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Exercise, ExerciseDoc } from './exercise.model';
import { UiService } from '../shared/ui.service';
import * as fromTraining from '../training/store/training.reducer';
import * as UiActions from '../shared/store/ui.actions';
import * as TrainingActions from '../training/store/training.actions';

@Injectable({providedIn: 'root'})
export class TrainingService {
  static readonly PAST_EXERCISES = 'pastExercises';

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromTraining.State>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(UiActions.startLoading());
    this.firebaseSubscriptions.push(this.firestore
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as ExerciseDoc)
            };
          });
        }))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(UiActions.stopLoading());
        this.store.dispatch(TrainingActions.setAvailableExercises({exercises}));
      }, error => {
        this.store.dispatch(UiActions.stopLoading());
        this.store.dispatch(TrainingActions.setAvailableExercises({exercises: null}));
        this.uiService.showSnackbar(
          'Fetching exercise failed, please try again later',
          'Dismiss',
          5000
        );
      }));
  }

  startExercise(id: string): void {
    this.store.dispatch(TrainingActions.startExercise({id}));
  }

  completeExercise(): void {
    this.addDataToFirestore({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(TrainingActions.stopExercise());
  }

  cancelExercise(progress: number): void {
    this.addDataToFirestore({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(TrainingActions.stopExercise());
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  fetchPastExercises(): void {
    this.firebaseSubscriptions.push(this.firestore
      .collection(TrainingService.PAST_EXERCISES).valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(TrainingActions.setPastExercises({exercises}));
      }));
  }

  cancelSubscriptions(): void {
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToFirestore(exercise: Exercise): void {
    this.firestore.collection(TrainingService.PAST_EXERCISES).add(exercise);
  }
}
