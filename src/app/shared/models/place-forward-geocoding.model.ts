import { Feature } from 'geojson';
import { LngLat } from 'mapbox-gl';

export class PlaceForwardGeocodingModel {
  id: string;
  relevance: number;
  place_name: string;
  coordinates: LngLat;
  constructor(data: Feature) {
    this.id = <string>data.id;
    this.relevance = data['relevance'];
    this.place_name = data['place_name'];
    const coords = data.geometry['coordinates'];
    this.coordinates = new LngLat(coords[0], coords[1]);
  }
}
