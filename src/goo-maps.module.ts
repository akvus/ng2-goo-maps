import { NgModule } from '@angular/core';

import {GoogleMapsLoader} from './service/goo-maps-loader.service';

import {GooMap} from './goo-map/goo-map.component';
import {GooMarker} from './goo-marker/goo-marker.directive';
import {GooRectangle} from './goo-rectangle/goo-rectangle.directive';
import {GooPolyline} from './goo-polyline/goo-polyline.directive';
import {GooInfoWindow} from './goo-info-window/goo-info-window.component';

@NgModule({
    imports: [],
    exports: [GooMap, GooRectangle, GooMarker, GooPolyline, GooInfoWindow],
    declarations: [GooMap, GooRectangle, GooMarker, GooPolyline, GooInfoWindow],
    providers: [GoogleMapsLoader]
})
export class GooMapsModule { }
