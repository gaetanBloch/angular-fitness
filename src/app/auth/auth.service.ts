import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar,
              private uiService: UiService) {
  }

  initAuthListener(): void {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
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
    return this.isAuthenticated;
  }

  private handleAuthentication(): void {
    this.uiService.loadingStateChanged.next(false);
  }

  private handleError(error: any): void {
    this.uiService.loadingStateChanged.next(false);
    this.snackBar.open(error.message, 'Dismiss', {
      duration: 7000
    });
  }
}
