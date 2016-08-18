/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GoogleMapsLoader } from './goo-maps-loader.service';

describe('Service: GoogleMapsLoader', () => {
  beforeEach(() => {
    addProviders([GoogleMapsLoader]);
  });

  it('should ...',
    inject([GoogleMapsLoader], (service: GoogleMapsLoader) => {
      expect(service).toBeTruthy();
    }));
});
