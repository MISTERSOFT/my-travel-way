import { TemplatePortal } from '@angular/cdk/portal';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CdkPortalService } from '@app/layout';

@Component({
  selector: 'app-toolbar-actions',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class ToolbarActionsComponent implements OnInit {
  @ViewChild(TemplateRef) _templateContent: TemplateRef<any>;
  private _contentPortal: TemplatePortal;

  constructor(private _viewContainerRef: ViewContainerRef, private cdkPortal: CdkPortalService) { }

  ngOnInit() {
    this._contentPortal = new TemplatePortal(this._templateContent, this._viewContainerRef);
    this.cdkPortal.attachToHeader(this._contentPortal);
  }
}
