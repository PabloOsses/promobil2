import { Component } from '@angular/core';
import { ImageService } from 'src/managers/imageServise';
import { lugarCustom } from 'src/managers/lugarCustom'; 
import { GeolocationService } from 'src/managers/geolocationService'; 
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-cerca-form',
  templateUrl: './cerca-form.page.html',
  styleUrls: ['./cerca-form.page.scss'],
})
export class CercaFormPage {
  newPlaceName: string = '';
  newPlaceDescription: string = '';
  newPlaceImage: string | null = null;  
  userLatitude: number | null = null;
  userLongitude: number | null = null;

  constructor(
    private imageService: ImageService,
    private lugarCustom: lugarCustom, 
    private geolocationService: GeolocationService,
    private router: Router,
    private actionSheetController: ActionSheetController 
  ) { }

  // ubicacion actual del usuario
  async getUserLocation() {
    try {
      const position = await this.geolocationService.getCurrentLocation();
      this.userLatitude = position.latitude;
      this.userLongitude = position.longitude;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // opciones para seleccionar imagen
  async presentImageOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Usar Cámara',
          icon: 'camera',
          handler: async () => {
            await this.addImageFromCamera(); 
          },
        },
        {
          text: 'Elegir de la Galería',
          icon: 'image',
          handler: async () => {
            await this.addImageFromGallery(); 
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  // agrega desde la galeria
  async addImageFromGallery() {
    const result = await this.imageService.getImageFromGallery();
    if (result.success && result.imageUrl) {
      this.newPlaceImage = result.imageUrl;
    }
  }

  // agrega desde la camara
  async addImageFromCamera() {
    const result = await this.imageService.getImageFromCamera();
    if (result.success && result.imageUrl) {
      this.newPlaceImage = result.imageUrl;
    }
  }

  // enviar el nuevo lugar histórico
  async submitNewPlace() {
    // la ubicación
    await this.getUserLocation();

    if (this.newPlaceName.trim() && this.newPlaceDescription.trim()) {
      const newPlace = {
        name: this.newPlaceName,
        description: this.newPlaceDescription,
        image: this.newPlaceImage, 
        latitude: this.userLatitude, 
        longitude: this.userLongitude, 
      };

      this.lugarCustom.savePlace(newPlace);
      console.log('Nuevo lugar histórico guardado:', newPlace);
      
      // ir hacia mapa de lugares custom
      this.router.navigate(['/cerca-de-mi']);
    }
  }
}
