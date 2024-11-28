import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/managers/StorageService';
import { ItemCrudService } from 'src/managers/item_crud_service';
import { Usuario } from 'src/app/model/usuario.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string = '';
  userName: string = '';
  /*Por ahora solo tendremos paris, mas ciudades se añadiran en el futuro
  y probablemente se deberan leer desde firebase*/
  cities = [
    { name: 'París', image: 'assets/ciudades/banner_ciudad/paris2.jpg' },
    /*
    { name: 'Roma', image: 'assets/roma.jpg' },
    { name: 'Troya', image: 'assets/londres.jpg' },*/
    
];
  constructor(private router: Router,
    private route: ActivatedRoute, 
    private storageService: StorageService,
    private itemCrudService: ItemCrudService) {}
  async ngOnInit() { 
    this.loadData()
    
  }

  async loadData() {
    const email = await this.storageService.get('email')
    this.email = email

    // esto es codigo para obtener el nombre de usuario
    this.itemCrudService.getItems().subscribe(users => {
      const user = users.find((u: Usuario) => u.mail === email);
      if (user) {
        this.userName = user.nombre;  // Asignar el nombre encontrado
      }
    });
  }
  
  async logout() {
    await this.storageService.clear()
    this.router.navigate(['/splash'])
  }
/*
  onCityClick(cityName: string) {
    console.log('Ciudad seleccionada:', cityName);
    this.router.navigate(['/city-map']);
  }*/
    onCityClick(cityName: string) {
      console.log('Ciudad seleccionada:', cityName);
      this.router.navigate(['/city-map'], { queryParams: { city: cityName } });
    }
    onNearbyClick() {
      //console.log('nuevo boton ');
      this.router.navigate(['/cerca-de-mi']);  // Navegar a la vista 'nearby'
    }
}

