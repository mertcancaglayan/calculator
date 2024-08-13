import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent],
  template: ` <div class="App">
    <app-calculator> </app-calculator>
  </div>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calculator';
}
