import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecksRoutingModule } from './checks-routing.module';
import { AddCheckComponent } from './add-check/add-check.component';
import { GetChecksComponent } from './get-checks/get-checks.component';


@NgModule({
  declarations: [AddCheckComponent, GetChecksComponent],
  imports: [
    CommonModule,
    ChecksRoutingModule
  ]
})
export class ChecksModule { }
