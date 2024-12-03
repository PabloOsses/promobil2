/*VISTA OBSOLETA, NO USADA IGNORAR*/ 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dplay-imagen',
  templateUrl: './dplay-imagen.page.html',
  styleUrls: ['./dplay-imagen.page.scss'],
})
export class DplayImagenPage implements OnInit {
  selectedImage: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Obtener el parámetro 'image' de la URL
    this.route.queryParams.subscribe(params => {
      this.selectedImage = params['image']; 
      console.log(this.selectedImage);  
    });

}}
