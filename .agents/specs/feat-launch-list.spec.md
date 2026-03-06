# Launch List Specification
- **Type**: feat
- **Status**: Draft

## Problem Description

Users have no way to see which rocket launches are available. The application needs a page that fetches all launches from the API and displays them in a list with key details, so that users can browse and pick a launch of interest.

### User Stories

- As a Viewer, I want to see a list of available rocket launches so that I can find one that interests me.
- As a Customer, I want to see seat availability and price per seat for each launch so that I can decide which one to book.

## Solution Overview

### User/App interface

- A launch list page at route `/launches`.
- Each launch is displayed showing: destination, date, rocket name, price per seat, and available/total seats.
- The page handles loading, error, and empty states using the shared components.
- Clicking a launch navigates to its detail page.

### Model and logic

- A launches service fetches all launches from `GET /api/launches`.
- The service exposes data, loading, and error as signals.
- Launch and Rocket domain models define the data structure.

### Persistence

No local persistence. Data is fetched from the AstroBookings REST API on each navigation.

## Acceptance Criteria

- [ ] WHEN the user navigates to `/launches` THE LaunchListComponent SHALL fetch launches from the API.
- [ ] THE LaunchListComponent SHALL display each launch with destination, date, rocket name, price per seat, and available/total seats.
- [ ] WHILE the API request is in progress THE LaunchListComponent SHALL display the loading component.
- [ ] IF the API request fails THEN THE LaunchListComponent SHALL display the error message component.
- [ ] IF the API returns an empty list THEN THE LaunchListComponent SHALL display the empty state component.
- [ ] WHEN the user clicks on a launch THE Application SHALL navigate to `/launches/:id`.
