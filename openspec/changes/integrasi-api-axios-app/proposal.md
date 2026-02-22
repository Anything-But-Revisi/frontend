## Why

Integrasi API di UI `src/app` belum konsisten terhadap kontrak OpenAPI terbaru dan belum menggunakan konfigurasi Axios yang terpusat dengan `baseURL http://localhost:8000/`. Perubahan ini diperlukan sekarang agar alur session, chat, dan report berjalan stabil dengan format request/response yang terdokumentasi.

## What Changes

- Menstandarkan konsumsi endpoint backend SafeSpace dari halaman-halaman di `src/app/pages` melalui service API berbasis Axios.
- Memastikan `baseURL` mengarah ke `http://localhost:8000/` untuk environment lokal sesuai dokumentasi OpenAPI.
- Menyesuaikan payload dan mapping response untuk endpoint sessions, chat, dan report agar sesuai schema OpenAPI.
- Menambahkan penanganan error response (422/404/503/500) yang konsisten di layer API client agar UI dapat menampilkan state yang benar.

## Capabilities

### New Capabilities

- `axios-localhost-baseurl`: Standar konfigurasi Axios terpusat untuk integrasi API SafeSpace di aplikasi UI.

### Modified Capabilities

- `safespace-api-client`: Requirement client API diperbarui agar mematuhi endpoint dan schema OpenAPI saat ini.
- `safespace-api-response-contract`: Requirement normalisasi dan validasi bentuk response/error diperbarui untuk endpoint sessions, chat, dan report.
- `safespace-ui-api-integration`: Requirement integrasi halaman `src/app` diperbarui agar memakai API client terpusat dengan fallback/error handling konsisten.

## Impact

- Affected code: `src/services/httpClient.js`, `src/services/safespaceApi.js`, `src/services/apiContract.js`, dan halaman terkait di `src/app/pages`.
- Affected API usage: `POST /api/v1/sessions`, `DELETE /api/v1/sessions/{session_id}`, `POST/GET /api/v1/sessions/{session_id}/chat`, `POST/GET /api/v1/sessions/{session_id}/report`.
- Dependencies: Axios (sudah terpasang) menjadi jalur utama komunikasi HTTP di UI.
- Systems: Frontend Vite app dan backend lokal pada `http://localhost:8000/`.
