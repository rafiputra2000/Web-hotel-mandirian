import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingStatus'
})
export class BookingStatusPipe implements PipeTransform {

  transform(value: string): string {
    let badge = '';
    if (value === 'reserved') badge = 'bg-secondary';
    else if (value === 'checked-in') badge = 'bg-success';
    else badge = 'bg-danger';
    return `<span class="badge text-${badge}">${value}</span>`;
  }

}
