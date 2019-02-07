import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationTypeEnum } from '@app/core/mapboxgl';
import { PlaceForwardGeocodingModel } from '@app/shared/models';
import { environment } from '@environments/environment';
import { FeatureCollection } from 'geojson';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class MapService {
  private readonly _mapboxApiUrl = `https://api.mapbox.com/`;
  private readonly _mapboxGeocodingApiUrl = `${this._mapboxApiUrl}geocoding/v5/mapbox.places`;
  /**
   * Documentation: https://docs.mapbox.com/api/navigation/
   *
   * Usage: .../directions/v5/{profile}/{coordinates}
   */
  private readonly _mapboxNavigationApiUrl = `${this._mapboxApiUrl}/directions/v5/${NavigationTypeEnum.WALKING}/`;

  constructor(private httpClient: HttpClient) { }

  private errorHandler(error: any, caught: any) {
    if (error.status === 429) {
      console.log('# Request limits exceeded !');
    } else {
      console.log('[errorHandler] error: ', error);
    }
    return of(null);
  }

  searchLocation(searchText: string): Observable<PlaceForwardGeocodingModel[]> {
    // Documentation for available parameters: https://docs.mapbox.com/api/search/#geocoding
    const params = new HttpParams({
      fromObject: {
        language: 'fr',
        limit: '10',
        types: 'poi',
        access_token: `${environment.mapboxglApiKey}`
      }
    });
    const options = { params };
    return this.httpClient.get<FeatureCollection>(`${this._mapboxGeocodingApiUrl}/${encodeURI(searchText)}.json`, options)
      .pipe(
        tap(data => console.log('results', data)),
        map(response => response.features.map(feature => new PlaceForwardGeocodingModel(feature))),
        catchError(this.errorHandler)
      );
  }

  findLocationAroundMe() {

  }
}
