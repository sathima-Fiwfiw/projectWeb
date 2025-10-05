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
import { Record } from './admin/record/record';
import { Promotion } from './admin/promotion/promotion';
import { Buildpomotion } from './admin/buildpomotion/buildpomotion';
import { RetingAdmin } from './admin/reting-admin/reting-admin';
import { DetailAdmin } from './admin/detail-admin/detail-admin';
import { Homeadmin } from './admin/homeadmin/homeadmin';



export const routes: Routes = [
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: Home },
  { path: 'header', component: Header },
  { path: 'wallet', component: Wallet },
  { path: 'detail', component: Detail },
  { path: 'cart', component: Cart },
  { path: 'profileuser', component: Profileuser },
  { path: 'action', component: Action },
  { path: 'RPG', component: Rpg },
  { path: 'FPS', component: Fps },
  { path: 'horror', component: Horror },
  { path: 'reting', component: Reting },
  { path: 'record', component: Record },
  { path: 'promotion', component: Promotion },
  { path: 'buildpomotion', component: Buildpomotion },
  { path: 'retingAdmin', component: RetingAdmin },
  { path: 'detailAdmin', component: DetailAdmin },
  { path: 'homeAdmin', component: Homeadmin },


];
