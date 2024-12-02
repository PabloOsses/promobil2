import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CercaDetailPageRoutingModule } from './cerca-detail-routing.module';

import { CercaDetailPage } from './cerca-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CercaDetailPageRoutingModule
  ],
  declarations: [CercaDetailPage]
})
export class CercaDetailPageModule {}
