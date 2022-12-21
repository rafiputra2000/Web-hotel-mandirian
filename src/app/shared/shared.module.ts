import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookingStatusPipe } from './pipes/booking-status.pipe';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { AuthService } from '../auth/service/auth.service';

@NgModule({
  declarations: [
    NotFoundComponent,
    BookingStatusPipe,
    ValidationMessageComponent,
  ],
  imports: [CommonModule],
  exports: [NotFoundComponent, BookingStatusPipe, ValidationMessageComponent],
  providers: [AuthService],
})
export class SharedModule {}
