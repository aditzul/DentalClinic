import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addDays, addHours, startOfDay, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
registerLocaleData(localeRo);

@Component({
  selector: 'app-page-appointments',
  templateUrl: './page-appointments.component.html',
  styleUrls: ['./page-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PageAppointmentsComponent {
  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  hourSegments = 2;
  startHour = 8;
  endHour = 17;
  selectedView: string = '';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  excludeDays: number[] = this.weekendDays;
  locale: string = "ro";
  
  constructor(private cdr: ChangeDetectorRef) {
    this.addDummyEvents();
  }

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  addDummyEvents() {
    // Add dummy events for demonstration
    const today = new Date();
    this.events = [ 
      {
        title: 'Event Test',
        start: new Date(startOfDay(new Date()).setHours(8, 0, 0, 0)),
        end: new Date(startOfDay(new Date()).setHours(9, 30, 0, 0)),
        color: { primary: '#ad2121', secondary: '#FAE3E3' },
        draggable: true,
        resizable: {
          beforeStart: true, // this allows you to configure the sides the event is resizable from
          afterEnd: true,
        },
        actions: [
          {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              console.log('Event deleted', event);
            },
          },
        ],
      },
      {
        title: 'Event 2',
        start: addDays(startOfDay(today), 1),
        end: addDays(startOfDay(today), 2),
        color: { primary: '#1e90ff', secondary: '#D1E8FF' }
      },
      {
        title: 'Event 3',
        start: addDays(endOfDay(today), 1),
        end: addDays(endOfDay(today), 2),
        color: { primary: '#e3bc08', secondary: '#FDF1BA' }
      },
      {
        title: 'Deletable event',
        start: addDays(endOfDay(today), 3),
        end: addDays(endOfDay(today), 4),
        actions: [
          {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              console.log('Event deleted', event);
            },
          },
        ],
      },
      // Add more events as needed
    ];

  }

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    console.log(event.start)
    console.log(event.end)
    this.refresh.next();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log( event);
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  changeView(view: CalendarView) {
    this.view = view;
  }
}
