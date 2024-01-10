import { Component } from '@angular/core';
import { CodeExample } from 'src/app/components/code-example.component';
import { RNN_FULL_CODE } from 'src/app/config/rnn-code.helper';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
  imports: [ CodeExample ],
  standalone: true
})

export class PracticeComponent {
  fullCode: string = RNN_FULL_CODE

}
