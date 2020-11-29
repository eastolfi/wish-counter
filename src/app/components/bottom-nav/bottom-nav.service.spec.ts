import { TestBed } from '@angular/core/testing';

import { BottomNavService } from './bottom-nav.service';

describe('BottomNavService', () => {
    let service: BottomNavService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BottomNavService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
