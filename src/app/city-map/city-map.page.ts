import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-city-map',
  templateUrl: './city-map.page.html',
  styleUrls: ['./city-map.page.scss'],
})
export class CityMapPage implements OnInit {

  usuario: string = '';
  constructor(private router: Router,private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe( params=> {
      this.usuario = params['user'] || '';
    });
  }

  navigateToOtherPage() {
    this.router.navigate(['/detail-place']);
  }
}
