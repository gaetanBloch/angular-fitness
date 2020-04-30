import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthStatus } from './auth-data.model';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthStatus();
  }

  canLoad(route: Route, segments: UrlSegment[]):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthStatus();
  }

  private checkAuthStatus(): Observable<boolean> {
    return this.store.select(fromApp.getAuthStatus).pipe(
      take(1),
      map(authStatus => {
        if (authStatus === AuthStatus.AUTHENTICATED) {
          return true;
        }
        this.router.navigate(['']);
      })
    );
  }
}
