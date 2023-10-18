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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
