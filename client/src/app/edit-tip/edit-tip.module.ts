import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTipPageRoutingModule } from './edit-tip-routing.module';

import { EditTipPage } from './edit-tip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTipPageRoutingModule
  ],
  declarations: [EditTipPage]
})
export class EditTipPageModule {}
