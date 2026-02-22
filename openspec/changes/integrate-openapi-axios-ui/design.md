## Context

Frontend SafeSpace perlu mengintegrasikan alur sesi anonim secara end-to-end. Saat ini, koordinasi antara pembuatan sesi, penyimpanan identitas sesi (`session_id`), dan penggunaan kembali ID tersebut untuk chat/report belum terstandarisasi.

Perubahan ini berfokus pada persistensi sesi di sisi klien menggunakan `localStorage` agar pengguna tetap berada dalam sesi yang sama meskipun halaman di-refresh, serta memastikan semua request chat/report diarahkan ke path parameter yang benar sesuai `openapi.json`.

## Goals / Non-Goals

**Goals:**

- Mengimplementasikan penyimpanan `session_id` ke `localStorage` setelah pembuatan sesi berhasil.
- Mengatur `safespaceApi.js` agar mengambil `session_id` dari storage untuk request chat, history, dan report.
- Menstandarkan penanganan error (422, 503) agar UI dapat merespon kegagalan sesi secara anggun.

**Non-Goals:**

- Tidak menggunakan database sisi klien yang kompleks (cukup `localStorage`).
- Tidak mengubah skema backend.

## Decisions

1. **Persistensi Sesi via `localStorage`**
   - **Decision:** Simpan `session_id` dengan key `safespace_session_id` segera setelah `POST /api/v1/sessions` sukses.
   - **Rationale:** Memungkinkan alur chat yang persisten tanpa memerlukan sistem login formal (anonim).

2. **Abstraksi Service dengan Path Parameter Otomatis**
   - **Decision:** Fungsi di `src/services/safespaceApi.js` (seperti `sendMessage` atau `getReport`) harus menerima `session_id` sebagai argumen pertama atau mengambilnya dari helper storage.
   - **Rationale:** Memastikan kesesuaian dengan kontrak `/api/v1/sessions/{session_id}/...`.

3. **HTTP Client Terpusat di `src/services/httpClient.js`**
   - **Decision:** Gunakan instance `axios` tunggal dengan interceptor untuk menangani error global dan normalisasi response.
   - **Rationale:** Memudahkan debugging dan memastikan semua request memiliki base URL dan timeout yang sama.

4. **Validasi Boundary di Frontend**
   - **Decision:** Guard validasi pesan (1-4096 karakter) dilakukan sebelum hit API.
   - **Rationale:** Mengurangi beban server dan memberikan feedback instan ke user.

## Migration Plan

1. **Setup Storage Helper:** Buat utilitas untuk get/set/remove `session_id` di `localStorage`.
2. **Update Service API:** Ubah `createSession` untuk mengembalikan ID, dan sesuaikan `sendMessage`/`getChatHistory` untuk menerima parameter `{session_id}`.
3. **Integrasi Page:** - Di halaman inisiasi: Cek `localStorage`. Jika kosong, panggil `createSession`.
   - Di halaman chat: Ambil ID dari storage, lalu gunakan untuk polling history/kirim pesan.
4. **Cleanup:** Tambahkan logic `deleteSession` yang juga membersihkan `localStorage`.

## Open Questions

- Apakah perlu mekanisme kadaluarsa sesi (TTL) di sisi frontend selain dari response 404/410 backend?
