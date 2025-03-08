import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formReg: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.formReg = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async createAccount() {
    if (this.formReg.invalid) {
      console.error('Formulario invalido');
      return;
    }
    const { mail, password } = this.formReg.value;
    try {
      this.authService.register(mail, password);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }

  isInvalid(field: string): boolean {
    return (
      this.formReg.controls[field].invalid &&
      (this.formReg.controls[field].dirty ||
        this.formReg.controls[field].touched)
    );
  }
}
