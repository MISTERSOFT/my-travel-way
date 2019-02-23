import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToolbarService } from '@app/layout/toolbar';
import { PlaceForwardGeocodingModel } from '@app/shared/models';
import { MapService } from '../../map.service';

@Component({
  selector: 'app-map-searchbar-control',
  templateUrl: 'searchbar.component.html',
  styleUrls: ['searchbar.component.scss'],
  animations: [
    trigger('closedOpenOpenwide', [
      state('closed', style({
        // bottom: '-114px',
        bottom: '0px',
        top: 'calc(100% - 0px)',
        // height: 'auto',
        // borderTopLeftRadius: '10px',
        // borderTopRightRadius: '10px',
      })),
      state('opened', style({
        bottom: '0px',
        top: 'calc(100% - 92px)'
        // height: 'auto',
        // borderTopLeftRadius: '10px',
        // borderTopRightRadius: '10px',
      })),
      state('openedWide', style({
        // height: 'calc(100% - 72px)'
        top: '56px',
        // bottom: '0px',
        // height: 'calc(100% - 56px)',
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
      })),
      transition('closed <=> opened', [ animate('0.2s') ]),
      transition('opened <=> openedWide',  [ animate('0.2s ease-in-out') ]),
      transition('openedWide => closed', [ animate('0.2s') ]),
    ])
  ]
})

export class MapSearchbarControlComponent implements OnInit {
  @Output() onResultItemTapped = new EventEmitter<PlaceForwardGeocodingModel>();

  searchValue: string;
  isOpen = false;
  get isOpenWide() {
    return this.isOpen && this._hasResults;
  }
  results: PlaceForwardGeocodingModel[];

  private _hasResults = false;

  constructor(private api: MapService, private toolbar: ToolbarService) { }
  ngOnInit() {
    this.toolbar.isSearchBarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (!isOpen) {
        this._hasResults = false;
        this.searchValue = '';
      }
    });
  }

  search() {
    this.api.searchLocation(this.searchValue).subscribe((results) => {
      this._hasResults = true;
      console.log('after', results);
      this.results = results;
      // if (result.features.length > 0) {
      //   const coords = result.features[0].geometry['coordinates'];
      //   this.createMarker(coords);
      //   // Go to the created point
      //   this.map.flyTo({
      //     center: coords,
      //     zoom: 14,
      //     speed: 3
      //   });
      // }
    });
  }

  clear() {
    this.searchValue = '';
  }

  itemTapped(place: PlaceForwardGeocodingModel) {
    this.onResultItemTapped.next(place);
    this.toolbar.isSearchBarOpen$.next(false);
  }
}
