import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';
import { ListAllComponent } from './components/list-all/list-all.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'listall', component: ListAllComponent },
  { path: 'home', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }