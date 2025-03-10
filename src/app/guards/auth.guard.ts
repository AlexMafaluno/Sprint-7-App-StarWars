import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take, tap } from 'rxjs';

export const AuthGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated$().pipe(
    take(1),
    map((isLoggedIn) => {
      console.log('AuthGuard - isLoggedIn:', isLoggedIn);
      if (!isLoggedIn) {
        router.navigate(['/register']);
        return false;
      }
      return true;
    })
  );
};
