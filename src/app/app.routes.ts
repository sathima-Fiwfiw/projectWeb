import { Routes } from '@angular/router';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { Home } from './user/home/home';
import { Header } from './user/header/header';

export const routes: Routes = [
  // { path: '', component: Login },
  { path: 'Register', component: Register },
  { path: '', component: Home },
  { path: 'Header', component: Header }

];
