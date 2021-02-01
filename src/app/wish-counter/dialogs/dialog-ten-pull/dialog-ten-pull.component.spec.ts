import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTenPullComponent } from './dialog-ten-pull.component';

describe('DialogTenPullComponent', () => {
  let component: DialogTenPullComponent;
  let fixture: ComponentFixture<DialogTenPullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTenPullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTenPullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
