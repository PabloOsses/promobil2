import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/managers/geolocationService';
@Component({
  selector: 'app-cerca-de-mi',
  templateUrl: './cerca-de-mi.page.html',
  styleUrls: ['./cerca-de-mi.page.scss'],
})
export class CercaDeMiPage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string = ''; // Mensaje de error en caso de problemas
  constructor(
    private geolocationService: GeolocationService

  ) { }

  ngOnInit() {
    this.loadLocation();
  }
  async loadLocation() {
    try {
      const position = await this.geolocationService.getCurrentLocation();
      this.latitude = position.latitude;
      this.longitude = position.longitude;
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
