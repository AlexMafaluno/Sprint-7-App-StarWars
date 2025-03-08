import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { catchError } from 'rxjs';
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut

} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../environments/environment';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  data = '';
  formReg: FormGroup;
  private authService = inject(AuthService);
  private auth = inject(Auth);
  private router = inject(Router);

  
  constructor(private fb: FormBuilder) {
    this.formReg = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  
  async createAccount () {
    if (this.formReg.invalid) {
      console.log('Formulario invalido');
      return;
    }
    
      const response = this.formReg.value;
      const loginEmail: string = response.mail || '';
      const loginPassword: string = response.password || '';

      console.log(response); //envio al back y me devuelve la respuesta
      console.log(loginEmail);
      console.log(loginPassword);
      try {
        const userCredential = await this.authService.register(
          loginEmail,
          loginPassword
        );
        console.log(userCredential.user);
        this.router.navigate(['/login']);
      } catch (error) {
        console.log(error);
      }
    };

  async monitorAuthState(): Promise<void> {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('logged in');
      } else {
        console.log('no user');
      }
    });
  }

  ngOnInit() {
    this.monitorAuthState();
  }
}
