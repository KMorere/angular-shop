import { Routes } from '@angular/router';
import { Trainings } from './components/trainings/trainings';
import { Cart } from './components/cart/cart';
import { NotFoundComponent } from './components/unknown/unknown';
import { AdminGuard } from './guard/admin-guard';
import { Admin } from './components/admin/admin';
import { Register } from './components/register/register';

export const routes: Routes = [
    { path: "trainings", component: Trainings },
    { path: "cart", component: Cart },
    { path: "register", component: Register},
    { path: "admin", component: Admin, canActivate: [AdminGuard] },
    { path: "", redirectTo: "trainings", pathMatch: "full" },
    { path: "404", component: NotFoundComponent },
    { path: "**", redirectTo: "/404" }
];
