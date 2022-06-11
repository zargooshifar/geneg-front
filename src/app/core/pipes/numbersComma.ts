import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'NumbersComma' })
export class NumbersCommaPipe implements PipeTransform {

  transform(input: number): string {
    return new Intl.NumberFormat().format(input);
  }
}
