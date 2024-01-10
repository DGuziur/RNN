import { Component, Input, Output } from '@angular/core';
import { AceConfigInterface, AceModule } from 'ngx-ace-wrapper';
import { DEFAULT_ACE_CONFIG } from '../config/default-ace-config.config';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';

import 'brace';
import 'brace/mode/python';
import 'brace/theme/monokai';


@Component({
  selector: 'code',
  template: ` 
  <div class="ace">
    <div class="title">
      {{ title }}
      <span nz-tooltip="Copied!" nzTooltipTrigger="click" (click)="copyText()">Copy</span>
    </div>
    <ace [config]="config" [(value)]='value'></ace>
    <div *ngIf="canBeRun" class="run">
      <button class="run-btn" nz-button nzType="primary" (click)="runScript(value)">Run</button>
    </div>
  </div> `,
  styles: [`
  .title {
    background: grey;
    color: white;
    padding: 3px;
    height: 28px;
  }

  span { 
    float: right;
    margin-right: 5px;
    &:hover {
      color: lightgrey;
      transition: 0.5s;
      cursor: pointer;
    }
  }

  .run {
    background: lightgrey;
  }

  .run-btn {
    width: 100%;
  }

  `]
  ,
  imports: [ AceModule, NzButtonModule, NzToolTipModule ],
  standalone: true
})

export class CodeExample {
  @Input() title: string = '';
  @Input() config: AceConfigInterface = DEFAULT_ACE_CONFIG;
  @Input() canBeRun: boolean = false;
  @Input() @Output() value: string = '';
  xx: string = 'a'

  copyText(): void {
    navigator.clipboard.writeText(this.value)
  }

  runScript(value: string): void {
    alert(value)
  }
}