import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ToolbarSearchButtonComponent } from './toolbar';


@NgModule({
  imports: [
    PortalModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PortalModule
  ],
  declarations: [
    ToolbarSearchButtonComponent
  ],
  entryComponents: [
    ToolbarSearchButtonComponent
  ],
  providers: [],
})
export class LayoutModule { }
