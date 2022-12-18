import { Book } from "../../model/hotel-booked.model";

export interface HotelTables {
    bookings: Book[];
    onLoadBooking(): void;
    onReserve(booking: Book): void;
    onCheckIn(bookingId: number): void;
    onCheckOut(bookingId: number): void;
    onDeleteReservation(bookingId: number): void;
}