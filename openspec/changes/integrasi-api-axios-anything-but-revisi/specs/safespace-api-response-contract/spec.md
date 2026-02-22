## MODIFIED Requirements

### Requirement: Unified success response contract

The system SHALL expose a consistent success contract from the frontend API layer so pages consume endpoint outputs without direct dependency on raw `axios` response objects, and payload remains aligned with OpenAPI schema types.

#### Scenario: Normalize successful endpoint response

- **WHEN** an API request succeeds for session, chat, or report endpoints
- **THEN** API layer returns normalized payload data mapped to `SessionResponse`, `MessageResponse`, `ChatHistoryResponse`, or `ReportResponse`

### Requirement: Unified error response contract

The system SHALL normalize HTTP and network failures into a predictable error object containing at least `status`, `message`, and `details`, so UI can handle failures with one contract.

#### Scenario: Validation error is normalized

- **WHEN** backend returns HTTP 422 validation error
- **THEN** API layer returns error object with `status: 422`, user-facing `message`, and validation `details`

#### Scenario: Service error is normalized

- **WHEN** backend returns HTTP 404, 500, or 503
- **THEN** API layer returns error object with corresponding `status`, actionable `message`, and backend payload in `details`

#### Scenario: Network failure is normalized

- **WHEN** request fails due to timeout or unreachable host without HTTP response
- **THEN** API layer returns fallback network error object with `status`, `message`, and diagnostic `details`
