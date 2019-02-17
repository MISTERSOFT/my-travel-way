import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
  transform(value: string, charsCount = 25): any {
    return value.substring(0, charsCount);
  }
}
