import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishCountEditDialogComponent } from './wish-count-edit-dialog.component';

describe('WishCountEditDialogComponent', () => {
    let component: WishCountEditDialogComponent;
    let fixture: ComponentFixture<WishCountEditDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WishCountEditDialogComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WishCountEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
