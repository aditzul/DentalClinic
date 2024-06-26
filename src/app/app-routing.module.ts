import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageAppointmentsComponent } from './page-appointments/page-appointments.component';
import { PagePatientsComponent } from './page-patients/page-patients.component';


const routes: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'profile', component: PageProfileComponent},
  { path: 'appointments', component: PageAppointmentsComponent},
  { path: 'patients', component: PagePatientsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
