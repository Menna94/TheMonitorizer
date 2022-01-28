import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCheckComponent } from './add-check/add-check.component';
import { GetChecksComponent } from './get-checks/get-checks.component';

const routes: Routes = [
  {
    path:'add', component: AddCheckComponent,
  },
  {
    path:'get', component: GetChecksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecksRoutingModule { }
