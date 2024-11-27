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

  email: string = '';
  userName: string = '';
  isFlipped: boolean = false;
  attractionName: string;
  imageUrl: string;
  description: string;
  currentComentarios: any[] = [];
  isAddingComment: boolean = false;
  newCommentText: string = '';
  userLatitude: number = 0;
  userLongitude: number = 0;
  estimatedDays: number = 0;
  attachedImage: string | null = null;
  selectedImage: string = '';  // Variable para manejar la imagen seleccionada para mostrar en el modal

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService,
    private storageService: StorageService,
    private itemCrudService: ItemCrudService,
    private geolocationService: GeolocationService,
    private imageService: ImageService
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
      this.calculateTravelTime();
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  calculateTravelTime() {
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

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async loadData() {
    const email = await this.storageService.get('email');
    this.email = email;

    this.itemCrudService.getItems().subscribe(users => {
      const user = users.find((u: Usuario) => u.mail === email);
      if (user) {
        this.userName = user.nombre;
      }
    });
  }

  setAttractionDetails(name: string) {
    const attraction = this.attractions[name];
    if (attraction) {
      this.imageUrl = attraction.imageUrl;
      this.description = attraction.description;
    } else {
      this.router.navigate(['/']);
    }
  }

  loadComments() {
    this.commentsService.getComments(this.attractionName).subscribe(comments => {
      this.currentComentarios = comments.map(comment => ({
        ...comment,
        key: comment['$key'] || comment.key,
      }));
    });
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  showCommentInput() {
    this.isAddingComment = true;
  }

  async addImage() {
    const result = await this.imageService.getImageFromGallery();
    if (result.success && result.imageUrl) {
      this.attachedImage = result.imageUrl;
    }
  }

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

  editComment(comentario: any) {
    comentario.isEditing = true;
  }

  submitEdit(comentario: any) {
    if (comentario.texto.trim()) {
      this.commentsService.updateComment(this.attractionName, comentario.key, comentario.texto).then(() => {
        comentario.isEditing = false;
      });
    }
  }

  deleteComment(commentKey: string, comentario: any) {
    if (comentario.usuario === this.userName) {
      this.commentsService.deleteComment(this.attractionName, commentKey).then(() => {
        console.log('Comentario eliminado con éxito');
      });
    }
  }

  // Método para mostrar la imagen en el modal
  /*
  showImage(imagen: string) {
    this.selectedImage = imagen;  // Asigna la URL de la imagen al modal
    console.log(imagen)
  }*/
 /*
    showImage(imagen: string) {
      // Usar el enrutador para redirigir a la página dplay_image pasando el parámetro imagen
      console.log(imagen)
      this.router.navigate(['/dplay-imagen'], { queryParams: { image: imagen } });
    } */
  
}
