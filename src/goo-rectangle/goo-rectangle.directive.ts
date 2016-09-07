import {Directive, Input, OnChanges, SimpleChange, OnInit, Output, EventEmitter} from '@angular/core';
import {GooMapsApiService} from '../service/goo-maps-api.service';

@Directive({
  selector: 'goo-rectangle'
})
export class GooRectangle implements OnChanges, OnInit {

  @Input('bounds') bounds: any;
  @Output('boundsChanged') boundsChanged: EventEmitter<any> = new EventEmitter();

  @Input() draggable: boolean = false;
  @Input() editable: boolean = false;

  private promiseRectangle: Promise<any>;

  constructor(private gooMapsApi: GooMapsApiService) {
    let self = this;
    this.promiseRectangle = new Promise((resolve) => {
      this.gooMapsApi.buildRectangle({

      }).then((rectangle) => {
        rectangle.addListener('dragend', function () {
          let bounds = rectangle.getBounds();
          self.onBoundsChanged({
            north: bounds.getNorthEast().lat(),
            south: bounds.getSouthWest().lat(),
            east: bounds.getNorthEast().lng(),
            west: bounds.getSouthWest().lng()
          });
        });
        resolve(rectangle);
      });
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    let self = this;
    if (changes['draggable']) {
      this.promiseRectangle.then(function (rectangle) {
        rectangle.setDraggable(self.draggable ? true : false);
      });
    }
    if (changes['editable']) {
      this.promiseRectangle.then(function (rectangle) {
        rectangle.setEditable(self.editable ? true : false);
      });
    }
    // if (changes['bounds']) {
    //   this.promiseRectangle.then(function (rectangle) {
    //     rectangle.setBounds(self.bounds);
    //   });
    // } // CAUSES AN EVENT LOOP (TODO)
  }

  ngOnInit() {
    this.promiseRectangle.then((rectangle) => {
      rectangle.setBounds(this.bounds);
      rectangle.setDraggable(this.draggable);
      rectangle.setEditable(this.editable);
    });
  }

  onBoundsChanged(bounds: any) {
    this.bounds = bounds;
    this.boundsChanged.emit(bounds);
  }
}
