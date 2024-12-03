import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/managers/geolocationService';
import { Router } from '@angular/router';
import * as L from 'leaflet'; 
import { lugarCustom } from 'src/managers/lugarCustom'; 

@Component({
  selector: 'app-cerca-de-mi',
  templateUrl: './cerca-de-mi.page.html',
  styleUrls: ['./cerca-de-mi.page.scss'],
})
export class CercaDeMiPage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = ''; 
  map: L.Map; 
  marker: L.Marker; 

  // aqui se almacenan los contenidos de firebase
  places: any[] = [];

  constructor(
    private geolocationService: GeolocationService,
    private router: Router, 
    private lugarCustom: lugarCustom 
  ) { }

  ngOnInit() {
    this.loadLocation(); //ubicacion actual "ancla"
    this.loadPlaces(); // cargar lugares históricos (custom) desde Firebase
  }

  
  async loadLocation() {
    /*primero se obtinien las coordenadas y luego se carga el mapa*/
    try {
      const position = await this.geolocationService.getCurrentLocation();
      this.latitude = position.latitude;
      this.longitude = position.longitude;
      this.initializeMap(); 
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
/*lugares desde firebase */
    loadPlaces() {
      this.lugarCustom.getLugares().subscribe(places => {
        this.places = places; 
        this.addMarkers(); 
      });
    }

  // mapa de leaflet
  initializeMap() {
    this.map = L.map('mapId').setView([this.latitude, this.longitude], 13); // Establecer la vista del mapa en la ubicación del usuario
    
    // capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(this.map);

    /*marcador en la ubicación del usuario icono customm sino leaflet da error
    la imagen del shadow sera mas pequeña (asi quedara tapada por la real)*/
    
    const userIcon = L.icon({
      iconUrl: 'assets/posActual.png', 
      iconSize: [42, 41], 
      iconAnchor: [12, 41], 
      popupAnchor: [1, -34], 
      shadowUrl: 'assets/marker-shadow2.jpg', 
      shadowSize: [32, 32], 
    });
    
    this.marker = L.marker([this.latitude, this.longitude], { icon: userIcon })
      .addTo(this.map)
      .bindPopup('Tu ubicacion')
      .openPopup();
  }

  // Agregar marcadores para los lugares históricos en el mapa
  addMarkers() {
    /*por alguna razon leaftlet pide algo asi como una ruta para los iconos
    y para la sombra de estos? buno lo siguiente es para setear los iconos necesariso
    estoy (casi) seguro de que esto no sucedio en detalle de los lugares en paris?
    sol: el icono de sombra se hizo mas pequeño que el principal
    esto deberia resolver el problema de los iconos que se veian extraños*/ 
    this.places.forEach(place => {
      if (place.latitude && place.longitude) {
        const customIcon = L.icon({
          iconUrl: 'assets/marker-icon.png',
          iconSize: [41, 41],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          shadowUrl: 'assets/marker-shadow2.jpg',
          shadowSize: [32, 32],
          shadowAnchor: [12, 41],
        });
  
        const marker = L.marker([place.latitude, place.longitude], { icon: customIcon })
          .addTo(this.map)
          .bindPopup(`<b>${place.name}</b><br>${place.description}<br><img src="${place.image}" width="100" />`);
  
        //  clic para navegar a la vista de detalles
        marker.on('click', () => {
          this.goToPlaceDetails(place.id); // pasar el ID de firebase
        });
      }
    });
  }
  goToPlaceDetails(placeId: string) {
    console.log("DAME MI ID: "+placeId)
    this.router.navigate(['/cerca-detail', placeId]); // navega a la ruta 'detail-place' (se desplega el formulario de agregar lugar custom)
  }

  goToCercaForm() {
    this.router.navigate(['/cerca-form']); // navegar a la página "cerca-form" (aqui se agrega un nueva ubicacion)
  }
}
