import { Feature, Point } from 'geojson';

export class PlaceForwardGeocodingModel {
  // id: string;
  // relevance: number;
  // place_name: string;
  // coordinates: LngLat;
  // constructor(data: Feature) {
  //   this.id = <string>data.id;
  //   this.relevance = data['relevance'];
  //   this.place_name = data['place_name'];
  //   const coords = data.geometry['coordinates'];
  //   this.coordinates = new LngLat(coords[0], coords[1]);
  // }
  id: string;
  geometry: Point;
  matching_place_name: string;
  matching_text: string;
  place_name: string;
  properties: {landmark?: boolean, category?: string, address?: string }
  relevance: number;
  constructor(data: Feature) {
    this.id = <string>data.id;
    this.geometry = <Point>data.geometry;
    this.matching_place_name = data['matching_place_name'] || null;
    this.matching_text = data['matching_text'] || null;
    this.place_name = data['place_name'] || null;
    this.properties = data['properties'] || null;
    this.relevance = data['relevance'] || 0;
  }
}
