import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NIGHTLY_FEE } from 'src/app/shared/utils/night-fee.util';
import Swal from 'sweetalert2';
import { Book } from '../../model/hotel-booked.model';
import { HotelService } from '../../service/hotel-service.service';
import { HotelTables } from './model/hotel-tables.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit, HotelTables {
  // total: number = this.totalRows;
  bookings: Book[] = [];
  urlLinked: string = '/home/forms-hotel-services';
  nightFee: number = NIGHTLY_FEE;
  viewedPrice: any = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  constructor(
    private readonly hotelService: HotelService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.onLoadBooking();
    console.log(this.bookings);
  }

  onLoadBooking(): void {
    this.hotelService.list().subscribe({
      next: (booking: Book[]) => {
        this.bookings = booking;
        console.log(this.bookings);
      },
    });
  }

  onReserve(booking: Book): void {
    if (booking.status === 'reserved') {
      this.router.navigateByUrl(`${this.urlLinked}/${booking.id}`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Tamu ${booking.reservee.name} sudah melakukan ${booking.status} tidak bisa ubah durasi malam`,
      });
    }
  }

  // No GETbyID method
  // onCheckIn(bookingId: number): void {
  //   this.bookings.map( t => {
  //     if(t.id === bookingId){
  //       if(t.status === 'checked-out'){
  //         alert(`Tamu ${t.reservee.name} sudah melakukan ${t.status} tidak bisa melakukan checked-in`)
  //       } else {
  //         this.hotelService.checkIn(bookingId).subscribe()
  //         alert(`Tamu ${t.reservee.name} sudah check-in pada kamar ${t.roomNumber}`)
  //       }
  //     }
  //   })
  // }

  onCheckIn(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status === 'checked-out') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Tamu ${booking.reservee.name} sudah melakukan ${booking.status} tidak bisa melakukan checked-in !`,
          });
        } else {
          this.hotelService.checkIn(bookingId).subscribe();
          Swal.fire(
            'Good job!',
            `Tamu ${booking.reservee.name} sudah check-in pada kamar ${booking.roomNumber}`,
            'success'
          );
        }
      },
    });
  }

  // No GETbyID method
  // onCheckOut(bookingId: number): void {
  //   this.bookings.map( t => {
  //     if(t.id === bookingId) {
  //       if(t.status === 'reserved'){
  //         alert(`Tamu tidak bisa melakukan check-out sebelum melakukan check-In`)
  //       } else {
  //         this.hotelService.checkOut(bookingId).subscribe()
  //         alert(`Tamu ${t.reservee.name} sudah melakukan ${t.status}`)
  //       }
  //     }
  //   })
  // }

  onCheckOut(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status === 'reserved') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Tamu tidak bisa melakukan check-out sebelum melakukan check-in`,
            footer: '<a href="">Why do I have this issue?</a>',
          });
        } else {
          this.hotelService.checkOut(bookingId).subscribe();
          Swal.fire(
            'Good job!',
            `Tamu ${booking.reservee.name} sudah melakukan check-out`,
            'success'
          );
        }
      },
    });
  }

  onDeleteReservation(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status === 'reserved' || booking.status === 'checked-in') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Data pemesanan tidak dapat di hapus karena tamu ${booking.reservee.name} belum checkout.`,
          });
        } else {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('Deleted!', 'Data tabel telah dihapus.', 'success');
              this.hotelService.remove(bookingId).subscribe();
            }
          });
        }
      },
    });
  }

  totalRows(): number {
    return this.bookings.length;
  }

  checkInRows(): number {
    return this.bookings.filter((i) => i.status === 'checked-in').length;
  }

  checkOutRows(): number {
    return this.bookings.filter((i) => i.status === 'checked-out').length;
  }

  reservedRows(): number {
    return this.bookings.filter((i) => i.status === 'reserved').length;
  }
}
