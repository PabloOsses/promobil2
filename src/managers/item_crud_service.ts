import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ItemCrudService {
    private basePath = '/items'

    constructor(private db: AngularFireDatabase) { }

    createItem(item: any) : Promise<void> {
        const id = this.db.createPushId()
        return this.db.object(`${this.basePath}/${id}`).set(item)
    } 

    getItems() : Observable<any> {
        return this.db.list(this.basePath).valueChanges()
    }

     getItem(id: string): Observable<any> {
        return this.db.object(`${this.basePath}/${id}`).valueChanges();
    }

    updateItem(id: string, item: any): Promise<void> {
        return this.db.object(`${this.basePath}/${id}`).update(item);
    }

    deleteItem(id: string): Promise<void> {
        return this.db.object(`${this.basePath}/${id}`).remove();
    }
}