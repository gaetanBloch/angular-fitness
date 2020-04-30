import { Action } from '@ngrx/store';

interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export function appReducer(state: State | undefined, action: Action) {
  return state;
}
