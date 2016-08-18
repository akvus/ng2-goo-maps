import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';
import {GooMapsApiService} from '../service/goo-maps-api.service';

const GOO_MAPS_ID = {
  currentId: 1
};

@Component({
  selector: 'goo-map',
  templateUrl: 'goo-map.component.html'
})
export class GooMap implements OnInit, OnChanges {

  @Input('height') mapHeight: number;
  @Input('options') options;

  @Input('mapId') mapId: string = 'map_' + GOO_MAPS_ID.currentId++;
  @Input('bounds') bounds;
  @Input('center') center;

  constructor(
    private gooMapsApi: GooMapsApiService) {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['options']) {
      this.gooMapsApi.setMapOptions(this.options);
    }
    if (changes['bounds']) {
      this.gooMapsApi.fitMapBounds(this.bounds);
    }
    if (changes['center']) {
      this.gooMapsApi.setCenter(this.center);
    }
  }

  ngOnInit() {
    this.gooMapsApi.init(this.mapId, this.options);
  }

}
