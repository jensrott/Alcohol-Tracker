import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tips',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tips/tips.module').then(m => m.TipsModule)
          }
        ]
      },
      {
        path: 'calculator',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../calculator/calculator.module').then(m => m.CalculatorModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tips',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tips',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
