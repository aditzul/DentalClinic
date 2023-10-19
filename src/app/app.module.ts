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
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Users } from 'angular-feather/icons';

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
    PageLogoutComponent
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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FeatherModule.pick(icons),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
