import { Routes } from '@angular/router';
import { Login } from './user/login/login';
import { Register } from './user/register/register';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'Register', component: Register }

];
