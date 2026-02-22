## 1. HTTP Client Configuration

- [x] 1.1 Perbarui `src/services/httpClient.js` agar menggunakan instance Axios terpusat dengan default `baseURL` `http://localhost:8000/`.
- [x] 1.2 Tambahkan dukungan override base URL dari environment variable dengan fallback ke localhost default.
- [x] 1.3 Standarkan timeout dan header JSON default untuk semua request service API.

## 2. API Service Alignment to OpenAPI

- [x] 2.1 Sinkronkan fungsi session lifecycle di `src/services/safespaceApi.js` untuk `createSession` dan `deleteSession` sesuai endpoint OpenAPI.
- [x] 2.2 Sinkronkan fungsi chat di `src/services/safespaceApi.js` untuk `sendMessage` dan `getChatHistory` dengan validasi boundary pesan 1-4096 karakter.
- [x] 2.3 Tambahkan/rapikan fungsi report di `src/services/safespaceApi.js` untuk `createReport` dan `getReport` berbasis `session_id` path parameter.

## 3. Response and Error Contract Normalization

- [x] 3.1 Perbarui `src/services/apiContract.js` agar memetakan response sukses ke shape `SessionResponse`, `MessageResponse`, `ChatHistoryResponse`, dan `ReportResponse`.
- [x] 3.2 Implementasikan normalisasi error API ke objek minimal `{ status, message, details }` untuk kasus HTTP dan network failure.
- [x] 3.3 Pastikan payload error 422/404/503/500 tetap membawa informasi detail yang diperlukan untuk debugging UI.

## 4. UI Integration in App Pages

- [x] 4.1 Migrasikan halaman terkait chat di `src/app/pages` agar menggunakan service API terpusat, bukan request langsung.
- [x] 4.2 Integrasikan alur report (submit dan retrieve) di halaman report/assessment agar memanggil `createReport` dan `getReport` dari service layer.
- [x] 4.3 Standarkan penanganan state error/loading di halaman-halaman integrasi API agar konsumsi kontrak error seragam.

## 5. Verification

- [x] 5.1 Verifikasi seluruh request lokal mengarah ke origin `http://localhost:8000/` dan path endpoint sesuai OpenAPI.
- [ ] 5.2 Uji alur end-to-end session → chat → report pada halaman app untuk memastikan mapping data dan rendering benar.
- [ ] 5.3 Uji skenario error utama (422, 404, 503, network error) dan pastikan UI menampilkan feedback konsisten.
