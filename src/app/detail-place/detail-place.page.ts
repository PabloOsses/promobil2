import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/managers/lugar_hist_service';
import { StorageService } from 'src/managers/StorageService';
import { ItemCrudService } from 'src/managers/item_crud_service';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-detail-place',
  templateUrl: './detail-place.page.html',
  styleUrls: ['./detail-place.page.scss'],
})
export class DetailPlacePage implements OnInit {
  // Detalles de las atracciones
  attractions = {
    'Torre Eiffel': {
      imageUrl: 'assets/lugar_historico/eifel.jpg',
      description: 'La Torre Eiffel es un famoso icono de París, construida de hierro forjado.'
    },
    'Museo del Louvre': {
      imageUrl: 'assets/lugar_historico/louvre.jpg',
      description: 'El Museo del Louvre es uno de los museos más grandes y famosos del mundo.'
    },
    'Catedral de Notre Dame': {
      imageUrl: 'assets/lugar_historico/notre_dame.jpg',
      description: 'Notre Dame es una catedral famosa en París, conocida por su arquitectura gótica y su rica historia.'
    }
  };

  email: string = '';
  userName: string = '';
  isFlipped: boolean = false;
  attractionName: string; // nombre de la atraccion seleccionada
  imageUrl: string; // URL de la imagen de la atraccion
  description: string; // descripcion de la atraccion
  currentComentarios: any[] = []; // comentarios de la atraccion actual
  isAddingComment: boolean = false; //visibilidad del campo de entrada
  newCommentText: string = ''; // Almacena el texto del nuevo comentario

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private storageService: StorageService,
    private itemCrudService: ItemCrudService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attractionName = params['attraction'];
      this.setAttractionDetails(this.attractionName);
      this.loadData();
      this.loadComments(); 
    });
  }

  async loadData() {
    const email = await this.storageService.get('email');
    this.email = email;

    // Obtener el nombre de usuario
    this.itemCrudService.getItems().subscribe(users => {
      const user = users.find((u: Usuario) => u.mail === email);
      if (user) {
        this.userName = user.nombre; // Asignar el nombre encontrado
      }
    });
  }

  setAttractionDetails(name: string) {
    const attraction = this.attractions[name];
    if (attraction) {
      this.imageUrl = attraction.imageUrl;
      this.description = attraction.description;
    } else {
      console.warn(`Attraction "${name}" not found.`);
      this.router.navigate(['/']); // Redirigir a inicio si la atracción no existe
    }
  }

  // cargar comentarios desde Firebase (se llama al crud)
  loadComments() {
    this.commentsService.getComments(this.attractionName).subscribe(comments => {
        this.currentComentarios = comments.map(comment => {
            
            const key = comment['$key'] || comment.key;
            return { ...comment, key };
        });
    });
  }
//movimiento de la imagen de la atraccion
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  showCommentInput() {
    this.isAddingComment = true;
  }

  // subir un comentario nuevo
  submitComment() {
    if (this.newCommentText.trim()) {
      const usuario = this.userName; // obtiene el usuario autenticado
      this.commentsService.addComment(this.attractionName, usuario, this.newCommentText).then(key => {
        this.newCommentText = ''; 
        this.isAddingComment = false; // Ocultar el campo de entrada después de enviar el comentario
      });
    }
  }

  // metodo para iniciar la edición de un comentario
  editComment(comentario: any) {
    comentario.isEditing = true; 
  }
  

  submitEdit(comentario: any) {
    if (comentario.texto.trim()) {
        // pasa la atracción, el ID del comentario, y el texto actualizado
        this.commentsService.updateComment(this.attractionName, comentario.key, comentario.texto)
            .then(() => {
                // Opcional: puedes agregar lógica aquí si necesitas algo después de la edición
                comentario.isEditing = false; // Desactiva el modo de edición
            })
            .catch(error => {
                console.error('Error al editar el comentario:', error);
            });
    }
  }

  deleteComment(commentKey: string, comentario: any) {
        if (comentario.usuario === this.userName) { 
          // se verifica si el usuario actual es el propietario del comentario
            this.commentsService.deleteComment(this.attractionName, commentKey)
                .then(() => {
                    console.log('Comentario eliminado con éxito');
                })
                .catch(error => {
                    console.error('Error al eliminar el comentario:', error);
                });
        } else {
            console.warn('No tienes permiso para eliminar este comentario');
        }
    }
}
