import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from 'src/about-me/about-me.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesComponent } from './pages/services/services.component';
import { StaffComponent } from './pages/staff/staff.component';

const routes: Routes = [
  { path: 'about-me', component: AboutMeComponent },
  { path: 'create-new-user', component: CreateUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'staff', component: StaffComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
