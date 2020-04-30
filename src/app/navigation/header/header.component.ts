import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { AuthStatus } from '../../auth/auth-data.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }

  onToggleSidenav(): void {
    this.toggleSideNav.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

  isAuthenticated$(): Observable<boolean> {
    return this.store.select(fromApp.getAuthStatus).pipe(
      map(authStatus => authStatus === AuthStatus.AUTHENTICATED)
    );
  }

  isUnauthenticated$(): Observable<boolean> {
    return this.store.select(fromApp.getAuthStatus).pipe(
      map(authStatus => authStatus === AuthStatus.UNAUTHENTICATED)
    );
  }
}
