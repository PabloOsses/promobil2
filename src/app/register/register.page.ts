import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

  }

  ngOnInit() {
  }
  onRegister() {
    if (this.registerForm.valid) {
      // Lógica para manejar el registro
      console.log('Formulario de registro válido');
      this.router.navigate(['/login']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
