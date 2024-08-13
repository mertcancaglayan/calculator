import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keypad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="keypadContainer">
      <div class="keypad">
        <div class="keypad-horizontal">
          <div
            *ngFor="let row of horizontalButtons; let rowIndex = index"
            class="keypad-row"
          >
            <button
              *ngFor="let button of row; let colIndex = index"
              class="keypad-btn"
              [value]="button"
              (click)="onButtonClick(button)"
            >
              {{ button }}
            </button>
          </div>
          <div class="keypad-numbers">
            <div
              *ngFor="let row of numberButtons; let rowIndex = index"
              class="keypad-row"
            >
              <button
                *ngFor="let button of row; let colIndex = index"
                class="keypad-btn"
                [value]="button"
                (click)="onButtonClick(button)"
              >
                {{ button }}
              </button>
            </div>
          </div>
        </div>

        <div class="keypad-vertical">
          <div
            *ngFor="let button of verticalButtons; let index = index"
            class="keypad-row"
          >
            <button
              class="keypad-btn"
              [value]="button"
              (click)="onButtonClick(button)"
            >
              {{ button }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./keypad.component.css'],
})
export class KeypadComponent {
  @Input() currentThemeColors: any;
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  horizontalButtons = [['AC', '+/-', '%']];
  numberButtons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '00'],
    ['(', ')', 'delete'],
  ];
  verticalButtons = ['/', '*', '-', '+', '='];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const key = event.key;
    const validKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '+',
      '-',
      '*',
      '/',
      'Enter',
      '=',
      '.',
      '%',
      '(',
      ')',
      'Backspace',
    ];

    if (validKeys.includes(key)) {
      if (key === 'Enter') {
        this.onButtonClick('=');
      } else if (key === 'Backspace') {
        this.onButtonClick('delete');
      } else {
        this.onButtonClick(key);
      }
    }
  }

  onButtonClick(button: string): void {
    this.buttonClicked.emit(button);
  }
}
