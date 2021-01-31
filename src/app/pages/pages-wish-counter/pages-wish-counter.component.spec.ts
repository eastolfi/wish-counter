import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesWishCounterComponent } from './pages-wish-counter.component';

describe('PagesWishCounterComponent', () => {
    let component: PagesWishCounterComponent;
    let fixture: ComponentFixture<PagesWishCounterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PagesWishCounterComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PagesWishCounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
