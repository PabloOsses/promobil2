import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  
})
/*resumen de que hace el codigo de abajo:
siempre cuando cargue el splash va a cargar
primero el simbolo de loading y DESPUES checkea por session activa*/
export class SplashPage implements OnInit {

  constructor(private router: Router,private loadingController: LoadingController,private storageService: StorageService) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000  // Duración en milisegundos (2 segundos)
      
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    //console.log('Cargando hacia login');
    //this.router.navigate(['/login']);  
  }

  async ionViewDidEnter() {
    this.presentLoading();  // Muestra la pantalla de carga al inicializar la página
    await this.presentLoading();
    this.checkSession()
  }
  async checkSession() {
    const sessionStatus = await this.storageService.get('isSessionActive')
    if (sessionStatus) {
      this.router.navigate(['/home'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    //this.presentLoading();  // Muestra la pantalla de carga al inicializar la página
  }

}

