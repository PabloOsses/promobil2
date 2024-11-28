import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'detail-place',
    loadChildren: () => import('./detail-place/detail-place.module').then( m => m.DetailPlacePageModule)
  },

  {
    path: 'city-map',
    loadChildren: () => import('./city-map/city-map.module').then( m => m.CityMapPageModule)
  },
  {
    path: 'dplay-imagen',
    loadChildren: () => import('./dplay-imagen/dplay-imagen.module').then( m => m.DplayImagenPageModule)
  },
  {
    path: 'cerca-de-mi',
    loadChildren: () => import('./cerca-de-mi/cerca-de-mi.module').then( m => m.CercaDeMiPageModule)
  },
  {
    path: 'cerca-form',
    loadChildren: () => import('./cerca-form/cerca-form.module').then( m => m.CercaFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
