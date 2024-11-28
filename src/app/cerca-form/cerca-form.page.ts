import { Component } from '@angular/core';
import { ImageService } from 'src/managers/imageServise';
import { lugarCustom } from 'src/managers/lugarCustom'; // Importa el servicio para guardar lugares
import { GeolocationService } from 'src/managers/geolocationService'; // Asegúrate de tener el servicio de geolocalización

@Component({
  selector: 'app-cerca-form',
  templateUrl: './cerca-form.page.html',
  styleUrls: ['./cerca-form.page.scss'],
})
export class CercaFormPage {
  newPlaceName: string = '';
  newPlaceDescription: string = '';
  newPlaceImage: string | null = null;  // Aquí almacenamos la imagen seleccionada
  userLatitude: number | null = null;
  userLongitude: number | null = null;

  constructor(
    private imageService: ImageService,
    private lugarCustom: lugarCustom, // Inyectar el servicio para guardar los lugares
    private geolocationService: GeolocationService // Inyectar el servicio de geolocalización
  ) { }

  // Función para obtener la ubicación del usuario
  async getUserLocation() {
    try {
      const position = await this.geolocationService.getCurrentLocation();
      this.userLatitude = position.latitude;
      this.userLongitude = position.longitude;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // Función para agregar una imagen desde la galería
  async addImage() {
    const result = await this.imageService.getImageFromGallery();
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
        image: this.newPlaceImage, // Esta es la imagen seleccionada
        latitude: this.userLatitude,  // Agregamos la latitud
        longitude: this.userLongitude, // Agregamos la longitud
      };

      // Llamar al servicio para guardar el lugar en Firebase
      this.lugarCustom.savePlace(newPlace);
      console.log('Nuevo lugar histórico guardado:', newPlace);

      // Reiniciar el formulario después de enviar
      this.newPlaceName = '';
      this.newPlaceDescription = '';
      this.newPlaceImage = null;
    }
  }
}
