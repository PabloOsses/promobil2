import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-place',
  templateUrl: './detail-place.page.html',
  styleUrls: ['./detail-place.page.scss'],
})
export class DetailPlacePage implements OnInit {
  comentarios = [
    { usuario: 'Juana', texto: '¡Gran lugar!' },
    { usuario: 'Esteban', texto: 'No me gusta' },
    { usuario: 'Lucho', texto: 'BAGUETTE BAGUETTE BAGUETTE BAGUETTE' },
    { usuario: 'Prueba', texto: 'COMENTARIO COMENTARIO COMENTARIO COMENTARIO' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
