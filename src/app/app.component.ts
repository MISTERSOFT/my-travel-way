import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '@app/core/auth';
import { CdkPortalService } from '@app/layout/cdk-portal.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    public auth: AuthService,
    public cdkPortal: CdkPortalService
  ) {
    router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(event => {
      // Clear toolbar portal
      cdkPortal.dispose();
    });
  }

  logout(drawer: MatSidenav) {
    drawer.close();
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/signin');
    });
  }

  closeDrawer(drawer: MatSidenav) {
    drawer.close();
  }
}
