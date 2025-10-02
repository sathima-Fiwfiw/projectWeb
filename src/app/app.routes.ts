import { Routes } from '@angular/router';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { Home } from './user/home/home';
import { Header } from './user/header/header';
import { Wallet } from './user/wallet/wallet';
import { Detail } from './user/detail/detail';
import { Cart } from './user/cart/cart';
import { Profileuser } from './user/profileuser/profileuser';

export const routes: Routes = [
  // { path: '', component: Login },
  { path: 'Register', component: Register },
  { path: '', component: Home },
  { path: 'Header', component: Header },
  { path: 'wallet', component: Wallet },
  { path: 'detail', component: Detail },
  { path: 'cart', component: Cart },
  { path: 'profileuser', component: Profileuser },
];
