import { Directive, OnInit, Input, OnChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import {GooMapsApiService} from '../service/goo-maps-api.service';
import {LatLng, PolylineOptions} from '../interface/definitions';

@Directive({
  selector: 'goo-polyline'
})
export class GooPolyline implements OnInit, OnChanges {

  @Input() path: Array<LatLng>;
  @Output() pathChange: EventEmitter<any> = new EventEmitter();

  @Input() options: PolylineOptions;
  @Input() editable: boolean;

  private promisePolyline: Promise<any>;

  constructor(private gooMapsApi: GooMapsApiService) {
    let self = this;
    this.promisePolyline = new Promise((resolve) => {
      this.gooMapsApi.buildPolyline({

      }).then((polyline) => {
        google.maps.event.addListener(polyline, 'rightclick', function (e: any) {
          if (e.vertex === undefined) {
            return;
          }
          self.buildDeleteMenu().open(polyline.getMap(), polyline.getPath(), e.vertex);
        });

        resolve(polyline);
      });
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['editable']) {
      this.setEditable(this.editable);
    }
    if (changes['path']) {
      console.log('path changed', this.path);
      this.setPath(this.path);
    }
  }

  ngOnInit() {
    this.promisePolyline.then((polyline) => {
      polyline.setPath(this.path);
      polyline.setOptions(this.options);
    });
  }

  pathChangedCallback = () => {
    this.promisePolyline.then((polyline) => {
      let path = polyline.getPath().getArray();
      console.log('path changed2', path);
      this.onChangePath(path);
    });
  }

  onChangePath(event: any) {
    this.path = event;
    this.pathChange.emit(event);
  }

  setEditable(editable: boolean) {
    this.promisePolyline.then((polyline) => {
      polyline.setEditable(editable);
    });
  }

  setPath(path: Array<LatLng>) {
    let self = this;
    this.promisePolyline.then((polyline) => {
      polyline.setPath(path);
      google.maps.event.addListener(polyline.getPath(), 'insert_at', self.pathChangedCallback);
      google.maps.event.addListener(polyline.getPath(), 'remove_at', self.pathChangedCallback);
      google.maps.event.addListener(polyline.getPath(), 'set_at', self.pathChangedCallback);
    });
  }

  private buildDeleteMenu(): any {
    function DeleteMenu() {
      this.div_ = document.createElement('div');
      this.div_.className = 'delete-menu';
      this.div_.innerHTML = 'Delete';
      this.div_.style.cssText = 'position:absolute;background:white;padding:3px;color:#666;font-weight:bold;'
        + 'border:1pxsolid#999;font-family:sans-serif;font-size:12px;box-shadow:1px3px3pxrgba(0,0,0,.3);'
        + 'margin-top:-10px;margin-left:10px;cursor:pointer;';

      let menu = this;
      google.maps.event.addDomListener(this.div_, 'click', function () {
        menu.removeVertex();
      });
    }
    DeleteMenu.prototype = new google.maps.OverlayView();

    DeleteMenu.prototype.onAdd = function () {
      let deleteMenu = this;
      let map = this.getMap();
      this.getPanes().floatPane.appendChild(this.div_);

      // mousedown anywhere on the map except on the menu div will close the
      // menu.
      this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'mousedown', function (e: any) {
        if (e.target !== deleteMenu.div_) {
          deleteMenu.close();
        }
      }, true);
    };

    DeleteMenu.prototype.onRemove = function () {
      google.maps.event.removeListener(this.divListener_);
      this.div_.parentNode.removeChild(this.div_);

      // clean up
      this.set('position');
      this.set('path');
      this.set('vertex');
    };

    DeleteMenu.prototype.close = function () {
      this.setMap(null);
    };

    DeleteMenu.prototype.draw = function () {
      let position = this.get('position');
      let projection = this.getProjection();

      if (!position || !projection) {
        return;
      }

      let point = projection.fromLatLngToDivPixel(position);
      this.div_.style.top = point.y + 'px';
      this.div_.style.left = point.x + 'px';
    };

    /**
     * Opens the menu at a vertex of a given path.
     */
    DeleteMenu.prototype.open = function (map: any, path: any, vertex: any) {
      this.set('position', path.getAt(vertex));
      this.set('path', path);
      this.set('vertex', vertex);
      this.setMap(map);
      this.draw();
    };

    DeleteMenu.prototype.removeVertex = function () {
      let path = this.get('path');
      let vertex = this.get('vertex');

      if (!path || vertex === undefined) {
        this.close();
        return;
      }

      path.removeAt(vertex);
      this.close();
    };

    return new DeleteMenu();
  }
}
