import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipDetailPageRoutingModule } from './tip-detail-routing.module';

import { TipDetailPage } from './tip-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipDetailPageRoutingModule
  ],
  declarations: [TipDetailPage]
})
export class TipDetailPageModule {}
