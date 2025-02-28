import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';





export const AuthGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.isAuthenticated$().pipe(
    take(1),
    tap((isLoggedIn) =>
      !isLoggedIn ? router.navigate(['/register']): true
  )
);
}
