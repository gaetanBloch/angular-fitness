import { Action } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function uiReducer(state: State | undefined = initialState, action: Action) {
  switch (action.type) {
    case '[UI] START LOADING':
      return {
        isLoading: true
      };
    case '[UI] STOP LOADING':
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
