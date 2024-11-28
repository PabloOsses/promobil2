import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class lugarCustom {
  constructor(private db: AngularFireDatabase) {}

  // Función para guardar un nuevo lugar histórico
  savePlace(newPlace: any) {
    const placesRef = this.db.list('custom'); // 'custom' es la ruta donde se almacenan los lugares
    placesRef.push(newPlace); // Agrega el nuevo lugar a la base de datos
  }
  getLugares(): Observable<any[]> {
    return this.db.list('custom').valueChanges(); // 
  }
}