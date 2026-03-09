/** A confirmed booking */
export interface Booking {
  id: string;
  launchId: string;
  travelerId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: string;
}

/** DTO for creating a new booking */
export interface CreateBookingDto {
  launchId: string;
  travelerId: string;
  numberOfSeats: number;
}
