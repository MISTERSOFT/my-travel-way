import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapStyleEnum } from '@app/core/mapboxgl';
import { GeolocationService } from '@app/core/navigator';
import { CdkPortalService } from '@app/layout/cdk-portal.service';
import { ToolbarSearchButtonComponent } from '@app/layout/toolbar';
import { PlaceForwardGeocodingModel } from '@app/shared/models';
import { environment } from '@environments/environment';
// import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as Mapbox from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('map') mapElement: ElementRef;

  map: Mapbox.Map;

  private _positionSubscription: Subscription;
  private _markersRegister = new Map<string, Mapbox.Marker>();

  constructor(
    private geolocation: GeolocationService,
    private cdkPortal: CdkPortalService,
    private renderer: Renderer2,
    private api: MapService
  ) {
    (Mapbox.accessToken as any) = environment.mapboxglApiKey;
    // this.onMapLoad = this.onMapLoad.bind(this);
  }

  ngOnInit() {
    // Add search button in the toolbar
    this.cdkPortal.setComponentInPortal(ToolbarSearchButtonComponent);

    // Utiliser MapBox à la place Google Maps JS
    this._positionSubscription = this.geolocation.currentPositionOnce$.subscribe(({ coords }) => {
      const { latitude, longitude } = coords;
      // Create map
      this.initMap(latitude, longitude);
    });
  }

  ngOnDestroy() {
    this._positionSubscription.unsubscribe();
  }

  private initMap(latitude: number, longitude: number) {
    // Create the map
    this.map = new Mapbox.Map({
      container: this.mapElement.nativeElement,
      style: `${MapStyleEnum.DARK_V9}?optimize=true`,
      zoom: 16,
      center: {
        lat: latitude,
        lon: longitude
      },
      pitch: 90,
      attributionControl: false // remove contribution logo
    });

    // Handler map events
    this.map.on('load', () => this.onMapLoad([longitude, latitude]));
  }

  private initMapControls() {
    this.map.addControl(new Mapbox.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 1000
      },
      trackUserLocation: true,
      showUserLocation: true
    }), 'top-right');
  }

  private onMapLoad(coords: [number, number]) {
    this.createUserMarker(coords);
    // Initialize controls
    // this.initMapControls();
  }

  private createUserMarker(coords: [number, number]) {
    const marker = this.renderer.createElement('div');
    this.renderer.addClass(marker, 'map-marker-user');

    this.createMarker(coords, { element: marker });
  }

  /**
   * Create a marker to the given coords
   * @param coords
   */
  private createMarker(coords: [number, number], opts: Mapbox.MarkerOptions = { color: 'red' }) {
    const marker = new Mapbox.Marker(opts)
    .setLngLat(coords)
    .addTo(this.map);
    this._markersRegister.set('user_position', marker);
  }

  /**
   * Camera fly to the coords
   * @param coords coords to fly to
   */
  private flyTo(coords: [number, number]) {
    this.map.flyTo({
      center: coords,
      zoom: 14,
      speed: 3
    });
  }

  onResultItemTapped(place: PlaceForwardGeocodingModel) {
    this.createMarker(place.coordinates);
    this.flyTo(place.coordinates);
  }
}
