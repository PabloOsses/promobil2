import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class lugarCustom {
  constructor(private db: AngularFireDatabase) {}
    savePlace(newPlace: any) {
      const placesRef = this.db.list('custom'); 
      placesRef.push(newPlace); 
    }
    getLugares(): Observable<any[]> {
      return this.db.list('custom').snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.val() as object; 
            return {
              id: a.key, 
              ...data, 
            };
          })
        )
      );
    }
    getLugarById(id: string): Observable<any> {
      return this.db.object(`custom/${id}`).valueChanges();
    }
  
    // actualizar un lugar
    updatePlace(id: string, updatedPlace: any) {
      this.db.object(`custom/${id}`).update(updatedPlace);
    }
  
    // eliminar un lugar
    deletePlace(id: string) {
      this.db.object(`custom/${id}`).remove();
    }  
}