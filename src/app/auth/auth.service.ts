import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData, AuthStatus } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromApp from '../store/app.reducer';
import * as UiActions from '../shared/store/ui.actions';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<AuthStatus>();
  private authStatus = AuthStatus.IDLE;
  private firstOpening = true;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService,
              private store: Store<fromApp.AppState>) {
  }

  initAuthListener(): void {
    this.authChange.next(AuthStatus.IDLE);
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.finalizeAuthentication(AuthStatus.AUTHENTICATED);
      } else {
        this.trainingService.cancelSubscriptions();
        this.finalizeAuthentication(AuthStatus.UNAUTHENTICATED);
      }
    });
  }

  signup(authData: AuthData): void {
    this.store.dispatch(new UiActions.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(this.handleAuthentication.bind(this))
      .catch(this.handleError.bind(this));
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UiActions.StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(this.handleAuthentication.bind(this))
      .catch(this.handleError.bind(this));
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  isAuth(): boolean {
    return this.authStatus === AuthStatus.IDLE || this.authStatus === AuthStatus.AUTHENTICATED;
  }

  private handleAuthentication(): void {
    this.store.dispatch(new UiActions.StopLoading());
    // this.uiService.loadingStateChanged.next(false);
  }

  private handleError(error: any): void {
    this.store.dispatch(new UiActions.StopLoading());
    // this.uiService.loadingStateChanged.next(false);
    this.uiService.showSnackbar(error.message, 'Dismiss', 7000);
  }

  private finalizeAuthentication(authStatus: AuthStatus) {
    this.authStatus = authStatus;
    this.authChange.next(authStatus);
    if (this.firstOpening) {
      this.firstOpening = false;
    } else {
      this.router.navigate(['']);
    }
  }
}
