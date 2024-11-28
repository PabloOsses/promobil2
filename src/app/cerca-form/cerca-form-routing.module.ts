import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CercaFormPage } from './cerca-form.page';

const routes: Routes = [
  {
    path: '',
    component: CercaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CercaFormPageRoutingModule {}
