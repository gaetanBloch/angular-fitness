import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UiService,
              private store: Store<{ app: fromApp.State }>) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map(state => state.app.isLoading));

    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });

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
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
