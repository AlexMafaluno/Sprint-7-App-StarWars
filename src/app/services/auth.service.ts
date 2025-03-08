import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider, signOut, User } from '@angular/fire/auth'; // Adjust the import path as necessary
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  
  isAuthenticated$(): Observable<boolean> {
  return this.isLoggedIn.asObservable();  
  }

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      console.log('AuthService - Usuario detectado:', user); // 👀 Ver si detecta el usuario
      this.isLoggedIn.next(!!user);
    });
  }

  /*get user$() {
    return this.userSubject.asObservable();
  }
  */
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return signOut(this.auth);
  }


async loginWithGoogle() {
  return signInWithPopup(this.auth, new GoogleAuthProvider());
}
}


/* ¿Qué hace este servicio?
✅ Maneja el estado del usuario con BehaviorSubject
✅ Permite iniciar sesión (login)
✅ Permite registrarse (register)
✅ Permite cerrar sesión (logout)
✅ Expone un observable (user$) para saber si el usuario está autenticado
*/
