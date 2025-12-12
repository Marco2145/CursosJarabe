import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const isNotAuthenticatedGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isValid = await userService.validateToken();

  if (isValid) return router.parseUrl('/main/tabs/tab1');

  return true;
};
