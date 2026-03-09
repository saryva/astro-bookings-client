import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'launches', pathMatch: 'full' },
  {
    path: 'launches',
    loadChildren: () => import('./features/launches/launches.routes').then((m) => m.launchesRoutes),
  },
  {
    path: 'bookings',
    loadChildren: () => import('./features/bookings/bookings.routes').then((m) => m.bookingsRoutes),
  },
];
