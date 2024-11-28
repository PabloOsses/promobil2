import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/managers/geolocationService';
import { Router } from '@angular/router'; // Importa Router para la navegación
import * as L from 'leaflet'; // Asegúrate de tener la importación de Leaflet
import { lugarCustom } from 'src/managers/lugarCustom'; // Usamos el servicio LugarCustom

@Component({
  selector: 'app-cerca-de-mi',
  templateUrl: './cerca-de-mi.page.html',
  styleUrls: ['./cerca-de-mi.page.scss'],
})
export class CercaDeMiPage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = ''; // Mensaje de error en caso de problemas
  map: L.Map; // Declaramos el mapa
  marker: L.Marker; // Declaramos el marcador

  // Array para almacenar los lugares históricos obtenidos de Firebase
  places: any[] = [];

  constructor(
    private geolocationService: GeolocationService,
    private router: Router, // Inyectar Router para la navegación
    private lugarCustom: lugarCustom // Inyectar el servicio LugarCustom para obtener los lugares históricos
  ) { }

  ngOnInit() {
    this.loadLocation();
    this.loadPlaces(); // Cargar lugares históricos desde Firebase
  }

  // Cargar ubicación del usuario
  async loadLocation() {
    try {
      const position = await this.geolocationService.getCurrentLocation();
      this.latitude = position.latitude;
      this.longitude = position.longitude;
      this.initializeMap(); // Inicializar el mapa después de obtener la ubicación
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Cargar lugares históricos desde Firebase usando LugarCustom
  loadPlaces() {
    // Obtener lugares históricos desde Firebase a través del servicio LugarCustom
    this.lugarCustom.getLugares().subscribe(places => {
      this.places = places;
      this.addMarkers(); // Agregar marcadores al mapa
    });
  }

  // Inicializar el mapa de Leaflet
  initializeMap() {
    this.map = L.map('mapId').setView([this.latitude, this.longitude], 13); // Establecer la vista del mapa en la ubicación del usuario
    
    // Agregar capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(this.map);

    // Agregar un marcador en la ubicación del usuario
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Tu ubicación')
      .openPopup();
  }

  // Agregar marcadores para los lugares históricos en el mapa
  addMarkers() {
    this.places.forEach(place => {
      if (place.latitude && place.longitude) {
        const customIcon = L.icon({
          iconUrl: 'assets/marker-icon.png', // Usa una imagen personalizada para el marcador
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          shadowUrl: 'assets/marker-shadow.png', // Ruta de la sombra del marcador
          shadowSize: [41, 41],  // Tamaño de la sombra
          shadowAnchor: [12, 41]  // Punto de anclaje de la sombra
        });

        L.marker([place.latitude, place.longitude], { icon: customIcon })
          .addTo(this.map)
          .bindPopup(`
            <b>${place.name}</b><br>
            ${place.description}<br>
            <img src="${place.image}" width="100" />
          `);
      }
    });
  }

  // Navegar a la página de agregar lugar
  goToCercaForm() {
    this.router.navigate(['/cerca-form']); // Navegar a la página "cerca-form"
  }
}
