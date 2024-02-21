/* eslint-disable no-labels */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/keyword-spacing */
/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/comma-spacing */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkStatus().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
