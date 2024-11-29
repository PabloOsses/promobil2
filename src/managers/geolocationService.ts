import { Injectable } from "@angular/core";
import { Geolocation,PermissionStatus } from "@capacitor/geolocation";

@Injectable({
    providedIn: 'root'
})

export class GeolocationService {

    constructor() { }
    
/*
    async getCurrentLocation() : Promise<{ latitude: number; longitude: number }> {
        try {
            const position = await Geolocation.getCurrentPosition();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            return { latitude, longitude }
        } catch (error) {
            throw new Error('Problema con obtener la ubicación')
        }
    }
        */
    async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
        try {
          // Verificar y solicitar permisos
          await this.checkAndRequestPermissions();
    
          const position = await Geolocation.getCurrentPosition();
          return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        } catch (error) {
          console.error('Error obteniendo la ubicación:', error);
          throw new Error('Problema al obtener la ubicación');
        }
      }
      private async checkAndRequestPermissions(): Promise<void> {
        const permissions: PermissionStatus = await Geolocation.checkPermissions();
    
        if (permissions.location !== 'granted') {
          const requestResult = await Geolocation.requestPermissions();
          if (requestResult.location !== 'granted') {
            throw new Error('Permiso de ubicación denegado');
          }
        }
      }
    
}