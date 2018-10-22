import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component' ;
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard}  from './auth.guard';
import { DisplayArticleComponent } from './display-article/display-article.component';
import { SettingsComponent } from './settings/settings.component';
import {NewArticleComponent} from './new-article/new-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const appRoutes: Routes = [
   {path:'',component: HomeComponent ,canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
     {path: 'article/:slug',component :DisplayArticleComponent,canActivate:[AuthGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'new', component: NewArticleComponent },
    {path:'editArticle/:slug' , component :EditArticleComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
