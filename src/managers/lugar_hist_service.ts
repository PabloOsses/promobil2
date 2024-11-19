import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private db: AngularFireDatabase) {}

  // obtener comentarios de una atracción específica
  
    getComments(attractionName: string): Observable<any[]> {
      return this.db.list(`comments/${attractionName}`).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as object) }))
        )
      );
    }

  // agregar un nuevo comentario
  /*
  addComment(attractionName: string, usuario: string, texto: string) {
    const comment = { usuario, texto };
    return this.db.list(`comments/${attractionName}`).push(comment).then(ref => ref.key);
  }*/
    addComment(attractionName: string, comment: { usuario: string; texto: string; imagen?: string }) {
      return this.db.list(`comments/${attractionName}`).push(comment).then(ref => ref.key);
    }
  

  // actualizar un comentario 
  updateComment(attractionName: string, commentId: string, updatedText: string) {
    return this.db.list(`comments/${attractionName}`).update(commentId, { texto: updatedText });
}

  // eliminar un comentario
  deleteComment(attractionName: string, commentId: string) {
    if (!commentId) {
      console.error('No se puede eliminar el comentario: ID inválido.');
      return Promise.reject('ID inválido');
    }
    return this.db.list(`comments/${attractionName}`).remove(commentId);
  }
  
}

