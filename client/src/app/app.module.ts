import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {ReactiveFormsModule} from  '@angular/forms'
import {RegistrationService} from './registration/registration.service';
import { LoginComponent } from './login/login.component'
import {LoginService} from './login/login.service'
import { AlertsModule } from 'angular-alert-module';
import {TodoListService} from './todo-list/todo-list.service'
import { TodoListComponent } from './todo-list/todo-list.component';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    TodoListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AlertsModule.forRoot(),

  ],
  providers: [
    RegistrationService,
    LoginService,
    TodoListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
