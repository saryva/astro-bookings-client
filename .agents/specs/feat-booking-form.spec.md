# Booking Form Specification
- **Type**: feat
- **Status**: Draft

## Problem Description

Customers need a way to book seats on a launch. The application needs to collect the traveler ID and number of seats, validate that the requested seats do not exceed availability, and submit the booking to the API with clear success or failure feedback.

### User Stories

- As a Customer, I want to book seats on a launch by entering my traveler ID and seat count so that I can reserve my spot.
- As a Customer, I want immediate feedback after booking so that I know if my reservation succeeded or failed.

## Solution Overview

### User/App interface

- A booking form accessible from the launch detail page.
- Form fields: traveler ID (text) and number of seats (numeric).
- The launch ID comes from the route context.
- A submit button disabled when the form is invalid.
- Success feedback with booking confirmation details.
- Error feedback if the API rejects the booking.

### Model and logic

- A bookings service submits the booking via `POST /api/bookings` with a CreateBookingDto.
- Client-side validation: traveler ID is required; number of seats >= 1 and <= available seats.
- Booking and CreateBookingDto domain models define the data structures.

### Persistence

No local persistence. The booking is created via the API.

## Acceptance Criteria

- [ ] THE BookingFormComponent SHALL display fields for traveler ID and number of seats.
- [ ] THE BookingFormComponent SHALL pre-fill the launch ID from the current route context.
- [ ] IF the traveler ID is empty THEN THE BookingFormComponent SHALL disable the submit button.
- [ ] IF the number of seats is less than 1 or greater than available seats THEN THE BookingFormComponent SHALL disable the submit button.
- [ ] WHEN the user submits a valid form THE BookingsService SHALL send a POST request to the API with the CreateBookingDto.
- [ ] WHEN the API returns a successful booking THEN THE BookingFormComponent SHALL display a confirmation message.
- [ ] IF the API returns an error THEN THE BookingFormComponent SHALL display the error message to the user.
- [ ] WHILE the booking request is in progress THE BookingFormComponent SHALL display the loading indicator and disable the submit button.
