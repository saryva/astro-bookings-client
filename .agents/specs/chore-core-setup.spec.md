# Core Setup Specification
- **Type**: chore
- **Status**: Draft

## Problem Description

The application has no API integration layer or reusable UI components for common states. Before any feature can be built, the project needs a centralized API configuration and shared components for loading, error, and empty states. Without these, each feature would duplicate boilerplate and handle states inconsistently.

### User Stories

- As a developer, I want a centralized API base URL configuration so that all services read from one source and I can switch environments without code changes.
- As a user, I want consistent visual feedback for loading, error, and empty states so that I always understand what the application is doing.

## Solution Overview

### User/App interface

Three shared standalone components:
- A loading indicator displayed while data is being fetched.
- An error message component that receives a message and displays it.
- An empty state component that informs the user when no results exist.

### Model and logic

- A centralized API configuration file that exports the base URL from environment settings.
- Each shared component accepts inputs via signal-based properties.

### Persistence

No persistence. The API base URL is read from Angular environment configuration.

## Acceptance Criteria

- [ ] THE Application SHALL have a centralized API configuration that exports the base URL.
- [ ] WHEN the environment changes THE Application SHALL use the corresponding API base URL without code changes.
- [ ] THE LoadingComponent SHALL display a visible loading indicator.
- [ ] WHEN an error message is provided THE ErrorMessageComponent SHALL display it to the user.
- [ ] WHEN no data is available THE EmptyStateComponent SHALL display an informative message.
- [ ] THE shared components SHALL be standalone with OnPush change detection.
