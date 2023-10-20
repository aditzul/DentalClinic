// page-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';

registerLocaleData(localeRo);
@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss'],
  providers: [DatePipe], // Add DatePipe to providers
})
export class PageDashboardComponent implements OnInit {
  icons = [
    { name: 'camera', class: 'big' },
    { name: 'heart', class: 'big fill-red' },
    { name: 'github', class: 'big fill-green' },
  ]
  locale: string = "ro"
  todayDate: string;

  constructor(private datePipe: DatePipe) {
    const currentDate = new Date();
    this.todayDate = this.datePipe.transform(currentDate, 'dd.MM.yyyy') || '';
  }
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      title: 'Event 1',
      start: new Date(startOfDay(new Date()).setHours(8, 0, 0, 0)),
      end: new Date(startOfDay(new Date()).setHours(9, 30, 0, 0)),
      color: {
        "primary": "#ad2121",
        "secondary": "#FAE3E3"
      }
    },
    {
      title: 'Event 2',
      start: new Date(startOfDay(new Date()).setHours(12, 0, 0, 0)),
      end: new Date(startOfDay(new Date()).setHours(14, 0, 0, 0)),
    },
    // Other events...
  ];
  hourSegments = 2;
  startHour = 8;
  endHour = 17;

  ngOnInit() {
    // Initialization logic
  }

  segmentClicked(event: any) {
    // Handle segment click
  }
}
