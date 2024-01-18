import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-add-event',
  templateUrl: './calendar-add-event.component.html',
  styleUrls: ['./calendar-add-event.component.scss']
})

export class CalendarAddEventComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref:MatDialogRef<CalendarAddEventComponent>){

  }
  ngOnInit(): void {
    this.inputData=this.data;
  }
  inputData: any;
  saveCalendarEventDialog(){
    console.log('Pressed Save Buttton');
    this.ref.close();
  }

}