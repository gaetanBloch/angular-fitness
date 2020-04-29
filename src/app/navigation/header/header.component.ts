import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AuthStatus } from '../../auth/auth-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSideNav = new EventEmitter<void>();
  authStatus = AuthStatus.IDLE;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.authStatus = authStatus;
    });
  }

  onToggleSidenav(): void {
    this.toggleSideNav.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authStatus === AuthStatus.AUTHENTICATED;
  }

  isUnauthenticated(): boolean {
    return this.authStatus === AuthStatus.UNAUTHENTICATED;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
