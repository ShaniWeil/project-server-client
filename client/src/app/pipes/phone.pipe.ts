import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    let phone = value.toString().replace(/\D/g, ''); 

    if (phone.length === 10) {
      return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
    } else if (phone.length === 9) {
      return `${phone.slice(0, 2)}-${phone.slice(2, 5)}-${phone.slice(5)}`;
    }

    return value.toString(); 
  }

}
