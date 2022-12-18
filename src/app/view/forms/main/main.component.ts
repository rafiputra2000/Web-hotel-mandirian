import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../../model/hotel-booked.model';
import { HotelService } from '../../service/hotel-service.service';
import { HotelForms } from '../model/hotel-forms.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, HotelForms {
  booking?: Book;

  constructor(
    private readonly hotelService: HotelService,
    private readonly router: Router
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
      phone: new FormControl('', [Validators.required, Validators.min(12)]),
    }),
  });

  ngOnInit(): void {}

  onSubmitReservation(): void {
    const payload: any = this.bookingGroup.value;
    console.log(payload);
    const { reservee } = payload;
    Swal.fire({
      title: 'Are you sure?',
      text: "Anda yakin data yang diisi sudah benar ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sure it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelService.save(payload).subscribe({
          next: () => {
            this.bookingGroup.reset();
          },
        });
        Swal.fire(
          'Good job!',
          `Tamu ${reservee.name} telah memasan kamar`,
          'success'
        )
        this.router.navigateByUrl('/home/tables-hotel-services');
      }
    })
    
    
  }

  onFormReset(): void {
    throw new Error('Method not implemented.');
  }
}
