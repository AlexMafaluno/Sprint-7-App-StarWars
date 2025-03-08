import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider, signOut} from '@angular/fire/auth'; 
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);
  
  isAuthenticated$(): Observable<boolean> {
  return this.isLoggedIn.asObservable();  
  }

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn.next(!!user);
    });
  }

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
