import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from '../shared/store/ui.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getAuthStatus = createSelector(getAuthState, fromAuth.getAuthStatus);
