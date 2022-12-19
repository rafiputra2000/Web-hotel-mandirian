import { BookingStatusPipe } from './booking-status.pipe';

describe('BookingStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new BookingStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
