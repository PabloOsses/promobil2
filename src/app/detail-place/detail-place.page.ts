import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/managers/lugar_hist_service';
import { StorageService } from 'src/managers/StorageService';
import { ItemCrudService } from 'src/managers/item_crud_service';
import { GeolocationService } from 'src/managers/geolocationService';
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
      description: 'La Torre Eiffel es un famoso icono de París, construida de hierro forjado.',
      latitude: 48.8584, // Coordenadas de la Torre Eiffel
      longitude: 2.2945
    },
    'Museo del Louvre': {
      imageUrl: 'assets/lugar_historico/louvre.jpg',
      description: 'El Museo del Louvre es uno de los museos más grandes y famosos del mundo.',
      latitude: 48.8606, // Coordenadas del Museo del Louvre
      longitude: 2.3376
    },
    'Catedral de Notre Dame': {
      imageUrl: 'assets/lugar_historico/notre_dame.jpg',
      description: 'Notre Dame es una catedral famosa en París, conocida por su arquitectura gótica y su rica historia.',
      latitude: 48.8529, // Coordenadas de Notre Dame
      longitude: 2.3500
    }
  };

  email: string = '';
  userName: string = '';
  isFlipped: boolean = false;
  attractionName: string; // nombre de la atracción seleccionada
  imageUrl: string; // URL de la imagen de la atracción
  description: string; // descripción de la atracción
  currentComentarios: any[] = []; // comentarios de la atracción actual
  isAddingComment: boolean = false; // visibilidad del campo de entrada
  newCommentText: string = ''; // Almacena el texto del nuevo comentario
  userLatitude: number = 0;
  userLongitude: number = 0;
  estimatedDays: number = 0; // Días estimados para llegar

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private storageService: StorageService,
    private itemCrudService: ItemCrudService,
    private geolocationService: GeolocationService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attractionName = params['attraction'];
      this.setAttractionDetails(this.attractionName);
      this.loadData();
      this.loadComments(); 
      this.getUserLocation();
    });
  }

  async getUserLocation() {
    try {
      const location = await this.geolocationService.getCurrentLocation();
      this.userLatitude = location.latitude;
      this.userLongitude = location.longitude;
      this.calculateTravelTime(); // Llamar a la función para calcular el tiempo de viaje
    } catch (error) {
      console.error("Error obteniendo ubicación: ", error);
    }
  }

  // Calcular distancia usando la fórmula de Haversine
  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en kilómetros
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Calcular el tiempo de viaje estimado
  async calculateTravelTime() {
    const attraction = this.attractions[this.attractionName];

    if (!attraction) {
      console.error('Atracción no encontrada');
      return;
    }

    const distancia = this.calcularDistancia(
      this.userLatitude, this.userLongitude, attraction.latitude, attraction.longitude
    );
    
    const velocidadPromedio = 5; // km/h (a pie)
    const tiempoHoras = distancia / velocidadPromedio; // Tiempo en horas
    this.estimatedDays = Math.round(tiempoHoras / 24); // Convertir horas a días

    console.log(`Tiempo estimado para llegar a ${this.attractionName}: ${this.estimatedDays} días`);
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

  // movimiento de la imagen de la atracción
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

  // método para iniciar la edición de un comentario
  editComment(comentario: any) {
    comentario.isEditing = true; 
  }

  submitEdit(comentario: any) {
    if (comentario.texto.trim()) {
      this.commentsService.updateComment(this.attractionName, comentario.key, comentario.texto)
        .then(() => {
          comentario.isEditing = false; // Desactiva el modo de edición
        })
        .catch(error => {
          console.error('Error al editar el comentario:', error);
        });
    }
  }

  deleteComment(commentKey: string, comentario: any) {
    if (comentario.usuario === this.userName) {
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
