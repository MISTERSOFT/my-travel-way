import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { mapTo, skipWhile } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateRoute();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateRoute();
  }

  private canActivateRoute() {
    if (!this.auth.isAuthentificated) {
      this.router.navigateByUrl('/signin');
      return false;
    }
    // Whether the user is auth but don't have his details we wait until we retrieve user data from firebase
    return this.auth.authState$.pipe(skipWhile(u => !u), mapTo(true));
  }
}
