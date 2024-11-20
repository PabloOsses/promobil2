import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DplayImagenPage } from './dplay-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: DplayImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DplayImagenPageRoutingModule {}
