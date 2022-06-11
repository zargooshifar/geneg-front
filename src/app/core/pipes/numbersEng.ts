import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'NumbersEng'})
export class NumbersEngPipe implements PipeTransform {

  transform(input: string): string {
    return this.toEnglishDigits(input);
  }

   toEnglishDigits(str) {

    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    let e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function(t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}
}
