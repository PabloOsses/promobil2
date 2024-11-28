import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/managers/lugar_hist_service';
import { StorageService } from 'src/managers/StorageService';
import { ItemCrudService } from 'src/managers/item_crud_service';
import { GeolocationService } from 'src/managers/geolocationService';
import { ImageService } from 'src/managers/imageServise';
import { AttractionsService } from 'src/managers/attractionList';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-detail-place',
  templateUrl: './detail-place.page.html',
  styleUrls: ['./detail-place.page.scss'],
})
export class DetailPlacePage implements OnInit {

  email: string = '';
  userName: string = '';
  isFlipped: boolean = false;
  attractionName: string;
  cityName: string;
  imageUrl: string;
  description: string;
  latitude: number;
  longitude: number;
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
    private imageService: ImageService,
    private attractionsService: AttractionsService  
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attractionName = params['attraction'];
      this.cityName = params['city'];
      this.loadAttractionDetails();
      //this.setAttractionDetails(this.attractionName);
      this.loadData();
      this.loadComments();
      this.getUserLocation();
    });
  }

  // Cargar los detalles de la atracción desde Firebase
  async loadAttractionDetails() {
    this.attractionsService.getAttractionDetails(this.cityName, this.attractionName).subscribe(
      attraction => {
        if (attraction) {
          this.imageUrl = attraction.imageUrl;
          this.description = attraction.description;
          this.latitude = attraction.latitude;
          this.longitude = attraction.longitude;
        } else {
          console.error('No se encontraron detalles para la atracción:', this.attractionName);
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error('Error al cargar los detalles de la atracción:', error);
      }
    );
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
  
  // Calcular el tiempo estimado para llegar a la atracción
  calculateTravelTime() {
    if (!this.latitude || !this.longitude) return;
    const distancia = this.calcularDistancia(
      this.userLatitude,
      this.userLongitude,
      this.latitude,
      this.longitude
    );
    const velocidadPromedio = 5;
    const tiempoHoras = distancia / velocidadPromedio;
    this.estimatedDays = Math.round(tiempoHoras / 24);
  }

  // Función para calcular la distancia entre dos puntos geográficos
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

  // Convertir grados a radianes
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Cargar los datos del usuario
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

  // Cargar los comentarios de la atracción
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

  // Cargar la imagen desde la galería
  async addImage() {
    const result = await this.imageService.getImageFromGallery();
    if (result.success && result.imageUrl) {
      this.attachedImage = result.imageUrl;
    }
  }

  // Enviar comentario
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

  // Editar comentario
  editComment(comentario: any) {
    comentario.isEditing = true;
  }

  // Enviar edición del comentario
  submitEdit(comentario: any) {
    if (comentario.texto.trim()) {
      this.commentsService.updateComment(this.attractionName, comentario.key, comentario.texto).then(() => {
        comentario.isEditing = false;
      });
    }
  }

  // Eliminar comentario
  deleteComment(commentKey: string, comentario: any) {
    if (comentario.usuario === this.userName) {
      this.commentsService.deleteComment(this.attractionName, commentKey).then(() => {
        console.log('Comentario eliminado con éxito');
      });
    }
  }
}
