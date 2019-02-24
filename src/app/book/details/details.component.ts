import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Map } from 'mapbox-gl';
import { MapComponent } from '@app/shared/map/map.component';
import { PlaceForwardGeocodingModel } from '@app/shared/models';
import { ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: 'details.component.html'
})

export class BookDetailsComponent implements OnInit {
  private _bookId: string;
  private _mapInit$ = new ReplaySubject();

  // places$: Observable<PlaceForwardGeocodingModel[]>;
  places: PlaceForwardGeocodingModel[];

  @ViewChild(MapComponent) $map: MapComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: BookService,
  ) {
    this._bookId = route.snapshot.paramMap.get('bookId');
    if (!this._bookId) {
      router.navigate(['/books']);
    }
  }

  ngOnInit() {
    this.api.getBookPlaces$(this._bookId)
      .pipe(
        tap(places => this.places = places),
        switchMap(() => this._mapInit$)
      )
      .subscribe(() => {
        console.log('places fetched', this.places);
        this.$map.addUserPlaces(<any>this.places);
      });
  }

  onMapInit() {
    this._mapInit$.next();
  }

  addPlace(place: PlaceForwardGeocodingModel) {
    this.api.addPlace(this._bookId, place);
  }
}
