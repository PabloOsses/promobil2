import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { StorageService } from 'src/managers/StorageService';
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
    private storageService: StorageService) {
    // RECORDAR QUE ESTO ES FORMULARIO
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  ngOnInit() {
  }
  
// Método para iniciar sesión
  async onLogin() {
    if (this.loginForm.valid ) {
      const { username, password } = this.loginForm.value;
    
    if (this.sessionManager.performLogin(username,password)) {
      //await this.storageService.set('userEmail', this.email)
      await this.storageService.set('user', username)
      await this.storageService.set('isSessionActive', true)
      this.router.navigate(['/home'], { queryParams: { user: username } });
    } else {
      this.invalidLogin = true;
      
      alert('Las credenciales ingresadas son inválidas.');
    }
  }
}
  // Método para redirigir a la página de registro
  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
