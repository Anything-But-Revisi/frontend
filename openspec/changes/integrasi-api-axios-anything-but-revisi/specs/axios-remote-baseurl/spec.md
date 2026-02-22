## ADDED Requirements

### Requirement: Centralized remote base URL configuration

The system SHALL configure a centralized Axios HTTP client that targets `http://anything-but-revisi.hackathon.sev-2.com/` as the default SafeSpace API base URL for integration environment, while still supporting runtime override from `VITE_API_BASE_URL`.

#### Scenario: Request uses default remote base URL

- **WHEN** page calls any SafeSpace API method and runtime base URL is not provided
- **THEN** HTTP client sends request to endpoint prefixed by `http://anything-but-revisi.hackathon.sev-2.com/`

#### Scenario: Request uses environment override base URL

- **WHEN** `VITE_API_BASE_URL` is provided with a valid URL
- **THEN** HTTP client resolves relative endpoint path against `VITE_API_BASE_URL` instead of default remote URL
