import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Teleport component or template to another location on the app.
// Documentation: https://material.angular.io/cdk/portal/api
// This is why I made a specific module to use Portals : https://stackoverflow.com/a/51831884
@Injectable({ providedIn: 'root' })
export class CdkPortalService {
  readonly headerPortalComponent$ = new Subject<ComponentPortal<any>>();
  readonly headerPortal$ = new Subject<ComponentPortal<any>|TemplatePortal<any>>();

  attachToHeader(ref: any|TemplatePortal) {
    if (ref instanceof TemplatePortal) {
      this.headerPortal$.next(ref);
    } else {
      this.headerPortal$.next(new ComponentPortal(ref));
    }
  }

  dispose() {
    this.headerPortalComponent$.next(null);
  }

  // TODO:
  // * A method to clear the portal ?
}
