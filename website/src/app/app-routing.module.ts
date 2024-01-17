import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WhatAreComponent } from './pages/what-are/what-are.component';
import { PracticeComponent } from './pages/practice/practice.component';
import { FullCodeComponent } from './pages/full-code/full-code.component';
import { FromScrachComponent } from './pages/from-scrach/from-scrach.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'what-are-RNN', component: WhatAreComponent },
  { path: 'practice', component: PracticeComponent },
  { path: 'full-code', component: FullCodeComponent },
  { path: 'from-scrach', component: FromScrachComponent },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
