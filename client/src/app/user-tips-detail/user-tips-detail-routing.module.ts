import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTipsDetailPage } from './user-tips-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UserTipsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTipsDetailPageRoutingModule {}
