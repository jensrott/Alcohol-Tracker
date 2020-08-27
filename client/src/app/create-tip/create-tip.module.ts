import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTipPageRoutingModule } from './create-tip-routing.module';

import { CreateTipPage } from './create-tip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTipPageRoutingModule
  ],
  declarations: [CreateTipPage]
})
export class CreateTipPageModule {}
