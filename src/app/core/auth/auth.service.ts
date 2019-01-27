import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private _isAuthentificated$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<auth.UserCredential>(null);

  get isAuthentificated$() {
    return this._isAuthentificated$.asObservable();
  }

  get user$() {
    return this._user$.asObservable();
  }

  constructor(private afAuth: AngularFireAuth) {
    afAuth.auth.useDeviceLanguage();
  }

  async loginWithFacebook() {
    try {
      const result = await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
      this.setAuth(result);
    } catch (err) {
      console.log(`[${err.code}] : ${err.message}`);
      this.setAuth(null);
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.setAuth(null));
  }

  private setAuth(authUser: auth.UserCredential) {
    if (authUser) {
      this._user$.next(authUser);
      this._isAuthentificated$.next(true);
    } else {
      this._user$.next(null);
      this._isAuthentificated$.next(false);
    }
  }
}
