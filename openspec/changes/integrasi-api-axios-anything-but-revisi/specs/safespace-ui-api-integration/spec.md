## MODIFIED Requirements

### Requirement: UI pages integrate session and chat API flow

The system SHALL integrate frontend pages with SafeSpace API service so session lifecycle and chat interactions run end-to-end using service abstraction and documented OpenAPI contract.

#### Scenario: Page initializes anonymous session

- **WHEN** user opens page requiring chat interaction and no active `session_id` exists
- **THEN** page invokes `createSession` service flow and stores returned `session_id` for next requests

#### Scenario: Page sends user message through service layer

- **WHEN** user submits valid non-empty chat message with length 1-4096
- **THEN** page invokes `sendMessage` service flow and renders returned `MessageResponse`

#### Scenario: Page loads chat history through service layer

- **WHEN** page with valid `session_id` requests previous conversation
- **THEN** page invokes `getChatHistory` service flow and renders `ChatHistoryResponse.messages`

## ADDED Requirements

### Requirement: UI pages integrate report API flow

The system SHALL integrate report page flow in `src/app/pages` with report service methods for create/retrieve operations using active `session_id`.

#### Scenario: Page creates report through service layer

- **WHEN** report data from assessment flow is complete for active `session_id`
- **THEN** page invokes `createReport` service and renders resulting `ReportResponse` (including nullable `generated_document`)

#### Scenario: Page retrieves existing report through service layer

- **WHEN** report page is opened with active `session_id`
- **THEN** page invokes `getReport` service and renders existing report if available, otherwise follows creation flow

#### Scenario: Page handles loading and normalized error state

- **WHEN** report request is in progress or fails
- **THEN** page shows consistent loading indicator and standardized error message from normalized API error contract
