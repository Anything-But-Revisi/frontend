## 1. Setup & Konfigurasi Dasar

- [x] 1.1 Tambahkan dependency `axios` pada proyek frontend.
- [x] 1.2 Tambahkan konfigurasi environment `VITE_API_BASE_URL` dan dokumentasikan penggunaan nilainya untuk local/staging.
- [x] 1.3 Buat struktur folder service API (mis. `src/services/`) sebagai lokasi `httpClient`, API methods, dan kontrak response.

## 2. HTTP Client & Kontrak Error/Response

- [x] 2.1 Implementasikan `axios` instance terpusat dengan `baseURL`, `timeout`, dan default header JSON.
- [x] 2.2 Tambahkan utilitas normalisasi success payload agar page menerima data schema (`SessionResponse`, `MessageResponse`, `ChatHistoryResponse`) tanpa transport metadata yang tidak dibutuhkan.
- [x] 2.3 Tambahkan utilitas normalisasi error ke bentuk konsisten minimal `{ status, message, details }`, termasuk penanganan 422, 503, dan network failure.

## 3. Implementasi Endpoint Sessions & Chat

- [x] 3.1 Implementasikan method `createSession` untuk `POST /api/v1/sessions`.
- [x] 3.2 Implementasikan method `deleteSession` untuk `DELETE /api/v1/sessions/{session_id}` dengan sukses HTTP 204.
- [x] 3.3 Implementasikan method `sendMessage` untuk `POST /api/v1/sessions/{session_id}/chat`.
- [x] 3.4 Implementasikan method `getChatHistory` untuk `GET /api/v1/sessions/{session_id}/chat`.
- [x] 3.5 Tambahkan guard input pada boundary frontend untuk pesan chat (non-empty, panjang 1-4096) sebelum request dikirim.

## 4. Integrasi ke Page & Verifikasi

- [x] 4.1 Integrasikan service API ke page target yang diberikan user tanpa menambahkan state management global baru.
- [x] 4.2 Pastikan page menangani kontrak error terstandar untuk menampilkan pesan kegagalan yang konsisten.
- [ ] 4.3 Lakukan verifikasi manual alur: create session → send message → get history → delete session.
- [ ] 4.4 Verifikasi fallback konfigurasi dan pesan error saat `VITE_API_BASE_URL` tidak valid atau backend tidak tersedia.
