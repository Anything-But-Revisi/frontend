## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: UI pages integrate report API flow

The system SHALL integrate report-related pages in `src/app/pages` with report service methods so report submission and retrieval follow the documented backend contract.

#### Scenario: Page submits report form through service layer

- **WHEN** a user submits report input lengkap untuk `location`, `perpetrator`, `description`, `evidence`, dan `user_goal`
- **THEN** halaman memanggil service `createReport` untuk `session_id` aktif dan merender hasil `ReportResponse` termasuk `generated_document` jika tersedia

#### Scenario: Page retrieves existing report through service layer

- **WHEN** halaman membutuhkan detail laporan untuk `session_id` aktif
- **THEN** halaman memanggil service `getReport` dan menampilkan data sesuai shape `ReportResponse`
