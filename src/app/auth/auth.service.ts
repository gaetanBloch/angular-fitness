import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

import { AuthData, AuthStatus } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<AuthStatus>();
  private authStatus = AuthStatus.IDLE;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService) {
  }

  initAuthListener(): void {
    this.authChange.next(AuthStatus.IDLE);
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.authStatus = AuthStatus.AUTHENTICATED;
        this.authChange.next(AuthStatus.AUTHENTICATED);
        this.router.navigate(['']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authStatus = AuthStatus.UNAUTHENTICATED;
        this.authChange.next(AuthStatus.UNAUTHENTICATED);
        this.router.navigate(['']);
      }
    });
  }

  signup(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(this.handleAuthentication.bind(this))
      .catch(this.handleError.bind(this));
  }

  login(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(this.handleAuthentication.bind(this))
      .catch(this.handleError.bind(this));
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  isAuth(): boolean {
    return this.authStatus === AuthStatus.AUTHENTICATED;
  }

  private handleAuthentication(): void {
    this.uiService.loadingStateChanged.next(false);
  }

  private handleError(error: any): void {
    this.uiService.loadingStateChanged.next(false);
    this.uiService.showSnackbar(error.message, 'Dismiss', 7000);
  }
}
