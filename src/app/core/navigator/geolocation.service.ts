import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GeolocationService {
  private _positionOptions: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  };

  get currentPositionOnce$(): Observable<Position|null> {
    return Observable.create(observer => {
      if ('geolocation' in navigator) {
        // Success callback
        const onSuccess = (position: Position) => {
          observer.next(position);
          observer.complete();
        };
        // Error callback
        const onError = (error: PositionError) => {
          this.locationErrorHandler(error);
          observer.complete();
        };
        // Current position options
        const opts: PositionOptions = {
          enableHighAccuracy: true,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(onSuccess, onError, opts);
      } else {
        observer.next(null);
        throw new Error('E_GEOLOCATION_NOT_SUPPORTED');
      }
    });
  }

  get position$(): Observable<Position> {
    return Observable.create(observer => {
      let watchId: number; // watch position id

      if ('geolocation' in navigator) {
        // Success callback
        const onSuccess = (position: Position) => {
          observer.next(position);
        };
        // Error callback
        const onError = (err: PositionError) => {
          this.locationErrorHandler(err);
          observer.error(err);
          // if (watchId) {
          //   navigator.geolocation.clearWatch(watchId);
          // }
        };
        watchId = navigator.geolocation.watchPosition(onSuccess, onError, this._positionOptions);
      } else {
        // throw new Error('E_GEOLOCATION_NOT_SUPPORTED');
        observer.error('E_GEOLOCATION_NOT_SUPPORTED');
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

  constructor() { }

  private locationErrorHandler(error: PositionError) {
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
  }
}
