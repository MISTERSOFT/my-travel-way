import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private _isAuthentificated$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<firebase.User>(null);

  isAuthentificated$ = this._isAuthentificated$.asObservable();
  user$ = this._user$.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    afAuth.auth.useDeviceLanguage();

    this.catchLoginError = this.catchLoginError.bind(this);
  }

  loginWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then((result) => {
        console.log(`[user details]`, result);
        this.setAuth(result.user);
      })
      .catch(this.catchLoginError);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private setAuth(authUser: firebase.User) {
    if (authUser) {
      this._user$.next(authUser);
      this._isAuthentificated$.next(true);
    } else {
      this._user$.next(null);
      this._isAuthentificated$.next(false);
    }
  }

  private catchLoginError(err: { code: string, message: string }) {
    console.log(`[${err.code}] : ${err.message}`);
    this.setAuth(null);
  }
}
