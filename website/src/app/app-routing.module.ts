import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome/welcome.component').then(
        (x) => x.WelcomeComponent
      ),
  },
  {
    path: 'what-are-RNN',
    loadComponent: () =>
      import('./pages/what-are/what-are.component').then(
        (x) => x.WhatAreComponent
      ),
  },
  {
    path: 'pros-cons',
    loadComponent: () =>
      import('./pages/pros-cons/pros-cons.component').then(
        (x) => x.ProsConsComponent
      ),
  },
  {
    path: 'practice',
    loadComponent: () =>
      import('./pages/practice/practice.component').then(
        (x) => x.PracticeComponent
      ),
  },
  {
    path: 'full-code',
    loadComponent: () =>
      import('./pages/full-code/full-code.component').then(
        (x) => x.FullCodeComponent
      ),
  },
  {
    path: 'from-scrach',
    loadComponent: () =>
      import('./pages/from-scrach/from-scrach.component').then(
        (x) => x.FromScrachComponent
      ),
  },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
