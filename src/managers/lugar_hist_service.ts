import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private db: AngularFireDatabase) {}

  // Método para obtener comentarios de una atracción específica
  /*
  getComments(attractionName: string): Observable<any[]> {
    return this.db.list(`comments/${attractionName}`).valueChanges();
  }*/
    getComments(attractionName: string): Observable<any[]> {
      return this.db.list(`comments/${attractionName}`).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as object) }))
        )
      );
    }

  // Método para agregar un nuevo comentario
  addComment(attractionName: string, usuario: string, texto: string) {
    const comment = { usuario, texto };
    return this.db.list(`comments/${attractionName}`).push(comment).then(ref => ref.key);
  }

  // Método para actualizar un comentario existente
  updateComment(attractionName: string, commentId: string, updatedText: string) {
    return this.db.list(`comments/${attractionName}`).update(commentId, { texto: updatedText });
}

  // Método para eliminar un comentario
  deleteComment(attractionName: string, commentId: string) {
    if (!commentId) {
      console.error('No se puede eliminar el comentario: ID inválido.');
      return Promise.reject('ID inválido');
    }
    return this.db.list(`comments/${attractionName}`).remove(commentId);
  }
}

