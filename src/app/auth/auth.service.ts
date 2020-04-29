import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private fireAuth: AngularFireAuth) {
  }

  signup(authData: AuthData): void {
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authenticate();
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authenticate();
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['']);
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private authenticate(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
