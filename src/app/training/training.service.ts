import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise, ExerciseDoc } from './exercise.model';

@Injectable({providedIn: 'root'})
export class TrainingService {
  static readonly PAST_EXERCISES = 'pastExercises';

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private firestore: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.firestore
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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(id: string): void {
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
    this.firestore.collection(TrainingService.PAST_EXERCISES).valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.pastExercisesChanged.next(exercises);
      });
  }

  private addDataToFirestore(exercise: Exercise): void {
    this.firestore.collection(TrainingService.PAST_EXERCISES).add(exercise);
  }
}
