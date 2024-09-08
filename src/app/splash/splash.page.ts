import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  
})

export class SplashPage implements OnInit {

  constructor(private router: Router,private loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000  // Duración en milisegundos (2 segundos)
      
    });
    await loading.present();


    const { role, data } = await loading.onDidDismiss();
    console.log('Cargando hacia login');
    this.router.navigate(['/login']);  
  }

  ngOnInit() {
    this.presentLoading();  // Muestra la pantalla de carga al inicializar la página
  }

}

