import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path: 'auth', 
    loadChildren: ()=> import('./authentication/authentication.module')
    .then(m=> m.AuthenticationModule)
  },
  {
    path: 'checks', 
    loadChildren: ()=> import('./checks/checks.module')
    .then(m=> m.ChecksModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
