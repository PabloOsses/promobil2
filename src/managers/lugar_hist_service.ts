import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private db: AngularFireDatabase) {}

  // Método para obtener comentarios de una atracción específica
  getComments(attractionName: string): Observable<any[]> {
    return this.db.list(`comments/${attractionName}`).valueChanges();
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
    return this.db.list(`comments/${attractionName}`).remove(commentId);
  }
}

