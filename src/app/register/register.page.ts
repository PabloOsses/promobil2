import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionManager } from 'src/managers/SessionManager';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { ItemCrudService } from 'src/managers/item_crud_service';
import { Usuario } from 'src/app/model/usuario.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  usuario_registrado: Usuario;
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private sessionManager: SessionManager,
    private itemCrudService: ItemCrudService, 
    private alert: CancelAlertService) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });


  }

  ngOnInit() {
  }
  /*
  onRegister() {
    if (this.registerForm.valid) {
      // Lógica para manejar el registro
      console.log('Formulario de registro válido');
      this.router.navigate(['/login']);
    }
  }
*/
  goToLogin() {
    this.router.navigate(['/login']);
  }

  async onRegisterButtonPressed() {
    if (this.registerForm.valid ) {
      const { username,email,password } = this.registerForm.value;
      
      //----------
      /* modificacion para guardar el NOMBRE del usuario */
      this.usuario_registrado = {
        mail: email,
        nombre: username
      };
      //---------
    try {
      const userCredential = await this.sessionManager.registerUserWith(
        email,
        password
      );

      const user = userCredential.user;
      
      if (user) {
//--------------------------------
/* modificacion para guardar el NOMBRE del usuario en firebase */
        
  await this.itemCrudService.createItem(this.usuario_registrado);
  console.log('Usuario guardado en Firebase:', this.usuario_registrado.nombre);


//----------------------------------
        this.alert.showAlert(
          'Registro exitoso '+username,                         
          'Ya eres parte de nuestro sistema', 
          () => {    
            this.router.navigate(['/login']);     
          }
        )
        
      } else {
        alert('¡Registro exitoso!');
      }

      
      this.router.navigate(['/login']);

    } catch (error: any) {

      switch (error.code) {
        case 'auth/email-already-in-use':
          this.alert.showAlert(
            'Error',                         
            'Este correo electrónico ya está en uso. Por favor, utiliza otro o inicia sesión.', 
            () => {    
              this.registerForm.reset();      
            }
          )
          break
        case 'auth/invalid-email':
          this.alert.showAlert(
            'Error',                         
            'La dirección de correo electrónico no es válida.', 
            () => {    
              this.registerForm.reset();      
            }
          )
          break
        case 'auth/weak-password':
          this.alert.showAlert(
            'Error',                         
            'La contraseña es muy débil.', 
            () => {    
              this.registerForm.reset();      
            }
          )
          break
        default:
          this.alert.showAlert(
            'Error',                         
            'Ocurrió un error al registrar el usuario: ' + error.message, 
            () => {    
              this.registerForm.reset();      
            }
          )
          break
      }
    }
  }
}





}


