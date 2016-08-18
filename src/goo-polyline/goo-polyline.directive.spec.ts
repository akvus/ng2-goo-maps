/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GooPolyline } from './goo-polyline.directive';

describe('Directive: GooPolyline', () => {
  beforeEach(() => {
    addProviders([GooPolyline]);
  });

  it('should create the app',
    inject([GooPolyline], (app: GooPolyline) => {
      expect(app).toBeTruthy();
    }));
});
