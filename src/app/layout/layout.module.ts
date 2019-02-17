import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ToolbarActionsComponent, ToolbarSearchButtonComponent } from './toolbar';


@NgModule({
  imports: [
    PortalModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PortalModule,
    ToolbarActionsComponent
  ],
  declarations: [
    ToolbarSearchButtonComponent,
    ToolbarActionsComponent
  ],
  entryComponents: [
    ToolbarSearchButtonComponent,
    ToolbarActionsComponent
  ],
  providers: [],
})
export class LayoutModule { }
