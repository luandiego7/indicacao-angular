import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {IncludeComponent} from './components/include/include.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ListComponent} from './components/list/list.component';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule  } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    IncludeComponent,
    NavbarComponent,
    ListComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
