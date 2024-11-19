import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})

export class ImageService {

  constructor() { }

  async getImageFromCamera(): Promise<{ success: boolean, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      const imageUrl = image.dataUrl;
      return { success: true, imageUrl: image.dataUrl };
    } catch (error) {
      return { success: false };
    }
  }

  async getImageFromGallery(): Promise<{ success: boolean, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      const imageUrl = image.dataUrl;
      return { success: true, imageUrl: image.dataUrl };
    } catch (error) {
      return { success: false };
    }
  }

}