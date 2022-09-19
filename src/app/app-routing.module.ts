import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from 'src/about-me/about-me.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
  {path:'about-me', component: AboutMeComponent},
  {path:'create-new-user', component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
