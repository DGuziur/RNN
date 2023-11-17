import { Component, Input, ViewChild, ElementRef, inject, OnInit } from '@angular/core';

@Component({
  selector: 'code-example',
  template: `
    <div class="code-example-container">
      <div class="code-header">
        <h3>{{ title }}</h3>
      <pre><code>{{ 'lol' }}</code></pre>
    </div>
  `,
  styles: [`
    
  `],
  standalone: true
})
export class CodeExampleComponent {
  @Input() title: string = 'Code Example';
  @Input() code: string = '';

}
