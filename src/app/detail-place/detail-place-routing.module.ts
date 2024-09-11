import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPlacePage } from './detail-place.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPlacePageRoutingModule {}
