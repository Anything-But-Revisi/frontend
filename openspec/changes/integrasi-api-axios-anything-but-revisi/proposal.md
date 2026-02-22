## Why

Integrasi API pada UI `src/app` perlu diarahkan ke base URL deployment `http://anything-but-revisi.hackathon.sev-2.com/` agar frontend sesuai dengan backend target environment dan kontrak OpenAPI terbaru. Perubahan ini dibutuhkan sekarang untuk menghindari mismatch endpoint antara konfigurasi lokal dan environment integrasi.

## What Changes

- Menstandarkan konfigurasi Axios terpusat agar menggunakan base URL `http://anything-but-revisi.hackathon.sev-2.com/` dengan dukungan override via environment variable.
- Menyelaraskan service API session, chat, dan report terhadap endpoint dan schema OpenAPI.
- Menstandarkan mapping response sukses serta normalisasi error API untuk konsumsi UI yang konsisten.
- Mengintegrasikan halaman terkait di `src/app/pages` agar konsumsi API dilakukan melalui service layer, bukan request langsung di komponen.

## Capabilities

### New Capabilities

- `axios-remote-baseurl`: Standar konfigurasi Axios terpusat untuk environment integrasi remote SafeSpace.

### Modified Capabilities

- `safespace-api-client`: Requirement client API diperbarui untuk target base URL environment integrasi serta endpoint OpenAPI session/chat/report.
- `safespace-api-response-contract`: Requirement normalisasi sukses/error diperbarui agar kompatibel dengan response dari deployment remote.
- `safespace-ui-api-integration`: Requirement integrasi halaman `src/app` diperbarui agar menggunakan service API terpusat dengan state loading/error seragam.

## Impact

- Affected code: `src/services/httpClient.js`, `src/services/safespaceApi.js`, `src/services/apiContract.js`, dan halaman-halaman terkait di `src/app/pages`.
- Affected API usage: `POST /api/v1/sessions`, `DELETE /api/v1/sessions/{session_id}`, `POST/GET /api/v1/sessions/{session_id}/chat`, `POST/GET /api/v1/sessions/{session_id}/report`.
- Dependencies: Axios sebagai HTTP client utama untuk seluruh alur UI.
- Systems: Frontend Vite app dan backend target `http://anything-but-revisi.hackathon.sev-2.com/`.
