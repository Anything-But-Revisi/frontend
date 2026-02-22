## MODIFIED Requirements

### Requirement: Frontend API client for session lifecycle

The system SHALL provide a frontend API client using `axios` with centralized configuration to create and delete anonymous sessions via `/api/v1/sessions` and `/api/v1/sessions/{session_id}`, returning page-consumable payloads aligned with OpenAPI schemas for integration environment.

#### Scenario: Create anonymous session

- **WHEN** the page requests a new session without a `session_id`
- **THEN** the API client sends `POST /api/v1/sessions` and returns `session_id` and `created_at` from backend response

#### Scenario: Delete existing session

- **WHEN** the page requests deletion for a valid `session_id`
- **THEN** the API client sends `DELETE /api/v1/sessions/{session_id}` and reports success for HTTP 204

### Requirement: Frontend API client for chat operations

The system SHALL provide API methods to send messages and read chat history for an existing session using `/api/v1/sessions/{session_id}/chat`, including frontend boundary validation for message payload constraints.

#### Scenario: Send message to chat endpoint

- **WHEN** the page submits a non-empty message with length 1-4096 for a valid `session_id`
- **THEN** the API client sends `POST /api/v1/sessions/{session_id}/chat` with JSON body `{ "message": "..." }` and returns a `MessageResponse`

#### Scenario: Retrieve chat history

- **WHEN** the page requests history for a valid `session_id`
- **THEN** the API client sends `GET /api/v1/sessions/{session_id}/chat` and returns `ChatHistoryResponse` with `session_id` and `messages`

## ADDED Requirements

### Requirement: Frontend API client for report operations

The system SHALL provide API methods to create and retrieve complaint reports for an existing session using `/api/v1/sessions/{session_id}/report`, with request and response mapping aligned to `ReportCreate` and `ReportResponse` schemas.

#### Scenario: Create report for active session

- **WHEN** the page submits complete report fields for a valid `session_id`
- **THEN** the API client sends `POST /api/v1/sessions/{session_id}/report` and returns `ReportResponse`

#### Scenario: Retrieve report for active session

- **WHEN** the page requests report detail for a valid `session_id`
- **THEN** the API client sends `GET /api/v1/sessions/{session_id}/report` and returns `ReportResponse`
