import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityMapPage } from './city-map.page';

const routes: Routes = [
  {
    path: '',
    component: CityMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityMapPageRoutingModule {}
