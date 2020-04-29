import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar) {
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
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then((user) => {
        console.log(user);
      })
      .catch(this.handleError.bind(this));
  }

  login(authData: AuthData): void {
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then((user) => {
        console.log(user);
      })
      .catch(this.handleError.bind(this));
  }

  logout(): void {
    this.fireAuth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private handleError(error: any): void {
    this.snackBar.open(error.message, 'Dismiss', {
      duration: 7000
    });
  }
}
