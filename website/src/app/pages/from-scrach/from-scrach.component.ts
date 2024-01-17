import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CodeExample } from 'src/app/components/code-example.component';
import { CODE_STEPS } from 'src/app/config/code-steps.heper';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-from-scrach',
  templateUrl: './from-scrach.component.html',
  styleUrls: ['./from-scrach.component.scss'],
  imports: [ CodeExample, NzButtonModule, NgIf ],
  standalone: true
})

export class FromScrachComponent {
  codeSteps = CODE_STEPS;
  step: number = 0;

  getGuideText(): string {
    return this.codeSteps[this.step].label
  }

  getGuideCode(): string {
    return this.codeSteps[this.step].value
  }

  getStepTitle(): string {
    return `Krok: ${this.step + 1}/${this.codeSteps.length}`
  }

  nextStep(): void {
    this.step++
  }

  previousStep(): void {
    this.step--
  }
}
