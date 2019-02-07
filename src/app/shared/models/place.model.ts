import { Feature } from 'geojson';

export class PlaceForwardGeocodingModel {
  id: string;
  relevance: number;
  place_name: string;
  coordinates: [number, number]; // lng, lat
  constructor(data: Feature) {
    this.id = <string>data.id;
    this.relevance = data['relevance'];
    this.place_name = data['place_name'];
    this.coordinates = data.geometry['coordinates'];
  }
}
