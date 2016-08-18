/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GooMap } from './goo-map.component';

describe('Component: Admin', () => {
  beforeEach(() => {
    addProviders([GooMap]);
  });

  it('should create the app',
    inject([GooMap], (app: GooMap) => {
      expect(app).toBeTruthy();
    }));
});
