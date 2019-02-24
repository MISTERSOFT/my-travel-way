import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MapStyleEnum } from '@app/core/mapboxgl';
import { GeolocationService } from '@app/core/navigator';
import { CdkPortalService } from '@app/layout/cdk-portal.service';
import { ToolbarSearchButtonComponent } from '@app/layout/toolbar';
import { PlaceForwardGeocodingModel } from '@app/shared/models';
import { environment } from '@environments/environment';
import { Feature, FeatureCollection } from 'geojson';
// import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as Mapbox from 'mapbox-gl';
import { Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  private _markersRegister = new Map<string, Mapbox.Marker>();
  private _isMapInit = false;

  map: Mapbox.Map;
  currentUserPosition: Mapbox.LngLat;

  @ViewChild('map') mapElement: ElementRef;

  @Output() onMapInit = new EventEmitter<Mapbox.Map>();
  @Output() onSearchResultAdd = new EventEmitter<PlaceForwardGeocodingModel>();

  constructor(
    private geolocation: GeolocationService,
    private cdkPortal: CdkPortalService,
    private renderer: Renderer2,
    private api: MapService
  ) {
    (Mapbox.accessToken as any) = environment.mapboxglApiKey;
  }

  ngOnInit() {
    // Add search button in the toolbar
    this.cdkPortal.attachToHeader(ToolbarSearchButtonComponent);

    // Simulate user movement
    // this.geolocation.simulateMovement()
    // .pipe(
    //   tap(({ coords }) => {
    //     if (!this._isMapInit) {
    //       this.initMap(coords);
    //     }
    //   }),
    //   takeUntil(this._destroy$)
    // )

    this.geolocation.trackCurrentPosition()
    .pipe(
      // Convert geolocation Position type to the mapbox LngLat type to ease coords usage with Mapbox methods
      map(({ coords }) => new Mapbox.LngLat(coords.longitude, coords.latitude)),
      takeUntil(this._destroy$),
      catchError(this.geolocation.errorHandler),
    )
    .subscribe(coords => {
      console.log(`FOREVER : lng: ${coords.lng} | lat: ${coords.lat}`);
      this.currentUserPosition = coords;
      if (!this._isMapInit) {
        this.initMap(coords);
      }
      this.updateUserLocation(coords);
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private initMap(coords: Mapbox.LngLat) {
    // Create the map
    this.map = new Mapbox.Map({
      container: this.mapElement.nativeElement,
      style: `${MapStyleEnum.DARK_V9}?optimize=true`,
      zoom: 16,
      center: {
        lat: coords.lat,
        lng: coords.lng
      },
      pitch: 90,
      attributionControl: false // remove contribution logo
    });
    this._isMapInit = true;

    // this.onMapInit.next();

    // Handler map events
    this.map.on('load', () => this.onMapLoad(coords));
  }

  private onMapLoad(coords: Mapbox.LngLat) {
    this.setDefaultSources();
    this.setDefaultLayers();

    // Create user marker on the map
    this.createUserMarker(coords);

    this.onMapInit.next();
  }

  private setDefaultSources() {
    // Add source for user places
    this.map.addSource('user_places', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    // Add source for user search result
    this.map.addSource('user_search_results', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    // (<Mapbox.GeoJSONSource>this.map.getSource('user_places')).setData(null);
  }

  private setDefaultLayers() {
    // Add layer for user places
    this.map.addLayer({
      id: 'user_place_dot',
      source: 'user_places',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      }
    });
    // Add layer for user search result
    this.map.addLayer({
      id: 'search_result_dot',
      source: 'user_search_results',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#00bf4f',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff'
      }
    });
  }

  private createUserMarker(coords: Mapbox.LngLat) {
    const marker = this.renderer.createElement('div');
    this.renderer.addClass(marker, 'map-marker-user');

    this.createMarker('user_marker', coords, { element: marker });
  }

  addUserPlaces(places: Feature[]) {
    const collection: FeatureCollection = {
      type: 'FeatureCollection',
      features: places
    };
    (<Mapbox.GeoJSONSource>this.map.getSource('user_places')).setData(collection);
  }

  /**
   * Create a marker to the given coords
   * @param coords
   */
  private createMarker(markerName: string, coords: Mapbox.LngLatLike, opts: Mapbox.MarkerOptions = { color: 'red' }) {
    const marker = new Mapbox.Marker(opts)
      .setLngLat(coords)
      .addTo(this.map);

    // Save the marker to a register
    this._markersRegister.set(markerName, marker);
  }

  /**
   * Camera fly to the coords
   * @param coords coords to fly to
   */
  private cameraFlyTo(coords: Mapbox.LngLatLike) {
    this.map.flyTo({
      center: coords,
      zoom: 14,
      speed: 3
    });
  }

  private updateUserLocation(coords: Mapbox.LngLat) {
    const userMarker = this._markersRegister.get('user_marker');
      if (userMarker) {
        userMarker.setLngLat(coords);
        this.map.setCenter(coords);
      }
  }

  onResultItemTapped(place: PlaceForwardGeocodingModel) {
    // this.createMarker('place_marker', <[number, number]>place.geometry.coordinates);
    this.cameraFlyTo(<[number, number]>place.geometry.coordinates);
    this.onSearchResultAdd.next(place);
  }
}
