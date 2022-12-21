import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../model/hotel-booked.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // total: number = this.totalRows();
  bookings: Book[];

  constructor() {}

  ngOnInit(): void {}

  // totalRows(): number {
  //   const test: any = console.log(this.bookings);
  //   return test;
  // }

  // get checkInRows(): number {
  //   return this.bookings.filter((i) => i.status === 'checked-in').length;
  // }

  // get checkOutRows(): number {
  //   return this.bookings.filter((i) => i.status === 'checked-out').length;
  // }

  // get reservedRows(): number {
  //   return this.bookings.filter((i) => i.status === 'reserved').length;
  // }
}
