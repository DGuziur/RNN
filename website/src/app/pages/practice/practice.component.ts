import { Component } from '@angular/core';
import { CodeExample } from 'src/app/components/code-example.component';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
  imports: [ CodeExample ],
  standalone: true
})
export class PracticeComponent {

}
