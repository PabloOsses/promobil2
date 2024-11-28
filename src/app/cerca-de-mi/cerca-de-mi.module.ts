import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CercaDeMiPageRoutingModule } from './cerca-de-mi-routing.module';

import { CercaDeMiPage } from './cerca-de-mi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CercaDeMiPageRoutingModule
  ],
  declarations: [CercaDeMiPage]
})
export class CercaDeMiPageModule {}
