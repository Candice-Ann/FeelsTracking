import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodVisualizerComponent } from './mood-visualizer.component';

describe('MoodVisualizerComponent', () => {
  let component: MoodVisualizerComponent;
  let fixture: ComponentFixture<MoodVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
