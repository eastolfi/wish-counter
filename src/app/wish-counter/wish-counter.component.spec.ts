import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishCounterComponent } from './wish-counter.component';

describe('WishCounterComponent', () => {
  let component: WishCounterComponent;
  let fixture: ComponentFixture<WishCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
