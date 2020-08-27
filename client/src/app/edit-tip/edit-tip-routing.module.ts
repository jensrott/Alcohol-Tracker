import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTipPage } from './edit-tip.page';

const routes: Routes = [
  {
    path: '',
    component: EditTipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTipPageRoutingModule {}
