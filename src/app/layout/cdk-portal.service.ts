import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Teleport component or template to another location on the app.
// Documentation: https://material.angular.io/cdk/portal/api
// This is why I made a specific module to use Portals : https://stackoverflow.com/a/51831884
@Injectable({ providedIn: 'root' })
export class CdkPortalService {
  readonly headerPortalComponent$ = new Subject<ComponentPortal<any>>();
  readonly headerPortal$ = new Subject<ComponentPortal<any>|TemplatePortal<any>>();

  attachToHeader(componentOrTemplate: ComponentType<any>|TemplatePortal<any>) {
    if (componentOrTemplate instanceof TemplatePortal) {
      this.headerPortal$.next(componentOrTemplate);
    } else {
      this.headerPortal$.next(new ComponentPortal(componentOrTemplate));
    }
  }

  dispose() {
    this.headerPortalComponent$.next(null);
  }

  // TODO:
  // * A method to clear the portal ?
}
