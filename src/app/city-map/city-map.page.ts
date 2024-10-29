import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.page.html',
  styleUrls: ['./city-map.page.scss'],
})
export class CityMapPage implements OnInit {

  usuario: string = '';
  map: L.Map;

  // Coordenadas de ejemplo para atracciones de París
  private attractions = [
    { name: 'Torre Eiffel', lat: 48.8584, lng: 2.2945 },
    { name: 'Museo del Louvre', lat: 48.8606, lng: 2.3376 },
    { name: 'Catedral de Notre Dame', lat: 48.8527, lng: 2.3506 }
  ];
  constructor(private router: Router,private route: ActivatedRoute) {}
  ngOnInit() {
    /*
    this.route.queryParams.subscribe( params=> {
      this.usuario = params['user'] || '';
    });
    */
    this.initializeMap();
    
  }
  /*
  navigateToOtherPage() {
    this.router.navigate(['/detail-place']);
  }
    */
  private initializeMap() {
    // Inicializar el mapa centrado en París
    this.map = L.map('mapId').setView([48.8566, 2.3522], 13);

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    const customIcon = L.icon({
      iconUrl: 'url(/assets/logo_v0.png)',
      iconSize: [32, 32], // Ajusta el tamaño según tu icono
      iconAnchor: [16, 32], // Ajusta el anclaje
      popupAnchor: [0, -32] // Ajusta el popup
    });
    // Añadir marcadores para cada atracción
    this.attractions.forEach(attraction => {
      L.marker([attraction.lat, attraction.lng], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`<b>${attraction.name}</b>`)
        .openPopup();
    });
  }

  // Destruir el mapa al salir de la vista
  ionViewDidLeave() {
    if (this.map) {
      this.map.remove();
    }
  }
}
