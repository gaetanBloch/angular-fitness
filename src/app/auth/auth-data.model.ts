export class AuthData {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export enum AuthStatus {
  IDLE,
  AUTHENTICATED,
  UNAUTHENTICATED
}
