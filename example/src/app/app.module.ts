import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {GooMapsModule} from 'ng2-goo-maps/ng2-goo-maps';

@NgModule({
  imports: [
    BrowserModule, HttpModule, GooMapsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
