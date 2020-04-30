import { createAction, props } from '@ngrx/store';
import { AuthStatus } from '../auth-data.model';

export const setAuthenticationStatus = createAction(
  '[Auth] SET AUTHENTICATION STATUS',
  props<{ authStatus: AuthStatus }>()
);
