import { Directive, OnInit, Input, ContentChild, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import {GooMapsApiService} from '../service/goo-maps-api.service';
import {LatLng} from '../interface/definitions';
import {GooInfoWindow} from '../goo-info-window/goo-info-window.component';

@Directive({
  selector: 'goo-marker'
})
export class GooMarker implements OnInit, OnChanges {

  @Input() position: LatLng;
  @Output() positionChange: EventEmitter<any> = new EventEmitter();

  @Input() title: string;
  @Input() draggable: boolean;
  @Input() label: string;

  @ContentChild(GooInfoWindow) private infoWindow: GooInfoWindow;

  private promiseMarker: Promise<any>;

  constructor(private gooMapsApi: GooMapsApiService) {
    let self = this;
    this.position = { lat: 0, lng: 0 };
    this.title = '';

    this.promiseMarker = new Promise((resolve) => {
      this.gooMapsApi.buildMarker({
        position: this.position,
        title: this.title
      }).then((marker) => {
        marker.addListener('dragend', function () {
          self.onPositionChange({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() });
        });
        resolve(marker);
      });
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['draggable']) {
      this.setDraggable(this.draggable);
    }
    if (changes['position']) {
      this.setPosition(this.position);
    }
    if (changes['title']) {
      this.setTitle(this.title);
    }
    if (changes['label']) {
      this.setLabel(this.label);
    }
  }

  ngOnInit() {
    this.promiseMarker.then((marker) => {
      marker.setPosition(this.position);
      marker.setTitle(this.title);
      if (this.infoWindow !== undefined && this.infoWindow) {
        this.infoWindow.setMarker(marker);
      }
    });
  }

  onPositionChange(position) {
    this.position = position;
    this.positionChange.emit(this.position);
  }

  setDraggable(draggable: boolean) {
    this.promiseMarker.then((marker) => {
      marker.setDraggable(draggable);
    });
  }

  setPosition(position: LatLng) {
    this.promiseMarker.then((marker) => {
      marker.setPosition(position);
    });
  }

  setTitle(title: string) {
    this.promiseMarker.then((marker) => {
      marker.setTitle(title);
    });
  }

  setLabel(label: string) {
    this.promiseMarker.then((marker) => {
      marker.setLabel(label);
    });
  }

}
