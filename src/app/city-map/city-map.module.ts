import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityMapPageRoutingModule } from './city-map-routing.module';

import { CityMapPage } from './city-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityMapPageRoutingModule
  ],
  declarations: [CityMapPage]
})
export class CityMapPageModule {}
