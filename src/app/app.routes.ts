/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'posts/:id', component: PostComponent },
    { path: 'register-success', component: RegisterSuccessComponent },
    { path: 'home', component: HomeComponent },
    { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },

];
