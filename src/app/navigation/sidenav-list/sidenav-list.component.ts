import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { AuthStatus } from '../../auth/auth-data.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  authStatus = AuthStatus.IDLE;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.authStatus = authStatus;
    });
  }

  onClose(): void {
    this.closeSideNav.emit();
  }

  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }
}
