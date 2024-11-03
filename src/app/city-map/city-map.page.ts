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

  // Coordenadas e íconos para atracciones de París
  private attractions = [
    { name: 'Torre Eiffel', lat: 48.8584, lng: 2.2945, iconUrl: '/assets/lugar_historico/icon_eifel.png' },
    { name: 'Museo del Louvre', lat: 48.8606, lng: 2.3376, iconUrl: '/assets/lugar_historico/icon_lour.png' },
    { name: 'Catedral de Notre Dame', lat: 48.8527, lng: 2.3506, iconUrl: '/assets/lugar_historico/icon_notre.png' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    //this.initializeMap();
    this.initializeMap()
  }

  private initializeMap() {
    // Esto es para inicializar el mapa en paris
    this.map = L.map('mapId').setView([48.8566, 2.3522], 13);

    // Añadir capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    /*Supuestamente añade marcadores con íconos 
    personalizados y botón circular en el popup
    */
    this.attractions.forEach(attraction => {
      const customIcon = L.icon({
        iconUrl: attraction.iconUrl,
        //iconSize: [32, 32],
        iconSize: [70, 70],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      // el pop up solo aparece al volver a esta vista desde el detalle
      //por alguna razon 
      const marker = L.marker([attraction.lat, attraction.lng], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`
          <div style="text-align: center;">
            <b>${attraction.name}</b><br>
            <button 
              class="circular-button" 
              onclick="window.dispatchEvent(new CustomEvent('attractionClick', { detail: '${attraction.name}' }))">
              ➔
            </button>
          </div>
        `);

      marker.on('click', () => {
        this.onAttractionClick(attraction.name);
      });
    });
  }

  private onAttractionClick(name: string) {
    // Navegar a la página de detalles de la atracción
    this.router.navigate(['/detail-place'], { queryParams: { attraction: name } });
  }

  // COdigo para borrar el mapa al salir de la vista
  //comentado porque di vulevo a la vista desde la de detalle, el mapa no carga
  /*
  ionViewDidLeave() {
    if (this.map) {
      this.map.remove();
    }
  }*/
}
