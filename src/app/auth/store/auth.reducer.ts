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
  on(AuthActions.setAuthenticationStatus, (state, action) => ({
    ...state,
    authStatus: action.authStatus
  }))
);

export function authReducer(authState: State | undefined, action: Action) {
  return reducer(authState, action);
}

export const getAuthStatus = (state: State) => state.authStatus;
