import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
profileForm: any;
private authService = inject(AuthService);
private router = inject(Router);

 constructor(private fb: FormBuilder) {
     this.profileForm = this.fb.group({
       mail: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
     });
   }

async loginEmailPassword() {
    if (this.profileForm.invalid) {
      console.log('Formulario invalido');
      return;
    }
      const response = this.profileForm.value;
      const loginEmail: string = response.mail || '';
      const loginPassword: string = response.password || '';

      console.log(response); //envio al back y me devuelve la respuesta
      console.log(loginEmail);
      console.log(loginPassword);
      try {
        const userCredential = await this.authService.login(
          loginEmail,
          loginPassword
        );
        console.log(userCredential.user);
        this.router.navigate(['/login']);
      } catch (error) {
        console.log(error);
      }
    };

    async logout() {
      try {
        await this.authService.logout();
        console.log('Sesión cerrada correctamente');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
}
