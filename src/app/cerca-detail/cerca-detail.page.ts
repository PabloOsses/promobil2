import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lugarCustom } from 'src/managers/lugarCustom';

@Component({
  selector: 'app-cerca-detail',
  templateUrl: './cerca-detail.page.html',
  styleUrls: ['./cerca-detail.page.scss'],
})
export class CercaDetailPage implements OnInit {
  placeId: string;
  place: any;

  constructor(
    private route: ActivatedRoute,
    private lugarCustom: lugarCustom // Servicio para obtener los detalles del lugar
  ) {}

  ngOnInit() {
    this.placeId = this.route.snapshot.paramMap.get('id'); // Obtener el 'id' de la URL
    this.loadPlaceDetails();
  }

  loadPlaceDetails() {
    if (this.placeId) {
      this.lugarCustom.getLugarById(this.placeId).subscribe((place) => {
        this.place = place;
      });
    }
  }
}

