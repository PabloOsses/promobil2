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

  usuario: string = '';
  cities = [
    { name: 'París', image: 'assets/ciudades/banner/paris.jpg' },
    /*
    { name: 'Roma', image: 'assets/roma.jpg' },
    { name: 'Londres', image: 'assets/londres.jpg' },
    { name: 'Nueva York', image: 'assets/nueva-york.jpg' },
    */
  ];
  constructor(private router: Router,private route: ActivatedRoute, private storageService: StorageService) {}
  async ngOnInit() { 
    this.loadData()
  }

  async loadData() {
    const user = await this.storageService.get('user')
    this.usuario = user
    if (this.usuario===null){
        //console.log("NULL NULLL NULL")
        await this.storageService.clear()
        this.router.navigate(['/splash'])
    }
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

