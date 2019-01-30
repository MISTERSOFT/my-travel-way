import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) { }

  logout(drawer: MatSidenav) {
    drawer.close();
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/signin');
    });
  }
}
