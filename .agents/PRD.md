# AstroBookings Client Product Requirements Document

Angular SPA that consumes the AstroBookings REST API to let users browse rocket launches and book seats.

## Vision and Scope

AstroBookings Client is a web application that provides a user-friendly interface for browsing scheduled rocket launches and booking seats. It connects to the existing AstroBookings REST API backend, presenting launch information and managing the booking workflow entirely through API consumption.

**Target users:**
- **Customer**: Browses available launches, books seats, and reviews their bookings.
- **Viewer**: Browses available launches to see details without booking.

**Scope:** The application covers launch browsing, seat booking with availability validation, and booking history viewing. It is a single-page application built with Angular, intended for demonstration and training purposes.

**Out of scope:**
- Authentication and authorization (no login/signup)
- Payment processing
- Admin panel or back-office features
- Production infrastructure, deployment, or scaling
- Real-time notifications or WebSocket communication

## Functional Requirements

### FR1: View available launches
- The app displays a list of available rocket launches retrieved from the API. Each launch shows its destination, date, rocket name, seat price, and available/total seats. Users can see at a glance which launches have seats remaining.
- **Status**: NotStarted

### FR2: View launch details
- Selecting a launch navigates to a detail view showing full launch information: rocket specifications, pricing, seat availability, and launch status. This view serves as the entry point for booking.
- **Status**: NotStarted

### FR3: Book seats on a launch
- A customer can book one or more seats on a launch by providing their traveler ID and desired number of seats. The app validates that the requested seats do not exceed availability before submitting the booking to the API. Clear feedback is shown on success or failure.
- **Status**: NotStarted

### FR4: View customer bookings
- A customer can view all their bookings by entering their traveler ID. The list shows booking details including the associated launch, number of seats, total price, and booking status.
- **Status**: NotStarted

## Technical Requirements

### TR1: Consume AstroBookings REST API
- All data is fetched from and sent to the AstroBookings REST API. The app does not maintain its own persistence. API base URL must be configurable via environment settings.
- **Status**: NotStarted

### TR2: Handle loading, error, and empty states
- Every data-fetching operation must present appropriate UI feedback: a loading indicator while waiting, an error message on failure, and an empty-state message when no results are returned. This ensures the user always understands the current state of the application.
- **Status**: NotStarted
