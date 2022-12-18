import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/hotel-booked.model';
import { HotelService } from '../../service/hotel-service.service';
import { HotelTables } from '../model/hotel-tables.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, HotelTables {
  bookings: Book[] = [];

  constructor(private readonly hotelService: HotelService) {}

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
            footer: '<a href="">Why do I have this issue?</a>'
          })
        } else {
          this.hotelService.checkIn(bookingId).subscribe();
          Swal.fire(
            'Good job!',
            `Tamu ${booking.reservee.name} sudah check-in pada kamar ${booking.roomNumber}`,
            'success'
          )
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
            footer: '<a href="">Why do I have this issue?</a>'
          })
        } else {
          this.hotelService.checkOut(bookingId).subscribe();
          Swal.fire(
            'Good job!',
            `Tamu ${booking.reservee.name} sudah melakukan check-out`,
            'success'
          )
        }
      },
    });
  }

  onDeleteReservation(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if(booking.status === 'reserved' || booking.status === 'checked-in') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Data pemesanan tidak dapat di hapus karena tamu ${booking.reservee.name} belum checkout.`
          })
        } else {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Data tabel telah dihapus.',
                'success'
              )
              this.hotelService.remove(bookingId).subscribe();
            }
          })
        }
      }
    })
  }

  get totalRows(): number {
    return this.bookings.length;
  }

  get checkInRows(): number {
    return this.bookings.filter((i) => i.status === 'checked-in').length;
  }

  get checkOutRows(): number {
    return this.bookings.filter((i) => i.status === 'checked-out').length;
  }

  get reservedRows(): number {
    return this.bookings.filter((i) => i.status === 'reserved').length;
  }
}
