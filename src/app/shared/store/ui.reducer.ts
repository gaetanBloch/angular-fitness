import { Action, createReducer, on } from '@ngrx/store';

import * as UiActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

const reducer = createReducer(
  initialState,
  on(UiActions.startLoading, state => ({
    ...state,
    isLoading: true
  })),
  on(UiActions.stopLoading, state => ({
    ...state,
    isLoading: false
  }))
);

export function uiReducer(uiState: State | undefined, action: Action) {
  return reducer(uiState, action);
}

export const getIsLoading = (state: State) => state.isLoading;
