import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { LocalStorage } from 'ngx-store';
import { BehaviorSubject, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private _authState$ = new BehaviorSubject<firebase.User>(null);
  @LocalStorage('is_authentificated') private _isAuthentificated: boolean;
  private _destroy$ = new Subject();

  get isAuthentificated(): boolean {
    return this._isAuthentificated;
  }
  get authState$() {
    return this._authState$.asObservable();
  }
  get user() {
    return this._authState$.getValue();
  }

  constructor(private afAuth: AngularFireAuth) {
    afAuth.auth.useDeviceLanguage();
    afAuth.authState.pipe(first(), takeUntil(this._destroy$)).subscribe(authState => {
      if (authState) {
        this._authState$.next(authState);
        this._isAuthentificated = true;
      } else {
        this._isAuthentificated = false;
      }
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  async loginWithFacebook() {
    try {
      await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } catch (err) {
      console.log(`[${err.code}] : ${err.message}`);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      this._isAuthentificated = false;
    });
  }
}
