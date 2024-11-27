import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttractionsService {
  constructor(private db: AngularFireDatabase) {}

  // Obtener atracciones para una ciudad específica
  getAttractions(city: string): Observable<any> {
    return this.db.object(`attractions/${city}`).valueChanges();
  }
}
