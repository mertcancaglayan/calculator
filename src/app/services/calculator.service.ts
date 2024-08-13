import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private operators: string[] = ['/', '*', '-', '+'];

  replaceOperators(expression: string): string {
    return expression.replace(/÷/g, '/').replace(/×/g, '*');
  }

  sanitizeExpression(expression: string): string {
    return expression.replace(/\b0+(\d)/g, '$1');
  }

  toggleSign(currentExpression: string): string {
    if (currentExpression === '') return '';

    const parts: string[] = currentExpression.split(/([+\-*/÷×])/);
    let lastPart: string | undefined = parts.pop();

    if (lastPart && !isNaN(Number(lastPart))) {
      const previousPart: string | undefined = parts.pop();
      if (previousPart && this.operators.includes(previousPart)) {
        parts.push(
          previousPart === '+' ? '-' : previousPart === '-' ? '+' : previousPart
        );
        if (lastPart) parts.push(lastPart);
      } else {
        if (previousPart) parts.push(previousPart);
        if (lastPart) parts.push(lastPart);
      }
    } else if (lastPart && this.operators.includes(lastPart)) {
      lastPart = lastPart === '+' ? '-' : lastPart === '-' ? '+' : lastPart;
      parts.push(lastPart);
    }

    return parts.join('');
  }

  handlePercentage(currentExpression: string): string {
    if (
      currentExpression === '' ||
      this.operators.includes(currentExpression.slice(-1))
    ) {
      return currentExpression;
    }
    const parts: string[] = currentExpression.split(/([+\-*/÷×])/);
    const lastPart: string | undefined = parts.pop();
    const percentageValue: string = (
      parseFloat(lastPart ?? '0') / 100
    ).toString();
    return parts.join('') + percentageValue;
  }

  handleDecimal(currentExpression: string): string {
    const parts: string[] = currentExpression.split(/([+\-*/÷×])/);
    const lastPart: string | undefined = parts.pop();

    if (lastPart && lastPart.includes('.')) return currentExpression;
    if (currentExpression === '' || /[+\-*/÷×]$/.test(currentExpression)) {
      return currentExpression;
    }

    return currentExpression + '.';
  }

  handleDelete(currentExpression: string): string {
    return currentExpression.slice(0, -1);
  }

  calculate(input: string, currentExpression: string): string {
    if (currentExpression === 'Error') return '';
    if (input === 'AC') {
      return '';
    }

    if (input === '=') {
      let expression: string = this.sanitizeExpression(currentExpression);
      const lastChar: string = expression.slice(-1);
      if (this.operators.includes(lastChar)) {
        expression = expression.slice(0, -1);
      }
      try {
        const result: string = eval(
          this.replaceOperators(expression)
        ).toString();
        const equation: string = `${expression} = ${result}`;

        let lastFour: string[] = JSON.parse(
          localStorage.getItem('lastFour') || '[]'
        );
        lastFour.push(equation);
        if (lastFour.length > 4) lastFour.shift();
        localStorage.setItem('lastFour', JSON.stringify(lastFour));

        return result;
      } catch (error) {
        return 'Error';
      }
    }

    if (input === '+/-') {
      return this.toggleSign(currentExpression);
    }

    if (input === '%') {
      return this.handlePercentage(currentExpression);
    }

    if (input === '.') {
      return this.handleDecimal(currentExpression);
    }

    if (input === 'delete') {
      return this.handleDelete(currentExpression);
    }

    const lastChar: string = currentExpression.slice(-1);

    if (this.operators.includes(input) && this.operators.includes(lastChar)) {
      return currentExpression.slice(0, -1) + input;
    }

    if (this.operators.includes(input) && currentExpression === '')
      return currentExpression;

    return currentExpression + input;
  }
}
