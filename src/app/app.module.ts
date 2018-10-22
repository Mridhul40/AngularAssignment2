import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './auth.guard';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TabComponent } from './tab/tab.component';
import { DisplayArticleComponent } from './display-article/display-article.component';
import { SettingsComponent } from './settings/settings.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    TabComponent,
    DisplayArticleComponent,
    SettingsComponent,
    NewArticleComponent,
    EditArticleComponent
   
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,
  AuthenticationService,
AlertService,
UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
