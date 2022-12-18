import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Book } from '../model/hotel-booked.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  bookings: Book[] = [];
  storage: Storage = sessionStorage;

  constructor() { }

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>) => {   
      try{
        const sessionStorage: string = this.storage.getItem('booking') as string
        if(!sessionStorage){
          const listBooked: Book[] = [
            {
              id: 1,
              status: 'reserved',
              roomNumber: '12',
              duration: 1,
              guestCount: 2,
              reservee: {
                id: 1,
                name: 'Rafi Pramasukma Ekhaputera',
                email: 'rafi.putra2000@gmail.com',
                phone: '081230435012'
              }
            },
            {
              id: 2,
              status: 'checked-out',
              roomNumber: '12',
              duration: 1,
              guestCount: 2,
              reservee: {
                id: 2,
                name: 'Rafi Putra',
                email: 'rafisukma49@gmail.com',
                phone: '081230435012'
              }
            },
            {
              id: 3,
              status: 'checked-in',
              roomNumber: '12',
              duration: 1,
              guestCount: 2,
              reservee: {
                id: 2,
                name: 'Rafi Sukma',
                email: 'rafisukma49@gmail.com',
                phone: '081230435012'
              }
            },
          ]
          this.bookings = listBooked;
          console.log(this.bookings);
        } else {
          this.bookings = JSON.parse(sessionStorage)
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next(this.bookings)
      }
      catch(err: any){
        observer.error(err.message)
      }
    })
  }

  // Untuk mencari GET by ID agar fungsi Check In, Check Out dan Remove dapat terlaksana dengan semestinya 
  get(bookingId: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try{
        const sessionStorage: string = this.storage.getItem('booking') as string
        if(sessionStorage){
          const bookings: Book[] = JSON.parse(sessionStorage)
          const book: Book = bookings.find(t => {
            t.id === bookingId
            return t
          }) as Book
          observer.next(book)
        }
      }
      catch(err: any){
        observer.error(err.message)
      }
    })
  }

  save(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try{
        booking.id = this.bookings.length + 1;
        this.bookings.push(booking);
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next();
      } catch(err: any) {
        observer.error(err.message)
      }
    })
  }

  checkIn(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.bookings.map( t => {
          if(t.id === bookingId){
            t.status = 'checked-in'
          }
          this.storage.setItem('booking', JSON.stringify(this.bookings))
          observer.next()
        })
      } catch(err: any){
        observer.error(err.message)
      }
    })
  }

  checkOut(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.bookings.map( t => {
          if(t.id === bookingId) {
              t.status = 'checked-out'
          }
          this.storage.setItem('booking', JSON.stringify(this.bookings))
          observer.next()
        })
      } catch(err: any){
        observer.error(err.message)
      }
    })
  }

  // Menggunakan fungsi for untuk menghapus array of object (JSON), for ini mengabaikan id berapapun untuk menghapusnya
  remove(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try{
        for(let index = 0; index < this.bookings.length; index++){
          if(this.bookings[index].id === bookingId){
            this.bookings.splice(index, 1)
          }
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next()
      } catch(err:any){
        observer.error(err.message)
      }
    })
  }

}

