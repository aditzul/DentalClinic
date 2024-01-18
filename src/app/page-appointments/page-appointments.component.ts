import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarAddEventComponent } from './../dialogs/calendar-add-event/calendar-add-event.component';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addDays, addHours, startOfDay, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { formatDate, registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
registerLocaleData(localeRo);
import {
  Injectable,
  ViewEncapsulation,
} from '@angular/core';
import {CalendarEventTitleFormatter } from 'angular-calendar';
import { WeekViewHourSegment } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addMinutes, endOfWeek } from 'date-fns';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  override weekTooltip(event: CalendarEvent, title: string): string {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title) || '';
    }
    return '';
  }

  override dayTooltip(event: CalendarEvent, title: string): string {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title) || '';
    }
    return '';
  }
}

@Component({
  selector: 'app-page-appointments',
  templateUrl: './page-appointments.component.html',
  styleUrls: ['./page-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PageAppointmentsComponent {
  activeDayIsOpen: boolean = true;
  dragToCreateActive: boolean | undefined;

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

  view: CalendarView = CalendarView.Week;
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
  formattedDate: string | undefined;
  
  constructor(private cdr: ChangeDetectorRef, private dialog:MatDialog) {
    this.addDummyEvents();
  }

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();
   
  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      draggable: true,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: DAYS_OF_WEEK.MONDAY
    });

    fromEvent(document, 'mousemove')
    .pipe(
      finalize(() => {
        delete dragToSelectEvent.meta.tmpEvent;
        this.dragToCreateActive = false;
        this.refresh();
      }),
      takeUntil(fromEvent(document, 'mouseup'))
    )
    .subscribe((event: Event) => {
      const mouseMoveEvent = event as MouseEvent;
      const minutesDiff = ceilToNearest(mouseMoveEvent.clientY - segmentPosition.top, 30);
  
      const daysDiff =
        floorToNearest(mouseMoveEvent.clientX - segmentPosition.left, segmentPosition.width) /
        segmentPosition.width;
  
      const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
      if (newEnd > segment.date && newEnd < endOfView) {
        dragToSelectEvent.end = newEnd;
      }
      this.refresh();
      console.log('Start ' + segment.date);
      console.log('End ' + newEnd);
    });
  }
  
  public refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
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
      },
      // Add more events as needed
    ];

  }
  validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ) => {
    if (event.allDay) {
      return true;
    }

    delete event.cssClass;
    // don't allow dragging or resizing events to different days
    const sameDay = isSameDay(newStart, newEnd);

    if (!sameDay) {
      return false;
    }

    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent:any) => {
      return (
        otherEvent !== event &&
        !otherEvent.allDay &&
        ((otherEvent.start < newStart && newStart < otherEvent.end) ||
          (otherEvent.start < newEnd && newStart < otherEvent.end))
      );
    });

    if (overlappingEvent) {
      console.log('overlapping');
      if (addCssClass) {
        console.log('added css class');
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }

    return true;
  };

  eventTimesChanged(
    eventTimesChangedEvent: CalendarEventTimesChangedEvent
  ): void {
    delete eventTimesChangedEvent.event.cssClass;
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      const { event, newStart, newEnd } = eventTimesChangedEvent;
      event.start = newStart;
      event.end = newEnd;
      this.refresh();
    }
  }

  addCalendarEventDialog() {
    this.dialog.open(CalendarAddEventComponent,{
      width: '30%',
      data: {
        currentDate: formatDate(this.viewDate,'yyyy-MM-dd',this.locale),
        currentTime: formatDate(this.viewDate,'HH:mm',this.locale),
      }
    })
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log(event);
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
