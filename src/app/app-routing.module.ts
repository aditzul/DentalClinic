import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageLogoutComponent } from './page-logout/page-logout.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageAppointmentsComponent } from './page-appointments/page-appointments.component';


const routes: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'profile', component: PageProfileComponent},
  { path: 'logout', component: PageLogoutComponent},
  { path: 'appointments', component: PageAppointmentsComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
