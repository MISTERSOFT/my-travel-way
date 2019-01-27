import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from '@app/core/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth: AuthService) { }

  logout(drawer: MatSidenav) {
    this.auth.logout();
    drawer.close();
  }
}
