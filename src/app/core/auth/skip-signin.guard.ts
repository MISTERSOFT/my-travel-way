import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class SkipSigninGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.skipSigninIfAuth();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.skipSigninIfAuth();
  }

  private skipSigninIfAuth() {
    if (this.auth.isAuthentificated) {
      this.router.navigateByUrl('/map');
      return false;
    }
    return true;
  }
}
