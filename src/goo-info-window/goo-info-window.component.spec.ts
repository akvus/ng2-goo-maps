/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GooInfoWindow } from './goo-info-window.component';

describe('Component: GooInfoWindow', () => {
  beforeEach(() => {
    addProviders([GooInfoWindow]);
  });

  it('should create the app',
    inject([GooInfoWindow], (app: GooInfoWindow) => {
      expect(app).toBeTruthy();
    }));
});
