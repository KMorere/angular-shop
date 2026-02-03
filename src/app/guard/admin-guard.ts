import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../service/auth';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);

    if (!auth.isAdmin()) {
        router.navigateByUrl("/trainings");
        return false;
    } else {
        return true;
    }
};
