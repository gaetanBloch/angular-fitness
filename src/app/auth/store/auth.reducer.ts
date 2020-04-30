import { Action, createReducer, on } from '@ngrx/store';

import { AuthStatus } from '../auth-data.model';
import * as AuthActions from './auth.actions';

export interface State {
  authStatus: AuthStatus;
}

const initialState: State = {
  authStatus: AuthStatus.IDLE,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticated, state => ({
    ...state,
    authStatus: AuthStatus.AUTHENTICATED
  })),
  on(AuthActions.setUnauthenticated, state => ({
    ...state,
    authStatus: AuthStatus.UNAUTHENTICATED
  }))
);

export function authReducer(uiState: State | undefined, action: Action) {
  return reducer(uiState, action);
}

export const getAuthStatus = (state: State) => state.authStatus;
