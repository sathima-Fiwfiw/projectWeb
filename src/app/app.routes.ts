import { Routes } from '@angular/router';
import { Login } from './user/login/login';
import { Register } from './user/register/register';
import { Home } from './user/home/home';
import { Header } from './user/header/header';
import { Wallet } from './user/wallet/wallet';
import { Detail } from './user/detail/detail';
import { Cart } from './user/cart/cart';
import { Profileuser } from './user/profileuser/profileuser';
import { Action } from './user/action/action';
import { Rpg } from './user/rpg/rpg';
import { Fps } from './user/fps/fps';
import { Horror } from './user/horror/horror';
import { Reting } from './user/reting/reting';
import { Create } from './admin/create/create';
import { Homeadmin } from './admin/homeadmin/homeadmin';

export const routes: Routes = [
  // { path: '', component: Login },
  { path: 'Register', component: Register },
  { path: '', component: Home },
  { path: 'Header', component: Header },
  { path: 'Wallet', component: Wallet },
  { path: 'Detail', component: Detail },
  { path: 'Cart', component: Cart },
  { path: 'Profileuser', component: Profileuser },
  { path: 'Action', component: Action },
  { path: 'RPG', component: Rpg },
  { path: 'FPS', component: Fps },
  { path: 'Horror', component: Horror },
  { path: 'Reting', component: Reting },
  { path: 'create', component: Create },
  { path: 'homeadmin', component: Homeadmin },
];
