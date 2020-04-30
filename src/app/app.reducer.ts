import { Action } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function appReducer(state: State | undefined, action: Action) {
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
