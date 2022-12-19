import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookingStatusPipe } from './pipes/booking-status.pipe';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, BookingStatusPipe, ValidationMessageComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, NotFoundComponent, BookingStatusPipe, ValidationMessageComponent],
})
export class SharedModule {}
