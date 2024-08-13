import { Component } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { HistoryComponent } from './history/history.component';
import { DisplayComponent } from './display/display.component';
import { KeypadComponent } from './keypad/keypad.component';
import { ToggleComponent } from './toggle/toggle.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    HistoryComponent,
    DisplayComponent,
    KeypadComponent,
    ToggleComponent,
  ],
  template: `
    <div class="calculator">
      <app-toggle></app-toggle>
      <app-history (displayPast)="displayPastToggle($event)"></app-history>
      <app-display
        class=" displayContainer"
        [equation]="displayData"
        [result]="result"
        [displayPast]="displayPast"
      ></app-display>
      <app-keypad
        class="keypadContainer"
        (buttonClicked)="handleButtonClick($event)"
      ></app-keypad>
    </div>
  `,
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  displayPast: boolean = false;
  displayPastToggle(val: boolean) {
    this.displayPast = val;
  }

  displayData: string = '';
  result: string = '';
  currentExpression: string = '';

  constructor(private calculatorService: CalculatorService) {}

  handleButtonClick(button: string): void {
    if (button === '=') {
      this.result = this.calculatorService.calculate(
        button,
        this.currentExpression
      );
      this.displayData = this.currentExpression + ' =' + this.result;
      this.currentExpression = this.result;
    } else {
      this.currentExpression = this.calculatorService.calculate(
        button,
        this.currentExpression
      );
      this.displayData = this.currentExpression;
      this.result = '';
    }
  }
}
