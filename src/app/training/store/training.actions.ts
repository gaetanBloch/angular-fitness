import { createAction, props } from '@ngrx/store';

import { Exercise } from '../exercise.model';

export const setAvailableExercises = createAction(
  '[Training] SET AVAILABLE EXERCISES',
  props<{ exercises: Exercise[] }>()
);

export const setPastExercises = createAction(
  '[Training] SET PAST EXERCISES',
  props<{ exercises: Exercise[] }>()
);

export const startExercise = createAction(
  '[Training] START EXERCISE',
  props<{ id: string }>()
);

export const stopExercise = createAction(
  '[Training] STOP EXERCISE'
);
