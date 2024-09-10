/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}*/
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private sessionManager: SessionManager) {
    // RECORDAR QUE ESTO ES FORMULARIO
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  // Método para iniciar sesión
  onLogin() {
    if (this.loginForm.valid ) {
      const { username, password } = this.loginForm.value;
      
      // logica autentificacion (por ahora)
      if (this.sessionManager.performLogin(username, password)) {
        console.log('Inicio de sesión exitoso');
        // Redirigir al home
        this.router.navigate(['/home']); 
      } else {
        console.log('Credenciales incorrectas');
        // Muestra un mensaje de error o realiza alguna acción
      }
    }
  }

  // Método para redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
