import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

@Injectable({providedIn: 'root'})
export class TrainingService {
  availableExercises = [
    new Exercise('crunches', 'Crunches', 30, 8),
    new Exercise('touch-toes', 'Touch Toes', 180, 15),
    new Exercise('side-lunges', 'Side Lunges', 120, 18),
    new Exercise('burpees', 'Burpees', 60, 8),
  ];
}
