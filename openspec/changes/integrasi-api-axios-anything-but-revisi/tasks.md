## 1. HTTP Client Remote Configuration

- [x] 1.1 Pastikan `src/services/httpClient.js` memakai instance Axios terpusat dengan default `baseURL` `http://anything-but-revisi.hackathon.sev-2.com/`.
- [x] 1.2 Pastikan `VITE_API_BASE_URL` dapat override base URL default dengan fallback aman saat nilai env invalid/kosong.
- [x] 1.3 Standarkan timeout, header JSON, dan interceptor response/error pada instance Axios.

## 2. API Service Alignment to OpenAPI

- [x] 2.1 Rapikan `createSession` dan `deleteSession` di `src/services/safespaceApi.js` agar sesuai endpoint OpenAPI.
- [x] 2.2 Rapikan `sendMessage` dan `getChatHistory` dengan validasi boundary message 1-4096 karakter.
- [x] 2.3 Pastikan `createReport` dan `getReport` menggunakan path `session_id` dan payload enum sesuai `ReportCreate`.

## 3. Response & Error Contract Normalization

- [x] 3.1 Pastikan `src/services/apiContract.js` memetakan response sukses ke shape `SessionResponse`, `MessageResponse`, `ChatHistoryResponse`, dan `ReportResponse`.
- [x] 3.2 Pastikan semua error API/network dinormalisasi ke objek `{ status, message, details }`.
- [x] 3.3 Pastikan skenario 422/404/500/503 menyimpan detail backend untuk observability dan debugging UI.

## 4. UI Integration in App Pages

- [x] 4.1 Pastikan halaman chat di `src/app/pages/chat.tsx` hanya memakai service API terpusat.
- [x] 4.2 Integrasikan halaman report/assessment agar submit dan retrieve report memakai `createReport`/`getReport`.
- [x] 4.3 Standarkan state loading/error UI agar menggunakan kontrak error ter-normalisasi.

## 5. Verification

- [x] 5.1 Verifikasi request berjalan ke host `http://anything-but-revisi.hackathon.sev-2.com/` saat env menunjuk ke host tersebut.
- [ ] 5.2 Uji alur end-to-end session → chat → report pada halaman app.
- [ ] 5.3 Uji skenario error utama (422, 404, 500, 503, network failure) dan validasi feedback UI.
