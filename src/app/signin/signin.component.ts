import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginWithFacebook()
    // TODO: Redirect after login
    .then(() => this.router.navigateByUrl('/books'));
  }

}
