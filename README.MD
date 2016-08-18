# ng2-goo-maps

Google Maps API directives for Angular2/RC-5.

## Installation
```sh
npm install ng2-goo-maps --save
```

## Usage

#### 1. In your module:
```ts
import {GooMapsModule} from 'ng2-goo-maps/ng2-goo-maps';

@NgModule({
    imports: [GooMapsModule]
)]
```
#### 2. In your componenet:
```ts
import {GooMapsApiService} from 'ng2-goo-maps/ng2-goo-maps';
@Component({
  providers: [GooMapsApiService]
})
```

#### 3. In your template:

```html
<goo-map [height]="300" [options]="{
center: { lat: -25.363, lng: 131.044 },
zoom: 3 }">
    <goo-marker [position]="{ lat: -25.363, lng: 131.044 }" [title]="Test" [draggable]="true">
        <goo-info-window [isOpen]="true">
        <b>Some template</b> and not bold
        </goo-info-window>
    </goo-marker>
    <goo-marker [position]="{ lat: -25.363, lng: 130.044 }" [title]="Test2"></goo-marker>
    <goo-polyline [path]="
    [{ lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 }]" [editable]="true"></goo-polyline>
</goo-map>
```