import { Component, Input } from '@angular/core';
import { AceConfigInterface, AceModule } from 'ngx-ace-wrapper';
import { DEFAULT_ACE_CONFIG } from '../config/default-ace-config.config';

import 'brace';
import 'brace/mode/python';
import 'brace/theme/monokai';


@Component({
  selector: 'code',
  template: ` 
  <div class="ace">
    <div class="title">
      {{ title }}
    </div>
    <ace [config]="config"></ace>
  </div> `,
  styles: [`
  .title {
    background: grey;
    color: white;
    padding: 3px;
  }

  `]
  ,
  imports: [ AceModule ],
  standalone: true
})

export class CodeExample {
  @Input() title: string = 'title'
  @Input() config: AceConfigInterface = DEFAULT_ACE_CONFIG
}