import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CercaDetailPage } from './cerca-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CercaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CercaDetailPageRoutingModule {}
