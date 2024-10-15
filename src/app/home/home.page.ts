import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string = '';
  cities = [
    { name: 'París', image: 'assets/ciudades/banner_ciudad/paris2.jpg' },
    /*
    { name: 'Roma', image: 'assets/roma.jpg' },
    { name: 'Troya', image: 'assets/londres.jpg' },*/
    
];
  constructor(private router: Router,private route: ActivatedRoute, private storageService: StorageService) {}
  async ngOnInit() { 
    this.loadData()
  }

  async loadData() {
    const email = await this.storageService.get('email')
    this.email = email
    
  }
  
  async logout() {
    await this.storageService.clear()
    this.router.navigate(['/splash'])
  }

  onCityClick(cityName: string) {
    console.log('Ciudad seleccionada:', cityName);
    this.router.navigate(['/city-map']);
  }
}

