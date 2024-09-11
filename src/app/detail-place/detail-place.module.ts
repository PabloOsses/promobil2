import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPlacePageRoutingModule } from './detail-place-routing.module';

import { DetailPlacePage } from './detail-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPlacePageRoutingModule
  ],
  declarations: [DetailPlacePage]
})
export class DetailPlacePageModule {}
