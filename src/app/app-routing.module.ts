import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageLogoutComponent } from './page-logout/page-logout.component';


const routes: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'logout', component: PageLogoutComponent}
  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
