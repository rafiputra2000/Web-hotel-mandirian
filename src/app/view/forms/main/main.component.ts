import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../../model/hotel-booked.model';
import { HotelService } from '../../service/hotel-service.service';
import { HotelForms } from '../model/hotel-forms.model';
import Swal from 'sweetalert2';
import { NIGHTLY_FEE } from 'src/app/shared/utils/night-fee.util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, HotelForms {
  booking?: Book;
  nightFee: number = NIGHTLY_FEE;

  constructor(
    private readonly hotelService: HotelService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    status: new FormControl('reserved'),
    roomNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    duration: new FormControl(null, [Validators.required, Validators.min(1)]),
    guestCount: new FormControl(null, [Validators.required, Validators.min(1)]),
    reservee: new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
    }),
  });

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        const { id } = params;
        if (id) {
          this.hotelService.get(+id).subscribe({
            next: (booking: Book) => {
              this.booking = booking;
              this.setFormValue(this.booking);
            },
          });
        }
      },
    });
  }

  onSubmitReservation(): void {
    const payload = this.bookingGroup.value;
    console.log(payload);
    const { reservee, roomNumber, duration } = payload;
    const totalPrice: number = duration * NIGHTLY_FEE;
    const viewedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
    Swal.fire({
      title: 'Are you sure?',
      text: 'Anda yakin data yang diisi sudah benar ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sure it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.save(payload).subscribe({
          next: () => {
            // this.bookingGroup.reset();
            Swal.fire(
              'Good job!',
              `Tamu ${
                reservee.name
              } telah melakukan pemesanan untuk kamar ${roomNumber} selama ${duration} malam dengan total tagihan sebesar ${viewedPrice.format(
                totalPrice
              )}.`,
              'success'
            );
          },
        });
        this.router.navigateByUrl('/home/tables-hotel-services');
      }
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  isFormValid(field: string): boolean {
    const control: AbstractControl = this.bookingGroup.get(
      field
    ) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

  onFormReset(): void {
    throw new Error('Method not implemented.');
  }

  setFormValue(book: Book): void {
    if (book) {
      const { id, reservee, guestCount, duration, roomNumber } = book;
      this.bookingGroup.get(['id'])?.setValue(id);
      this.bookingGroup.get(['reservee', 'name'])?.setValue(reservee.name);
      this.bookingGroup.get(['reservee', 'email'])?.setValue(reservee.email);
      this.bookingGroup.get(['reservee', 'phone'])?.setValue(reservee.phone);
      this.bookingGroup.get(['roomNumber'])?.setValue(roomNumber);
      this.bookingGroup.get(['duration'])?.setValue(duration);
      this.bookingGroup.get(['guestCount'])?.setValue(guestCount);
    }
  }
}
