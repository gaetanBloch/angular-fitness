import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  signup(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
  }

  login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth(): boolean {
    return this.user != null;
  }
}
