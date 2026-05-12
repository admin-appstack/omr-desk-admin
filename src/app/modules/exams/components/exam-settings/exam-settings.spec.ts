import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSettings } from './exam-settings';

describe('ExamSettings', () => {
  let component: ExamSettings;
  let fixture: ComponentFixture<ExamSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
