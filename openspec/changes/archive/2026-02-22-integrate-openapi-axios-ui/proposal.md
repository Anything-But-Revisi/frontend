## Why

Alur chat anonim membutuhkan mekanisme untuk mengingat identitas user tanpa login. Saat ini, frontend belum mengelola penyimpanan `session_id` secara konsisten, yang menyebabkan putusnya konteks chat saat refresh atau navigasi. Perubahan ini menyelaraskan frontend dengan kontrak OpenAPI yang berbasis resource `/sessions/{session_id}`.

## What Changes

- **Session Management:** Implementasi penyimpanan `session_id` ke `localStorage` setelah eksekusi `POST /api/v1/sessions`.
- **API Wrapper Sync:** Memperbarui `src/services/safespaceApi.js` agar mendukung endpoint dinamis:
  - `POST /api/v1/sessions/{session_id}/chat`
  - `GET /api/v1/sessions/{session_id}/chat`
  - `DELETE /api/v1/sessions/{session_id}`
- **Error Normalization:** Menyeragamkan kontrak error agar UI dapat mendeteksi kapan sesi sudah tidak valid (misal: 404) dan mengarahkan user untuk membuat sesi baru.
- **Input Validation:** Proteksi panjang pesan 1-4096 karakter di sisi klien.

## Capabilities

### New Capabilities

- `session-persistence-logic`: Kemampuan aplikasi untuk menyimpan, mengambil, dan menghapus identitas sesi secara lokal.

### Modified Capabilities

- `safespace-api-client`: Diperbarui untuk mendukung path parameters dinamis berdasarkan session yang aktif.
- `safespace-api-response-contract`: Normalisasi response sukses dan gagal agar konsisten dikonsumsi oleh komponen UI.

## Impact

- **Affected Code:** `src/services/safespaceApi.js`, `src/services/httpClient.js`, dan UI Controller di `src/app/pages/*`.
- **Storage:** Penggunaan `localStorage` untuk key `safespace_session_id`.
- **User Flow:** User masuk -> Sesi dibuat & disimpan -> Chat/Report menggunakan ID tersebut -> Sesi dihapus (opsional/logout).
