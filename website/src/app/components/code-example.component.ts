import { Component, Input, OnDestroy, Output, inject } from '@angular/core';
import { AceConfigInterface, AceModule } from 'ngx-ace-wrapper';
import { DEFAULT_ACE_CONFIG } from '../config/default-ace-config.config';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PythonService } from '../services/python.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


import 'brace';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/ext/language_tools'

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
    <div class="output">
      {{ codeOutput }}
      <input type="text" autofocus='true' [(ngModel)]='inputValue' (keydown.enter)="sendInput(inputValue)">
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

  .output {
    width: 100%;
    height: 200px;
    background-color: black;
    color: white;
    overflow-y: auto;
    padding: 10px;
  }

  input {
    border: none;
    outline: none;
    background-color: transparent;
    color: white;
    width: 100%;
    margin: 5px 0;
    animation: blink-caret 1s infinite;
  }

  `]
  ,
  imports: [ AceModule, FormsModule, NzButtonModule, NzToolTipModule ],
  standalone: true
})

export class CodeExample implements OnDestroy{
  pythonService = inject(PythonService)
  @Input() title: string = '';
  @Input() config: AceConfigInterface = DEFAULT_ACE_CONFIG;
  @Input() canBeRun: boolean = false;
  @Input() @Output() value: string = '';
  subscribtion: Subscription | null = null;
  codeOutput: string = '';
  inputValue: string = '';

  copyText(): void {
    navigator.clipboard.writeText(this.value)
  }

  runScript(value: string): void {
    this.subscribtion?.unsubscribe();
    this.pythonService.connect()
    this.pythonService.runCode(value)
    this.subscribtion = this.pythonService.getOutput().pipe().subscribe((data: any) => {
      this.codeOutput = data
    })
  }

  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
    this.pythonService.disconnect();
  }

  sendInput(value: string): void {
    this.pythonService.sendInput(value)
    this.inputValue = ''
  }
}
