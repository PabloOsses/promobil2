import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AttractionsService } from 'src/managers/attractionList';
import * as L from 'leaflet';

@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.page.html',
  styleUrls: ['./city-map.page.scss'],
})
export class CityMapPage implements OnInit {

  usuario: string = '';
  map: L.Map;
  city: string = ''; // Ciudad recibida como parámetro
  
  attractions: any = {}; // Declaración de la propiedad 'attractions'

  

  constructor(private router: Router, 
    private route: ActivatedRoute,
    
    private attractionsService: AttractionsService) {}

  ngOnInit() {
    //this.initializeMap();
    this.route.queryParams.subscribe(params => {
      this.city = params['city'] || 'París'; // Por defecto "París"
      this.initializeMap();
      this.loadAttractions();
    });
  }

  private initializeMap() {
    const defaultLat = 0; // Valores predeterminados para el inicio
    const defaultLng = 0;
  
    this.map = L.map('mapId').setView([defaultLat, defaultLng], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  
    // Asegúrate de invalidar el tamaño del mapa después de un pequeño retraso
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200); // Ajusta el tiempo si es necesario
  }

  private loadAttractions() {
    // Leer atracciones de Firebase segun ciudad seleccionada
    this.attractionsService.getAttractions(this.city).subscribe(attractions => {
      if (attractions) {
        this.attractions = attractions;
        this.map.setView([this.attractions.latitude, this.attractions.longitude], 13); // Actualizar vista del mapa
        this.addMarkers(attractions);
      }
    });
  }
  private addMarkers(attractions: any) {
    Object.keys(attractions).forEach(key => {
      const attraction = attractions[key];
      const customIcon = L.icon({
        iconUrl: attraction.iconUrl,
        iconSize: [70, 70],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([attraction.latitude, attraction.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`
          <div style="text-align: center;">
            <b>${key}</b><br>
            <button 
              class="circular-button" 
              onclick="window.dispatchEvent(new CustomEvent('attractionClick', { detail: '${key}' }))">
              ➔
            </button>
          </div>
        `);

      marker.on('click', () => {
        this.onAttractionClick(key);
      });
    });
  }
  private onAttractionClick(name: string) {
    // Navegar a la página de detalles de la atracción
    //vamos a pasar tanto el nombre de la atraccion como el nombre de la ciudad
    /*dejemos este comentario como testimonio de que apenas comprendemos 
    bases de datos no relacionales */
    this.router.navigate(['/detail-place'], { 
      queryParams: { 
        attraction: name, 
        city: this.city  // Pasamos el nombre de la ciudad como parámetro
      }
    });
  }

  // COdigo para borrar el mapa al salir de la vista
  //comentado porque es redundante, por ahora
  /*
  ionViewDidLeave() {
    if (this.map) {
      this.map.remove();
    }
  }*/
}
