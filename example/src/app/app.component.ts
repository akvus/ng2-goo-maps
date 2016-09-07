import { Component } from '@angular/core';
import '../../public/css/styles.css';
import {GooMapsApiService} from 'ng2-goo-maps/ng2-goo-maps';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GooMapsApiService]
})
export class AppComponent { }
