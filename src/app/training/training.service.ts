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

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  startExercise(id: string): void {
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseChanged.next({...this.runningExercise});
  }
}
