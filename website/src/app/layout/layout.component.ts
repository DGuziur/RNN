import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { IconsProviderModule } from '../icons-provider.module';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [CommonModule, IconsProviderModule, NzLayoutModule, NzMenuModule, RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true
})

export class LayoutComponent {
  isCollapsed = false;
}
