import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { catchError } from 'rxjs';
import { connectAuthEmulator, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment} from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  data = '';
  profileForm;
  usersService = inject(UsersService);
  auth = getAuth(initializeApp(environment.firebaseConfig));

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
     // Inicializa Firebase correctamente
     // Conectar al emulador si está activado
    if (environment.useEmulator) {
      console.log("Conectando al emulador de Auth...");
      connectAuthEmulator(this.auth, "http://localhost:9099");
    }
  }

  async submit() {
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
  
      const userCredential = await createUserWithEmailAndPassword(this.auth, loginEmail, loginPassword)
      console.log(userCredential.user);
  }
}
