import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-place',
  templateUrl: './detail-place.page.html',
  styleUrls: ['./detail-place.page.scss'],
})
export class DetailPlacePage implements OnInit {
  
  comentarios = {
    'Torre Eiffel': [
      { usuario: 'Juana', texto: '¡Gran lugar!' },
      { usuario: 'Esteban', texto: 'No me gusta' }
    ],
    'Museo del Louvre': [
      { usuario: 'Lucho', texto: 'Impresionante colección de arte.' },
      { usuario: 'Ana', texto: 'Demasiado grande, no lo pude recorrer todo.' }
    ],
    'Catedral de Notre Dame': [
      { usuario: 'Carlos', texto: 'Increíble arquitectura.' },
      { usuario: 'Marta', texto: 'Una visita obligada en París.' }
    ]
  };

  isFlipped: boolean = false;
  attractionName: string; // Nombre de la atracción
  imageUrl: string; // URL de la imagen
  description: string; // Descripción de la atracción
  currentComentarios: any[]; // Comentarios actuales de la atracción

  attractions = {
    'Torre Eiffel': {
      imageUrl: 'assets/lugar_historico/eifel.jpg',
      description: 'La Torre Eiffel es un famoso icono de París, construida de hierro forjado.'
    },
    'Museo del Louvre': {
      imageUrl: 'assets/lugar_historico/louvre.jpg',
      description: 'El Museo del Louvre es uno de los museos más grandes y famosos del mundo.'
    },
    'Catedral de Notre Dame': {
      imageUrl: 'assets/lugar_historico/notre_dame.jpg',
      description: 'Notre Dame es una catedral famosa en París, conocida por su arquitectura gótica y su rica historia.'
    }
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attractionName = params['attraction'];
      this.setAttractionDetails(this.attractionName);
    });
  }

  setAttractionDetails(name: string) {
    const attraction = this.attractions[name];
    if (attraction) {
      this.imageUrl = attraction.imageUrl;
      this.description = attraction.description;
      this.currentComentarios = this.comentarios[name]; // Asignar comentarios de la atracción actual
    }
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}

