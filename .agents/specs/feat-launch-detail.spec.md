# Launch Detail Specification
- **Type**: feat
- **Status**: Draft

## Problem Description

After seeing the launch list, users need a detail page showing complete information about a specific launch. This page displays rocket specifications, pricing, seat availability, and launch status, and serves as the entry point for booking.

### User Stories

- As a Viewer, I want to see full details of a launch so that I can learn about the rocket and destination.
- As a Customer, I want to see seat availability on the detail page so that I know if I can book.
- As a Customer, I want a way to start booking from the detail page so that the process is seamless.

## Solution Overview

### User/App interface

- A launch detail page at route `/launches/:id`.
- Displays: mission name, destination, date, status, rocket name, rocket capacity, rocket range, price per seat, and available/total seats.
- Provides a way to initiate a booking for the displayed launch.
- Provides a back link to return to the launch list.
- Handles loading and error states using the shared components.

### Model and logic

- The launches service fetches a single launch by ID from `GET /api/launches/:id`.
- The component reads the route parameter to determine which launch to load.
- Uses the same Launch and Rocket domain models.

### Persistence

No local persistence. Data is fetched from the API by launch ID.

## Acceptance Criteria

- [ ] WHEN the user navigates to `/launches/:id` THE LaunchDetailComponent SHALL fetch the launch from the API.
- [ ] THE LaunchDetailComponent SHALL display mission, destination, date, status, rocket name, rocket capacity, rocket range, price per seat, and available/total seats.
- [ ] WHILE the API request is in progress THE LaunchDetailComponent SHALL display the loading component.
- [ ] IF the API request fails THEN THE LaunchDetailComponent SHALL display the error message component.
- [ ] THE LaunchDetailComponent SHALL provide a way to navigate back to the launch list.
- [ ] THE LaunchDetailComponent SHALL provide a way to initiate a booking for the displayed launch.
