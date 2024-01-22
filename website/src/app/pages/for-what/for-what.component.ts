import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-for-what',
  templateUrl: './for-what.component.html',
  styleUrls: ['./for-what.component.scss'],
  imports: [NzButtonModule, RouterModule, IconsProviderModule, RouterLink],
  standalone: true,
})
export class ForWhatComponent {}
