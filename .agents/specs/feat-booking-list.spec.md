# Booking List Specification
- **Type**: feat
- **Status**: Draft

## Problem Description

Customers need to review their existing bookings. The application needs to allow a customer to enter a traveler ID and see all associated bookings with details including launch reference, seat count, total price, and booking status.

### User Stories

- As a Customer, I want to view all my bookings by entering my traveler ID so that I can check the status of my reservations.
- As a Customer, I want to see details of each booking so that I know the launch, seat count, and total price.

## Solution Overview

### User/App interface

- A booking list page at route `/bookings/:travelerId`.
- Displays a list of bookings showing: launch reference, number of seats, total price, and booking status.
- Handles loading, error, and empty states using the shared components.

### Model and logic

- The bookings service fetches bookings filtered by traveler ID from `GET /api/bookings?travelerId=:id`.
- The component reads the traveler ID from the route parameter.
- Uses the Booking domain model.

### Persistence

No local persistence. Data is fetched from the API filtered by traveler ID.

## Acceptance Criteria

- [ ] WHEN the user navigates to `/bookings/:travelerId` THE BookingListComponent SHALL fetch bookings from the API filtered by traveler ID.
- [ ] THE BookingListComponent SHALL display each booking with launch reference, number of seats, total price, and status.
- [ ] WHILE the API request is in progress THE BookingListComponent SHALL display the loading component.
- [ ] IF the API request fails THEN THE BookingListComponent SHALL display the error message component.
- [ ] IF the API returns an empty list THEN THE BookingListComponent SHALL display the empty state component with a message indicating no bookings found.
