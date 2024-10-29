import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { StorageService } from 'src/managers/StorageService';
import { BackgroundMusicService } from 'src/app/services/background-music.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  invalidLogin = false;
  loginForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private sessionManager: SessionManager,
    private storageService: StorageService,
    private backgroundMusicService: BackgroundMusicService) {
    // RECORDAR QUE ESTO ES FORMULARIO
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


  }

  ngOnInit() {
  }
  
/* eso se ejecuta cada ves que se entra a vista,
es para recetear los valores del formulario del login,
por suerte esto es algo de ionic
*/
ionViewWillEnter() {
  this.resetForm();
}

resetForm() {
  /*borra datos del formulario */
  this.loginForm.reset(); 
  /*por si acaso re-estableceremos esta variable */
  this.invalidLogin = false; 
}
  async onLogin() {
    if (this.loginForm.valid ) {
      const { email, password } = this.loginForm.value;
      try {
        const isAuthenticated = await this.sessionManager.loginWith(email, password);
        if (isAuthenticated) {
          //await this.storageService.set('userEmail', this.email)
          await this.storageService.set('email', email)
          await this.storageService.set('isSessionActive', true)

          //ESTA LINEA ES PARA LA MUSICA DE FONDO
          //this.backgroundMusicService.startBackgroundMusic();

          this.router.navigate(['/home'], { queryParams: { email: email } });
        } else {
          this.invalidLogin = true;
          console.log("NO VALIDO NO VALIDO")
          //alert('Las credenciales ingresadas son inválidas.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.invalidLogin = true; // Mostrar mensaje de error en la interfaz si ocurre un error
      }
    } else {
    console.log("Formulario inválido");
  }
}
  // Método para redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
