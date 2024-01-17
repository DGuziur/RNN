import { Component } from '@angular/core';
import { CodeExample } from 'src/app/components/code-example.component';
import { RNN_FULL_CODE } from 'src/app/config/rnn-code.helper';


@Component({
  selector: 'app-full-code',
  templateUrl: './full-code.component.html',
  styleUrls: ['./full-code.component.scss'],
  imports: [ CodeExample ],
  standalone: true
})

export class FullCodeComponent {
  fullCode: string = RNN_FULL_CODE
}
