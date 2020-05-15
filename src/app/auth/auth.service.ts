import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { AuthData, AuthStatus } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { UserService } from '../shared/user.service';
import * as fromApp from '../store/app.reducer';
import * as UiActions from '../shared/store/ui.actions';
import * as AuthActions from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
  private authStatus = AuthStatus.IDLE;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService,
              private store: Store<fromApp.AppState>,
              private userService: UserService) {
  }

  initAuthListener(): void {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userService.setUser(user.email);
        this.finalizeAuthentication(AuthStatus.AUTHENTICATED);
      } else {
        this.trainingService.cancelSubscriptions();
        this.finalizeAuthentication(AuthStatus.UNAUTHENTICATED);
      }
    });
  }

  signup(authData: AuthData): void {
    this.store.dispatch(UiActions.startLoading());
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.handleAuthentication(authData.email);
      })
      .catch(this.handleError.bind(this));
  }

  login(authData: AuthData): void {
    this.store.dispatch(UiActions.startLoading());
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.handleAuthentication(authData.email);
      })
      .catch(this.handleError.bind(this));
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  private finalizeAuthentication(authStatus: AuthStatus) {
    this.authStatus = authStatus;
    this.store.dispatch(AuthActions.setAuthenticationStatus({authStatus}));
    if (authStatus === AuthStatus.AUTHENTICATED) {
      this.router.navigate(['/training']);
    } else if (authStatus === AuthStatus.UNAUTHENTICATED) {
      this.router.navigate(['/login']);
    }
  }

  private handleAuthentication(email: string): void {
    this.userService.setUser(email);
    this.store.dispatch(UiActions.stopLoading());
  }

  private handleError(error: any): void {
    this.store.dispatch(UiActions.stopLoading());
    this.uiService.showSnackbar(error.message, 'Dismiss', 7000);
  }
}
