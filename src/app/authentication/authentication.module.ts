import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
