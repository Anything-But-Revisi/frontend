## Context

Frontend membutuhkan lapisan integrasi API yang terpisah dari komponen UI agar endpoint sesi dan chat dari `openapi.json` bisa dikonsumsi konsisten di berbagai page. Kondisi saat ini belum memiliki klien HTTP terstandar, belum ada normalisasi error antar status code, dan belum ada kontrak response tunggal untuk hasil sukses/gagal.

Constraint utama:

- Integrasi harus menggunakan `axios`.
- Endpoint mengikuti OpenAPI backend (`/api/v1/sessions`, `/api/v1/sessions/{session_id}/chat`, `/health/db`, `/`).
- Kebutuhan awal fokus pada consumption layer untuk page, bukan perubahan backend.

Stakeholder utama: developer frontend yang akan menghubungkan service ini ke page chat/session.

## Goals / Non-Goals

**Goals:**

- Menyediakan satu `axios` instance dengan konfigurasi base URL, timeout, dan default header JSON.
- Menyediakan wrapper fungsi API untuk operasi inti: create session, delete session, send message, get chat history.
- Menstandarkan bentuk return data untuk sukses dan gagal agar page tidak menangani detail `AxiosError` langsung.
- Menjaga struktur service modular sehingga mudah dihubungkan ke page yang akan diberikan berikutnya.

**Non-Goals:**

- Tidak membangun state management global (Redux/Zustand) pada fase ini.
- Tidak mengubah kontrak backend, path endpoint, atau payload schema OpenAPI.
- Tidak mengimplementasikan fitur UI/UX chat di dokumen desain ini.

## Decisions

1. Gunakan satu `axios` instance terpusat

- **Keputusan:** buat modul HTTP client terpusat (mis. `src/services/httpClient.js`) yang menampung `baseURL`, `timeout`, dan request/response interceptor.
- **Rationale:** menghindari duplikasi konfigurasi dan memudahkan perubahan endpoint/env di satu titik.
- **Alternatif:** panggil `axios` langsung per fungsi endpoint.
- **Alasan tidak dipilih:** konfigurasi tersebar, sulit konsisten untuk error mapping dan observability.

2. Pisahkan layer endpoint dari layer normalisasi response

- **Keputusan:** endpoint methods ditempatkan di modul API (mis. `src/services/safespaceApi.js`), sedangkan fungsi normalisasi error/response di utilitas terpisah (mis. `src/services/apiContract.js`).
- **Rationale:** separation of concerns; mempermudah testing dan reuse.
- **Alternatif:** satu file besar berisi request + mapping + parsing.
- **Alasan tidak dipilih:** sulit dirawat saat endpoint bertambah.

3. Standarkan error shape untuk konsumsi page

- **Keputusan:** semua error dikonversi ke struktur konsisten, contoh: `{ status, message, details, code }`.
- **Rationale:** page hanya perlu menampilkan/menangani format tunggal, terlepas dari sumber error (422, 404, 503, network).
- **Alternatif:** lempar `AxiosError` mentah ke page.
- **Alasan tidak dipilih:** coupling tinggi ke library HTTP dan error handling UI menjadi bercabang.

4. Validasi input minimum di boundary frontend sebelum request

- **Keputusan:** lakukan guard sederhana (contoh `message` non-empty, panjang <= 4096) sebelum `send message` request.
- **Rationale:** mengurangi request invalid yang bisa dicegah lebih awal, tetap menjaga backend sebagai source of truth.
- **Alternatif:** seluruh validasi diserahkan ke backend.
- **Alasan tidak dipilih:** UX kurang baik karena pengguna mendapat feedback terlambat.

5. Gunakan konfigurasi environment untuk base URL

- **Keputusan:** baca URL backend dari env Vite (mis. `VITE_API_BASE_URL`) dengan fallback aman.
- **Rationale:** memudahkan perpindahan local/staging/production.
- **Alternatif:** hardcode URL backend.
- **Alasan tidak dipilih:** tidak fleksibel dan rawan kesalahan saat deploy.

## Risks / Trade-offs

- [Backend response bervariasi antar endpoint] → Mitigasi: buat mapper per endpoint jika diperlukan, lalu tetap expose kontrak umum ke page.
- [Over-normalization menghilangkan detail debugging] → Mitigasi: simpan detail asli di field `details` dan logging terkontrol pada mode development.
- [Mismatch env base URL] → Mitigasi: validasi presence env saat startup dan berikan pesan error konfigurasi yang jelas.
- [Validasi ganda frontend+backend] → Mitigasi: frontend hanya lakukan validasi ringan untuk UX; backend tetap authoritative.

## Migration Plan

1. Tambahkan dependency `axios`.
2. Buat HTTP client terpusat dan utilitas normalisasi response/error.
3. Buat fungsi endpoint sesuai OpenAPI untuk sessions/chat.
4. Integrasikan pemanggilan endpoint ke page target yang akan diberikan user.
5. Verifikasi manual: create session → send message → get history → delete session.
6. Rollback strategy: jika integrasi bermasalah, fallback ke implementasi request sebelumnya (atau nonaktifkan service baru) dengan mengisolasi perubahan hanya pada layer service.

## Open Questions

- Page mana yang akan menjadi titik integrasi pertama (nama file/route)?
- Apakah endpoint `/health/db` akan dipakai di UI runtime atau hanya untuk debugging/development?
- Apakah perlu mekanisme retry otomatis untuk error jaringan tertentu, atau cukup error surface ke UI?
- Apakah backend membutuhkan header tambahan (mis. auth/custom trace id) di luar OpenAPI saat ini?
