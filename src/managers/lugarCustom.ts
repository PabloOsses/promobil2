import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class lugarCustom {
  constructor(private db: AngularFireDatabase) {}

  /*
  savePlace(newPlace: any) {
    const placesRef = this.db.list('custom'); // 'custom' es la ruta donde se almacenan los lugares
    placesRef.push(newPlace); // Agrega el nuevo lugar a la base de datos
  }
  getLugares(): Observable<any[]> {
    return this.db.list('custom').valueChanges(); // 
  }*/
    savePlace(newPlace: any) {
      const placesRef = this.db.list('custom'); // 'custom' es la ruta donde se almacenan los lugares
      placesRef.push(newPlace); // Agrega el nuevo lugar a la base de datos
    }
    getLugares(): Observable<any[]> {
      return this.db.list('custom').snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.val() as object; // Forzar el tipo de datos
            return {
              id: a.key, // La clave generada por Firebase
              ...data, // Esparcir los datos del lugar
            };
          })
        )
      );
    }
    getLugarById(id: string): Observable<any> {
      return this.db.object(`custom/${id}`).valueChanges();
    }
  
    // Actualizar un lugar
    updatePlace(id: string, updatedPlace: any) {
      this.db.object(`custom/${id}`).update(updatedPlace);
    }
  
    // Eliminar un lugar
    deletePlace(id: string) {
      this.db.object(`custom/${id}`).remove();
    }  
}