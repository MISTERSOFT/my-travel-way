import { Component } from '@angular/core';
import { GeolocationService } from '@app/core/navigator';
import { MapComponent } from './../../map.component';

@Component({
  selector: 'app-map-geolocation-control',
  templateUrl: 'geolocation.component.html',
  styleUrls: ['geolocation.component.scss']
})

export class MapGeolocationControlComponent {
  // private _map: Mapbox.Map;
  constructor(private parent: MapComponent, private geolocation: GeolocationService) {
    // this._map = parent.map;
  }

  geolocate() {
    this.geolocation.currentPositionOnce$.subscribe(({ coords }) => {
      this.parent.map.easeTo({
        center: [coords.longitude, coords.latitude]
      });
    });
  }
}
