import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pros-cons',
  templateUrl: './pros-cons.component.html',
  styleUrls: ['./pros-cons.component.scss'],
  imports: [NzButtonModule, RouterModule, IconsProviderModule, RouterLink],
  standalone: true,
})
export class ProsConsComponent {}
