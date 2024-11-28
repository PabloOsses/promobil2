import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CercaFormPageRoutingModule } from './cerca-form-routing.module';

import { CercaFormPage } from './cerca-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CercaFormPageRoutingModule
  ],
  declarations: [CercaFormPage]
})
export class CercaFormPageModule {}
