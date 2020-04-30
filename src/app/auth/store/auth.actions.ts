import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction(
  '[Auth] SET AUTHENTICATED'
);

export const setUnauthenticated = createAction(
  '[Auth] SET UNAUTHENTICATED'
);
