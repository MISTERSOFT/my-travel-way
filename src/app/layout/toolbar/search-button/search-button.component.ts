import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolbarService } from '../toolbar.service';

@Component({
  selector: 'app-toolbar-search-button',
  templateUrl: 'search-button.component.html'
})

export class ToolbarSearchButtonComponent implements OnInit, OnDestroy {
  isClicked = false;
  private _sub: Subscription;
  constructor(private toolbar: ToolbarService) { }

  ngOnInit() {
    this._sub = this.toolbar.isSearchBarOpen$.subscribe(isOpen => this.isClicked = isOpen);
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  openSearchBar() {
    this.isClicked = !this.isClicked;
    this.toolbar.isSearchBarOpen$.next(this.isClicked);
  }
}
