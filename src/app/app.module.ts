import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsComponent } from './components/forms/forms.component';
import { SearchComponent } from './components/search/search.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
    ],
  providers: [
    provideAnimations(),
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
