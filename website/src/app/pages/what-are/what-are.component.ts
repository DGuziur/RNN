import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-what-are',
  templateUrl: './what-are.component.html',
  styleUrls: ['./what-are.component.scss'],
  imports: [ NzButtonModule, IconsProviderModule, RouterLink ],
  standalone: true
})
export class WhatAreComponent {
  
}
