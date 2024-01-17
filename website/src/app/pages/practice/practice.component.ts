import { Component } from '@angular/core';
import { CodeExample } from 'src/app/components/code-example.component';
import { RNN_FULL_CODE } from 'src/app/config/rnn-code.helper';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
  imports: [ CodeExample, NzButtonModule, RouterModule ],
  standalone: true
})

export class PracticeComponent {
  fullCode: string = RNN_FULL_CODE
}
