import { Action, createReducer, on } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import * as fromApp from '../../store/app.reducer';
import * as TrainingActions from './training.actions';

export interface TrainingState {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  runningExercise: Exercise;
}

export interface State extends fromApp.AppState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  pastExercises: [],
  runningExercise: null
};

const reducer = createReducer(
  initialState,
  on(TrainingActions.setAvailableExercises, (state, action) => ({
    ...state,
    availableExercises: action.exercises
  })),
  on(TrainingActions.setPastExercises, (state, action) => ({
    ...state,
    pastExercises: action.exercises
  })),
  on(TrainingActions.startExercise, (state, action) => ({
    ...state,
    runningExercise: action.exercise
  })),
  on(TrainingActions.stopExercise, state => ({
    ...state,
    runningExercise: null
  }))
);

export function trainingReducer(trainingState: TrainingState | undefined, action: Action) {
  return reducer(trainingState, action);
}
