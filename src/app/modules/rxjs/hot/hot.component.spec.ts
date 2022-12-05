import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotComponent } from './hot.component';

describe('HotColdComponent', () => {
  let component: HotComponent;
  let fixture: ComponentFixture<HotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
