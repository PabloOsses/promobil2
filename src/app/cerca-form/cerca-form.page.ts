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
    private actionSheetController: ActionSheetController // Se añade el ActionSheetController
  ) { }

  // Ubicación actual del usuario
  async getUserLocation() {
    try {
      const position = await this.geolocationService.getCurrentLocation();
      this.userLatitude = position.latitude;
      this.userLongitude = position.longitude;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // Mostrar opciones para seleccionar imagen
  async presentImageOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Usar Cámara',
          icon: 'camera',
          handler: async () => {
            await this.addImageFromCamera(); // Llama a la función para usar la cámara
          },
        },
        {
          text: 'Elegir de la Galería',
          icon: 'image',
          handler: async () => {
            await this.addImageFromGallery(); // Llama a la función para usar la galería
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

  // Agregar una imagen desde la galería
  async addImageFromGallery() {
    const result = await this.imageService.getImageFromGallery();
    if (result.success && result.imageUrl) {
      this.newPlaceImage = result.imageUrl;
    }
  }

  // Agregar una imagen desde la cámara
  async addImageFromCamera() {
    const result = await this.imageService.getImageFromCamera();
    if (result.success && result.imageUrl) {
      this.newPlaceImage = result.imageUrl;
    }
  }

  // Función para enviar el nuevo lugar histórico
  async submitNewPlace() {
    // Primero obtenemos la ubicación
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
      
      // Redirigir al mapa de lugares custom
      this.router.navigate(['/cerca-de-mi']);
    }
  }
}
