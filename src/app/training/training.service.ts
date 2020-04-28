import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

@Injectable({providedIn: 'root'})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises = [
    new Exercise('crunches', 'Crunches', 30, 8),
    new Exercise('touch-toes', 'Touch Toes', 180, 15),
    new Exercise('side-lunges', 'Side Lunges', 120, 18),
    new Exercise('burpees', 'Burpees', 60, 8),
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  startExercise(id: string): void {
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(): void {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.exercises.push({
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
}
