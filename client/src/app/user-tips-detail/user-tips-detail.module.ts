import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTipsDetailPageRoutingModule } from './user-tips-detail-routing.module';

import { UserTipsDetailPage } from './user-tips-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTipsDetailPageRoutingModule
  ],
  declarations: [UserTipsDetailPage]
})
export class UserTipsDetailPageModule {}
