import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCounterComponent } from './banner-counter.component';

describe('BannerCounterComponent', () => {
    let component: BannerCounterComponent;
    let fixture: ComponentFixture<BannerCounterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BannerCounterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerCounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
