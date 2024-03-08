import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsComponent } from './forms.component';

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule
  ],
  exports:[
    FormsComponent
  ]
})
export class FormssModule { }
