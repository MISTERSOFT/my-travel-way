import { Component } from '@angular/core';
import { MapComponent } from './../../map.component';

@Component({
  selector: 'app-map-geolocation-control',
  templateUrl: 'geolocation.component.html',
  styleUrls: ['geolocation.component.scss']
})

export class MapGeolocationControlComponent {
  constructor(private parent: MapComponent) { }

  // Apply a smooth camera movement to the user location
  geolocate() {
    this.parent.map.easeTo({
      center: this.parent.currentUserPosition
    });
  }
}
