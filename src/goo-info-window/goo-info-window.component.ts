import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChange } from '@angular/core';
import {GooMapsApiService} from '../service/goo-maps-api.service';

@Component({
  selector: 'goo-info-window',
  templateUrl: 'goo-info-window.component.html'
})
export class GooInfoWindow implements OnInit, OnChanges {

  @Input() isOpen: boolean = false;

  private promiseInfoWindow: Promise<any>;
  private marker;

  private content;

  constructor(private gooMapsApi: GooMapsApiService,
    private elementRef: ElementRef) {
    this.promiseInfoWindow = new Promise((resolve) => {
      this.gooMapsApi.buildInfoWindow().then((infoWindow) => {
        resolve(infoWindow);
      });
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['isOpen']) {
      this.isOpen ? this.open() : this.close();
    }
  }

  ngOnInit() {
    let contentNode = this.elementRef.nativeElement.querySelector('.goo-info-window-content');
    this.content = contentNode.innerHTML;
    this.elementRef.nativeElement.removeChild(contentNode);
    this.promiseInfoWindow.then((infoWindow) => {
      infoWindow.setContent(this.content);
    });
  }

  setMarker(marker) {
    this.marker = marker;
  }

  open() {
    this.promiseInfoWindow.then((infoWindow) => {
      infoWindow.open(this.marker.getMap(), this.marker);
    });
  }

  close() {
    this.promiseInfoWindow.then((infoWindow) => {
      infoWindow.close();
    });
  }

}
