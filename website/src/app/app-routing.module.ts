import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WhatAreComponent } from './pages/what-are/what-are.component';
import { PracticeComponent } from './pages/practice/practice.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'what-are-RNN', component: WhatAreComponent },
  { path: 'practice', component: PracticeComponent },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
