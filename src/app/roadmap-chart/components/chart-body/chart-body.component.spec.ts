import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBodyComponent } from './chart-body.component';

describe('ChartBodyComponent', () => {
  let component: ChartBodyComponent;
  let fixture: ComponentFixture<ChartBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
