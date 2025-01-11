import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'users',
    loadComponent: () =>
      import('./user/create-user/create-user.component').then((m) => m.CreateUserComponent),
  },
  {
    path: 'admins',
    loadComponent: () =>
      import('./user/create-user/create-user.component').then((m) => m.CreateUserComponent),
  },
  {
    path: 'localizations',
    loadComponent: () =>
      import('./translations/translations.component').then((m) => m.TranslationsComponent),
  },
  {
    path: 'log',
    loadComponent: () =>
      import('./translations/translations.component').then((m) => m.TranslationsComponent),
  }
];
