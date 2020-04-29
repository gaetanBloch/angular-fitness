import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private uiSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.uiSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.authService.login(new AuthData(
      this.loginForm.value.email,
      this.loginForm.value.password
    ));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
