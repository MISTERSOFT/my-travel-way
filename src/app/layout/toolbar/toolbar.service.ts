import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  isSearchBarOpen$ = new Subject<boolean>();
  constructor() { }
}
