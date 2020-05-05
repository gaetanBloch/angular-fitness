import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  private static readonly USER = 'user';

  setUser(user: string): void {
    sessionStorage.setItem(UserService.USER, user);
  }

  getUser(): string {
    return sessionStorage.getItem(UserService.USER);
  }

  removeUser(): void {
    sessionStorage.removeItem(UserService.USER);
  }
}
