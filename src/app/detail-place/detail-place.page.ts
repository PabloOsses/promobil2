import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/managers/lugar_hist_service';
import { StorageService } from 'src/managers/StorageService';
import { ItemCrudService } from 'src/managers/item_crud_service';
import { GeolocationService } from 'src/managers/geolocationService';
import { ImageService } from 'src/managers/imageServise';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-detail-place',
  templateUrl: './detail-place.page.html',
  styleUrls: ['./detail-place.page.scss'],
})
export class DetailPlacePage implements OnInit {
   // Definición de los lugares históricos con su información
  attractions = {
    'Torre Eiffel': {
      imageUrl: 'assets/lugar_historico/eifel.jpg',
      description: 'La Torre Eiffel es un famoso icono de París, construida de hierro forjado.',
      latitude: 48.8584,
      longitude: 2.2945,
    },
    'Museo del Louvre': {
      imageUrl: 'assets/lugar_historico/louvre.jpg',
      description: 'El Museo del Louvre es uno de los museos más grandes y famosos del mundo.',
      latitude: 48.8606,
      longitude: 2.3376,
    },
    'Catedral de Notre Dame': {
      imageUrl: 'assets/lugar_historico/notre_dame.jpg',
      description: 'Notre Dame es una catedral famosa en París, conocida por su arquitectura gótica y su rica historia.',
      latitude: 48.8529,
      longitude: 2.3500,
    },
  };

  email: string = ''; // Almacena el email del usuario
  userName: string = ''; // Almacena el nombre del usuario
  isFlipped: boolean = false; // Controla el estado de voltear la imagen
  attractionName: string; // Almacena el nombre de la atracción seleccionada
  imageUrl: string; // URL de la imagen de la atracción
  description: string; // Descripción de la atracción
  currentComentarios: any[] = []; // Lista de comentarios actuales
  isAddingComment: boolean = false; // Controla si el usuario está agregando un comentario
  newCommentText: string = ''; // Texto del nuevo comentario
  userLatitude: number = 0; // Latitud del usuario
  userLongitude: number = 0; // Longitud del usuario
  estimatedDays: number = 0; // Estimación de días de viaje
  attachedImage: string | null = null; // Imagen adjunta al comentario

  constructor(
    private route: ActivatedRoute, // Servicio para obtener parámetros de la URL
    private router: Router, // Servicio de navegación
    private commentsService: CommentsService, // Servicio para manejar comentarios
    private storageService: StorageService, // Servicio para acceder al almacenamiento local
    private itemCrudService: ItemCrudService, // Servicio para manejar la información de usuario
    private geolocationService: GeolocationService, // Servicio para obtener la ubicación geográfica
    private imageService: ImageService // Servicio para obtener imágenes desde la galería
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attractionName = params['attraction']; // Obtener el nombre de la atracción desde los parámetros de la URL
      this.setAttractionDetails(this.attractionName); // Establecer los detalles de la atracción
      this.loadData(); // Cargar datos del usuario
      this.loadComments(); // Cargar comentarios de la atracción
      this.getUserLocation(); // Obtener la ubicación del usuario
    });
  }

  // Método para obtener la ubicación actual del usuario
  async getUserLocation() {
    try {
      const location = await this.geolocationService.getCurrentLocation(); // Obtener ubicación
      this.userLatitude = location.latitude; // Almacenar latitud
      this.userLongitude = location.longitude; // Almacenar longitud
      this.calculateTravelTime(); // Calcular el tiempo estimado para llegar
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }
//nota:crei que el calculo sera mas facil
//usa una formula llamada Haversine que toma en cuenta la curvatura de la tierra o algo
  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
//parte del calculo
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
//parte del calculo
  async calculateTravelTime() {
    const attraction = this.attractions[this.attractionName];
    if (!attraction) {
      console.error('Atracción no encontrada');
      return;
    }
    const distancia = this.calcularDistancia(
      this.userLatitude,
      this.userLongitude,
      attraction.latitude,
      attraction.longitude
    );
    const velocidadPromedio = 5;
    const tiempoHoras = distancia / velocidadPromedio;
    this.estimatedDays = Math.round(tiempoHoras / 24);
  }

  // metodo para cargar los datos del usuario desde el almacenamiento
  async loadData() {
    const email = await this.storageService.get('email'); // Obtiene el email del usuario desde almacenamiento
    this.email = email; // Almacena el email

    this.itemCrudService.getItems().subscribe(users => { // Obtiene lista de usuarios
      const user = users.find((u: Usuario) => u.mail === email); // Busca al usuario por email
      if (user) {
        this.userName = user.nombre; // Almacena el nombre del usuario
      }
    });
  }

  // metodo para establecer los detalles de la atracción (imagen y descripción)
  setAttractionDetails(name: string) {
    const attraction = this.attractions[name];
    if (attraction) {
      this.imageUrl = attraction.imageUrl; // Establece la imagen de la atracción
      this.description = attraction.description; // Establece la descripción de la atracción
    } else {
      this.router.navigate(['/']); // Redirige al inicio si no se encuentra la atracción
    }
  }

  // metodo para cargar los comentarios de la atracción
  loadComments() {
    this.commentsService.getComments(this.attractionName).subscribe(comments => { 
      this.currentComentarios = comments.map(comment => ({
        ...comment,
        key: comment['$key'] || comment.key, // Agrega clave única al comentario
      }));
    });
  }
// metodo para alternar el estado de voltear la imagen
  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
 // metodo para mostrar el campo de entrada de comentario
  showCommentInput() {
    this.isAddingComment = true;
  }
// metodo para agregar una imagen a un comentario
  async addImage() {
    const result = await this.imageService.getImageFromGallery();
    if (result.success && result.imageUrl) {
      this.attachedImage = result.imageUrl;
    }
  }
// metodo para enviar un comentario
  submitComment() {
    if (this.newCommentText.trim()) {
      const comment = { 
        usuario: this.userName, 
        texto: this.newCommentText 
      };
  
      if (this.attachedImage) {
        comment['imagen'] = this.attachedImage;
      }
  
      this.commentsService.addComment(this.attractionName, comment).then(() => {
        this.newCommentText = '';
        this.attachedImage = null;
        this.isAddingComment = false;
      });
    }
  }
// metodo para habilitar la edición de un comentario
  editComment(comentario: any) {
    comentario.isEditing = true;
  }
//metodo para enviar los cambios en un comentario editado
  submitEdit(comentario: any) {
    if (comentario.texto.trim()) {
      this.commentsService.updateComment(this.attractionName, comentario.key, comentario.texto).then(() => {
        comentario.isEditing = false;
      });
    }
  }
//eliminar comentario
  deleteComment(commentKey: string, comentario: any) {
    if (comentario.usuario === this.userName) {
      this.commentsService.deleteComment(this.attractionName, commentKey).then(() => {
        console.log('Comentario eliminado con éxito');
      });
    }
  }
}
