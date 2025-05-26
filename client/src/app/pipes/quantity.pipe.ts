import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  transform(qty : number) : string {
  if (qty === 0) return '⚠️ אזל מהמלאי ⚠️';
  if (qty < 5) return qty + ' כמות נמוכה! ';
    return qty + "";
  }

}
