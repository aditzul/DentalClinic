import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageLogoutComponent } from './page-logout/page-logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalendarDateFormatter, CalendarEventTitleFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Users } from 'angular-feather/icons';
import { PageAppointmentsComponent } from './page-appointments/page-appointments.component';
import { CustomDateFormatter } from './shared/custom-date-formatter.provider';
import { CustomEventTitleFormatter } from './shared/custom-event-title-formatter.provider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarAddEventComponent } from './dialogs/calendar-add-event/calendar-add-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PagePatientsComponent } from './page-patients/page-patients.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { PageLoginComponent } from './page-login/page-login.component';


const icons = {
  Camera,
  Heart,
  Users,
};

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    TopBarComponent,
    BottomBarComponent,
    PageDashboardComponent,
    PageProfileComponent,
    PageLogoutComponent,
    PageAppointmentsComponent,
    CalendarAddEventComponent,
    PagePatientsComponent,
    PageLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FeatherModule.pick(icons),
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
