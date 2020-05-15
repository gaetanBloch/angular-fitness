import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  private user: string;

  setUser(user: string): void {
    this.user = user;
  }

  getUser(): string {
    return this.user;
  }
}
