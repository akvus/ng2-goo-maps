/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GooRectangle } from './goo-rectangle.directive';

describe('Directive: GooRectangle', () => {
  beforeEach(() => {
    addProviders([GooRectangle]);
  });

  it('should create the app',
    inject([GooRectangle], (app: GooRectangle) => {
      expect(app).toBeTruthy();
    }));
});
