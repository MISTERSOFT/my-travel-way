import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Teleport component or template to another location on the app.
// Documentation: https://material.angular.io/cdk/portal/api
// This is why I made a specific module to use Portals : https://stackoverflow.com/a/51831884
@Injectable({ providedIn: 'root' })
export class CdkPortalService {
  readonly headerPortalComponent$ = new Subject<ComponentPortal<any>>();

  setComponentInPortal<T>(component: any) {
    this.headerPortalComponent$.next(new ComponentPortal(component));
  }

  // TODO:
  // * A method to clear the portal ?
}
