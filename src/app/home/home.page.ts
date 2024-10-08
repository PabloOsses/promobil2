import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private router: Router,private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe( params=> {
      this.usuario = params['user'] || '';
    });
  }


  onCityClick(cityName: string) {
    console.log('Ciudad seleccionada:', cityName);
    this.router.navigate(['/city-map']);
  }
}

