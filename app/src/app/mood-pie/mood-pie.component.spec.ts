import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodPieComponent } from './mood-pie.component';

describe('MoodPieComponent', () => {
  let component: MoodPieComponent;
  let fixture: ComponentFixture<MoodPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
