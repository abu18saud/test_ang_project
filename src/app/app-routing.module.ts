import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from 'src/about-me/about-me.component';
import { AuthGuard } from 'src/helpers';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesComponent } from './pages/services/services.component';
import { StaffComponent } from './pages/staff/staff.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about-me', component: AboutMeComponent, canActivate: [AuthGuard] },
  { path: 'create-new-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
