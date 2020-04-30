import { Action, createReducer, on } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import * as fromApp from '../../store/app.reducer';

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
  pastExercises: []
};

const reducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticationStatus, (state, action) => ({
    ...state,
    authStatus: action.authStatus
  }))
);

export function authReducer(uiState: State | undefined, action: Action) {
  return reducer(uiState, action);
}
