/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GooMarker } from './goo-marker.directive';

describe('Directive: Admin', () => {
  beforeEach(() => {
    addProviders([GooMarker]);
  });

  it('should create the app',
    inject([GooMarker], (app: GooMarker) => {
      expect(app).toBeTruthy();
    }));
});
