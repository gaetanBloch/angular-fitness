import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from '../shared/store/ui.reducer';

export interface AppState {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
