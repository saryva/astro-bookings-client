/** Rocket attached to a launch */
export interface Rocket {
  id: string;
  name: string;
  capacity: number;
  range: string;
}

/** A scheduled rocket launch */
export interface Launch {
  id: string;
  agencyId: string;
  rocketId: string;
  date: string;
  mission: string;
  destination: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
  status: string;
  rocket: Rocket;
}
