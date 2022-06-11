import {Injectable} from '@angular/core';
import * as fns from 'date-fns-jalali';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor() {
  }

  convertToJalali(input, format) {
    if (input)
      return fns.format(new Date(input), format);
    return '';
  }
}
