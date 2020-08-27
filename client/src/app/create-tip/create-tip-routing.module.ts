import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTipPage } from './create-tip.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTipPageRoutingModule {}
