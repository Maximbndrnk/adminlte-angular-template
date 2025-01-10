import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'user',
    loadComponent: () =>
      import('./user/create-user/create-user.component').then((m) => m.CreateUserComponent),
  }
];
