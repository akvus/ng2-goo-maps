import {Injectable} from '@angular/core';
import {GoogleMapsLoader} from './goo-maps-loader.service';

@Injectable()
export class GooMapsApiService {
  private zeroLatLng = { lat: 0, lng: 0 };
  private zeroZoom = 4;
  private promiseMap: Promise<any>;
  private _promiseMapResolver: any;

  constructor(
    private googleMapsApi: GoogleMapsLoader) {
    this.promiseMap = new Promise((resolve) => {
      this._promiseMapResolver = resolve;
    });
  }

  init(mapId: any, mapOptions: any) {
    this.googleMapsApi.initMap().then(() => {
      // possibility that DOM element won't exist yet...?
      let map = new google.maps.Map(document.getElementById(mapId), { // would be good to get DOM Element already
        center: this.zeroLatLng,
        zoom: this.zeroZoom
      });
      map.setOptions(mapOptions);
      this._promiseMapResolver(map);
    });
  }

  setMapOptions(options: google.maps.MapOptions) {
    this.getMap().then((map) => {
      map.setOptions(options);
    });
  }

  fitMapBounds(bounds: any) {
    if (!bounds) { return; }
    this.getMap().then((map) => {
      map.fitBounds(bounds);
    });
  }

  setCenter(latLng: any) {
    this.getMap().then((map) => {
      map.setCenter(latLng);
    });
  }

  public getMap(): Promise<google.maps.Map> {
    return this.promiseMap;
  }

  public buildMarker(options: any): Promise<google.maps.Marker> {
    return new Promise((resolve) => {
      this.promiseMap.then((map) => {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(options.position.lat, options.position.lng),
          map: map,
          title: options.title
        });

        resolve(marker);
      });
    });
  }

  public buildPolyline(options: any): Promise<google.maps.Polyline> {
    return new Promise((resolve) => {
      this.promiseMap.then((map) => {
        let polyline = new google.maps.Polyline({
          path: [],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map
        });
        resolve(polyline);
      });
    });
  }

  public buildRectangle(options: any): Promise<google.maps.Rectangle> {
    return new Promise((resolve) => {
      this.promiseMap.then((map) => {
        let rectangle = new google.maps.Rectangle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map
        });
        resolve(rectangle);
      });
    });
  }

  public buildInfoWindow(options?: any): Promise<google.maps.InfoWindow> {
    return new Promise((resolve) => {
      this.promiseMap.then((map) => {
        if (!options) {
          options = { content: '' };
        }
        resolve(new google.maps.InfoWindow(options));
      });
    });
  }
}
