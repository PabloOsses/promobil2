import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttractionsService {
  constructor(private db: AngularFireDatabase) {}

  //  atracciones para una ciudad específica
  getAttractions(city: string): Observable<any> {
    return this.db.object(`attractions/${city}`).valueChanges();
  }
  // (mas detalle) una atracción específica
  getAttractionDetails(city: string, attractionName: string): Observable<any> {
    return this.db.object(`attractions/${city}/${attractionName}`).valueChanges();
  }
}
