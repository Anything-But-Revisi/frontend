## ADDED Requirements

### Requirement: Unified success response contract

The system SHALL expose a consistent success contract from the frontend API layer so pages consume endpoint outputs without direct dependency on raw `axios` response objects.

#### Scenario: Normalize successful endpoint response

- **WHEN** an API request succeeds for session or chat endpoints
- **THEN** the API layer returns normalized payload data mapped to the documented schemas (`SessionResponse`, `MessageResponse`, `ChatHistoryResponse`) without exposing transport metadata as required page input

### Requirement: Unified error response contract

The system SHALL normalize HTTP and network failures into a predictable error object containing at least `status`, `message`, and `details` fields.

#### Scenario: Backend validation error is normalized

- **WHEN** backend returns HTTP 422 validation error
- **THEN** the API layer returns an error object with `status: 422`, a user-facing `message`, and `details` containing validation information

#### Scenario: Service unavailable error is normalized

- **WHEN** backend returns HTTP 503 for session operations
- **THEN** the API layer returns an error object with `status: 503` and an actionable `message` indicating temporary unavailability

#### Scenario: Network failure is normalized

- **WHEN** request fails due to timeout or unreachable network without HTTP response
- **THEN** the API layer returns an error object with fallback `status`, a network-focused `message`, and diagnostic `details` for logging
