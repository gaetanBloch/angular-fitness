import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

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

const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getPastExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.pastExercises
);
export const getRunningExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.runningExercise
);


