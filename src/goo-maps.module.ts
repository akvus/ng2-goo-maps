import { NgModule } from '@angular/core';

import {GoogleMapsLoader} from './service/goo-maps-loader.service';

import {GooMap} from './goo-map';
import {GooMarker} from './goo-marker';
import {GooRectangle} from './goo-rectangle/goo-rectangle.directive';
import {GooPolyline} from './goo-polyline';
import {GooInfoWindow} from './goo-info-window';

@NgModule({
    imports: [],
    exports: [GooMap, GooRectangle, GooMarker, GooPolyline, GooInfoWindow],
    declarations: [GooMap, GooRectangle, GooMarker, GooPolyline, GooInfoWindow],
    providers: [GoogleMapsLoader]
})
export class GooMapsModule { }
