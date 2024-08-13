import { Component, DoCheck, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="equationContainer">
      <div class="equation">{{ equation || 0 }}</div>
      <div class="pastEquations" [ngStyle]="{ opacity: displayPast ? 1 : 0 }">
        <div *ngFor="let equation of displayHistory.slice(0, 3)">
          {{ equation }}
        </div>
      </div>
    </div>
    <div class="result">
      <div class="resultEqual">=</div>
      <div class="resultValue">{{ result }}</div>
    </div>
  `,
  styleUrl: './display.component.css',
})
export class DisplayComponent implements DoCheck {
  @Input() result: string = '';
  @Input() equation: string = '';
  @Input() displayPast: boolean = false;

  displayHistory: string[] = [];

  ngDoCheck(): void {
    const storedHistory = localStorage.getItem('lastFour');
    this.displayHistory = storedHistory ? JSON.parse(storedHistory) : [];
  }
}
