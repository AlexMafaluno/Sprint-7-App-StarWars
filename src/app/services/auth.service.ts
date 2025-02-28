import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);

  isAuthenticated$(): Observable<boolean> {
  return this.isLoggedIn;  
  }
}
