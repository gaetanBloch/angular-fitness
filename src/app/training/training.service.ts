import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise, ExerciseDoc } from './exercise.model';
import { UiService } from '../shared/ui.service';

@Injectable({providedIn: 'root'})
export class TrainingService {
  static readonly PAST_EXERCISES = 'pastExercises';

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private firestore: AngularFirestore, private uiService: UiService) {
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
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
        this.uiService.loadingStateChanged.next(false);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }));
  }

  startExercise(id: string): void {
    // This is how to select a specific document and update it (we can set and delete too)
    // this.firestore.doc('availableExercises/' + id).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(): void {
    this.addDataToFirestore({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.addDataToFirestore({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise(): Exercise {
    return {...this.runningExercise};
  }

  fetchPastExercises(): void {
    this.firebaseSubscriptions.push(this.firestore
      .collection(TrainingService.PAST_EXERCISES).valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.pastExercisesChanged.next(exercises);
      }));
  }

  cancelSubscriptions(): void {
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToFirestore(exercise: Exercise): void {
    this.firestore.collection(TrainingService.PAST_EXERCISES).add(exercise);
  }
}
