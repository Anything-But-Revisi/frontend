## ADDED Requirements

### Requirement: Centralized localhost base URL configuration

The system SHALL configure a centralized Axios HTTP client that targets `http://localhost:8000/` as the default SafeSpace API base URL for local development, so all frontend API calls in the app resolve against one consistent origin.

#### Scenario: Request uses default localhost base URL

- **WHEN** a page invokes any SafeSpace API method without overriding runtime base URL
- **THEN** the HTTP client sends the request to an endpoint prefixed by `http://localhost:8000/`

#### Scenario: Relative endpoint path is resolved consistently

- **WHEN** the API service calls a relative path such as `/api/v1/sessions`
- **THEN** the HTTP client resolves the final URL against the centralized localhost base URL without per-page URL assembly
