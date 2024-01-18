import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAddEventComponent } from './calendar-add-event.component';

describe('CalendarAddEventComponent', () => {
  let component: CalendarAddEventComponent;
  let fixture: ComponentFixture<CalendarAddEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarAddEventComponent]
    });
    fixture = TestBed.createComponent(CalendarAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
