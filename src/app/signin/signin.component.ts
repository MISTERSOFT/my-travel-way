import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithFacebook();
  }

  logout() {
    this.auth.logout();
  }

}
