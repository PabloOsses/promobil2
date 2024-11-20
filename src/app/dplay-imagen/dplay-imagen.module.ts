import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DplayImagenPageRoutingModule } from './dplay-imagen-routing.module';

import { DplayImagenPage } from './dplay-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DplayImagenPageRoutingModule
  ],
  declarations: [DplayImagenPage]
})
export class DplayImagenPageModule {}
