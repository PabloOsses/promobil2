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
    private lugarCustom: lugarCustom //manager o service que lee los lugares custom
  ) {}

  ngOnInit() {
    /*no esoty seguro porque pero el clasico subcribe para recibir el parametro 
    no funcionaba, pero existe snapshot y eso hizo el trabajo */
    this.placeId = this.route.snapshot.paramMap.get('id'); 
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

