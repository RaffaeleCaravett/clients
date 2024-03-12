import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AcquistoComponent } from '../acquisto/acquisto.component';

@NgModule({
  declarations: [
    SearchComponent,
    AcquistoComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class SearchModule { }
