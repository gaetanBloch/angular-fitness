import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { AuthStatus } from '../../auth/auth-data.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSideNav = new EventEmitter<void>();
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeSideNav.emit();
  }

  onLogout(): void {
    this.onClose();
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

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
