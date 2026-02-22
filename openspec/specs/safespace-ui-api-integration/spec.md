## ADDED Requirements

### Requirement: UI pages integrate session and chat API flow

The system SHALL integrate frontend pages with the SafeSpace API service so session lifecycle and chat interactions run end-to-end using the documented OpenAPI contract.

#### Scenario: Page initializes anonymous session

- **WHEN** a user opens the page that requires chat interaction and there is no active `session_id`
- **THEN** the page invokes the API service `createSession` flow and stores the returned `session_id` for subsequent chat requests

#### Scenario: Page sends user message through service layer

- **WHEN** a user submits a valid non-empty chat message with length 1-4096
- **THEN** the page invokes the API service `sendMessage` flow and renders the returned `MessageResponse` content

#### Scenario: Page loads and renders chat history

- **WHEN** a page with a valid `session_id` requests previous conversation data
- **THEN** the page invokes the API service `getChatHistory` flow and renders messages from `ChatHistoryResponse.messages`

#### Scenario: Page handles standardized API error contract

- **WHEN** any session/chat request fails with validation, service unavailable, or network failure
- **THEN** the page consumes the normalized error object and presents a consistent error message path without parsing raw transport errors
