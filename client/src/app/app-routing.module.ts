import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'detail/tip/:id',
    loadChildren: () => import('./tip-detail/tip-detail.module').then(m => m.TipDetailPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'detail/user/tips/:id',
    loadChildren: () => import('./user-tips-detail/user-tips-detail.module').then(m => m.UserTipsDetailPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'introduction',
    loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionPageModule)
  },
  {
    path: 'create-tip',
    loadChildren: () => import('./create-tip/create-tip.module').then(m => m.CreateTipPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit/tip/:id',
    loadChildren: () => import('./edit-tip/edit-tip.module').then(m => m.EditTipPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
