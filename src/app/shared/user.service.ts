import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  private static readonly USER = 'user';

  setUser(user: string): void {
    localStorage.setItem(UserService.USER, user);
  }

  getUser(): string {
    return localStorage.getItem(UserService.USER);
  }

  removeUser(): void {
    localStorage.removeItem(UserService.USER);
  }
}
