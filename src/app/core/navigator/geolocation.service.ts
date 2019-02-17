import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, interval, Observable, throwError, zip } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class GeolocationService {
  private _positionOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  };

  constructor(private httpClient: HttpClient) { }

  trackCurrentPosition(): Observable<Position> {
    return Observable.create(observer => {
      let watchId: number; // watch position id

      if ('geolocation' in navigator) {
        // Success callback
        const onSuccess = (position: Position) => {
          observer.next(position);
        };
        // Error callback
        const onError = (err: PositionError) => {
          // if (watchId) {
          //   navigator.geolocation.clearWatch(watchId);
          // }
          observer.error(err);
        };
        watchId = navigator.geolocation.watchPosition(onSuccess, onError, this._positionOptions);
      } else {
        // throw new Error('E_GEOLOCATION_NOT_SUPPORTED');
        observer.error({ code: -1, message: 'E_GEOLOCATION_NOT_SUPPORTED' });
      }

      // Clear watch id on dispose
      return {
        unsubscribe() {
          if (watchId) {
            navigator.geolocation.clearWatch(watchId);
          }
        }
      };
    });
  }

  errorHandler(error: PositionError) {
    console.warn(`Localisation impossible - code: ${error.code}; message: ${error.message}`);
    // TODO: add toast message
    switch (error.code) {
      case error.PERMISSION_DENIED:
        break;
      case error.POSITION_UNAVAILABLE:
        break;
      case error.TIMEOUT:
        break;
      default:
        break;
    }

    return throwError(error);
  }

  /**
   * Emit new position every 2s
   */
  simulateMovement(): Observable<any> {
    const emitInterval = interval(2000);
    return this.httpClient.get<{ latitude: number, longitude: number }[]>('http://localhost:4200/assets/gps_simulation.json')
      .pipe(
        flatMap(json => {
          return zip(from(json), emitInterval)
            .pipe(map(([position]) => { return { coords: position }; }))
        })
      );
  }
}
