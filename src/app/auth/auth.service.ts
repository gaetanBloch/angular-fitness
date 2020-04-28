import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {
  }

  signup(authData: AuthData): void {
    this.authenticate(authData);
  }

  login(authData: AuthData): void {
    this.authenticate(authData);
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private authenticate(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
