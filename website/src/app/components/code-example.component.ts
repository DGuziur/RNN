import { Component, ElementRef, Input, OnDestroy, Output, ViewChild, inject } from '@angular/core';
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
    <div *ngIf="isTerminalOpen" class="output" (click)="focusInput()">
      {{ codeOutput }}
      <input #terminal type="text" autofocus='true' [(ngModel)]='inputValue' (keydown.enter)="sendInput(inputValue)">
    </div>
    <div *ngIf="canBeRun" class="run">
      <button *ngIf="!isTerminalOpen" class="run-btn" nz-button nzType="primary" (click)="runScript(value)">Run</button>
      <button *ngIf="isTerminalOpen" class="run-btn" nz-button nzType="primary" (click)="stopScript()">Zamknij</button>
    </div>
  </div> `,
  styleUrls: ['./code-example.component.scss'],
  imports: [ AceModule, FormsModule, NzButtonModule, NzToolTipModule ],
  standalone: true
})

export class CodeExample implements OnDestroy{
  pythonService = inject(PythonService)
  @ViewChild('terminal') terminal: ElementRef | undefined;
  @Input() title: string = '';
  @Input() config: AceConfigInterface = DEFAULT_ACE_CONFIG;
  @Input() canBeRun: boolean = false;
  @Input() @Output() value: string = '';
  subscribtion: Subscription | null = null;
  isTerminalOpen: boolean = false;
  codeOutput: string = '';
  inputValue: string = '';

  ngOnDestroy(): void {
    this.stopScript()
  }

  copyText(): void {
    navigator.clipboard.writeText(this.value)
  }

  runScript(value: string): void {
    this.subscribtion?.unsubscribe();
    this.isTerminalOpen = true
    this.pythonService.connect()
    this.pythonService.runCode(value)
    this.subscribtion = this.pythonService.getOutput().pipe().subscribe((data: any) => {
      this.codeOutput += data 
    })
  }

  stopScript(): void {
    this.isTerminalOpen = false;
    this.codeOutput = '';
    this.subscribtion?.unsubscribe();
    this.pythonService.disconnect();
  }

  sendInput(value: string): void {
    this.pythonService.sendInput(value)
    this.inputValue = ''
  }

  focusInput(): void {
    this.terminal?.nativeElement.focus();
  }
}
