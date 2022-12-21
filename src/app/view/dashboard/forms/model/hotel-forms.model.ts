import { FormGroup } from '@angular/forms';
import { Book } from '../../../model/hotel-booked.model';

export interface HotelForms {
  booking?: Book;
  bookingGroup: FormGroup;
  onSubmitReservation(): void;
  onFormReset(): void;
}
