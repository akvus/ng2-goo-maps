
/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GooMapsApiService } from './goo-maps-api.service';

describe('Service: GooMapsApiService', () => {
  beforeEach(() => {
    addProviders([GooMapsApiService]);
  });

  it('should ...',
    inject([GooMapsApiService], (service: GooMapsApiService) => {
      expect(service).toBeTruthy();
    }));
});
