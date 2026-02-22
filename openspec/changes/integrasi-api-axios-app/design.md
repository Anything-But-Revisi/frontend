## Context

Frontend SafeSpace pada folder `src/app` sudah memiliki halaman chat, report, dan assessment, tetapi konsumsi API masih belum sepenuhnya konsisten dengan `openapi.json` terbaru. Selain itu, konfigurasi HTTP client perlu dipastikan terpusat dengan `baseURL` lokal `http://localhost:8000/` agar perilaku request seragam di semua halaman.

Integrasi ini bersifat lintas modul karena menyentuh `httpClient`, kontrak response/error, API service wrapper, dan pemanggilan di banyak halaman. Dokumen desain diperlukan agar keputusan teknis sinkron sebelum implementasi.

## Goals / Non-Goals

**Goals:**

- Menetapkan penggunaan instance Axios terpusat dengan `baseURL http://localhost:8000/` untuk semua request SafeSpace API.
- Menyamakan shape request/response endpoint sessions, chat, dan report dengan kontrak OpenAPI.
- Menstandarkan normalisasi error API menjadi format yang dapat dikonsumsi konsisten oleh UI.
- Menyelaraskan pemanggilan service API dari halaman-halaman di `src/app/pages` tanpa ketergantungan pada response mentah Axios.

**Non-Goals:**

- Tidak mengubah endpoint, skema, atau perilaku backend.
- Tidak menambah framework state management baru.
- Tidak melakukan redesign UI/UX di luar kebutuhan integrasi API.

## Decisions

1. **Axios instance tunggal di service layer**
   - **Decision:** Semua operasi API menggunakan satu instance di `src/services/httpClient.js` dengan `baseURL` default `http://localhost:8000/`, timeout, dan header JSON standar.
   - **Rationale:** Menghindari konfigurasi berulang di tiap halaman serta memastikan konsistensi lintas endpoint.
   - **Alternative considered:** Memanggil `axios` langsung dari komponen halaman; ditolak karena menyulitkan pengendalian error dan pengujian.

2. **Abstraksi endpoint di `safespaceApi.js` berbasis kontrak OpenAPI**
   - **Decision:** Menyediakan fungsi service eksplisit untuk lifecycle session, chat history/message, dan report create/get yang memetakan path parameter `session_id` secara deterministik.
   - **Rationale:** Mengisolasi detail endpoint dari UI dan menjaga kesesuaian terhadap dokumentasi API.
   - **Alternative considered:** Endpoint string disusun di komponen; ditolak karena rawan inkonsistensi path.

3. **Normalisasi success/error contract di `apiContract.js`**
   - **Decision:** Response sukses dipetakan ke payload domain (tanpa metadata transport), sementara error Axios/network dinormalisasi minimal menjadi `{ status, message, details }`.
   - **Rationale:** Komponen UI cukup bergantung pada satu kontrak data/error yang stabil.
   - **Alternative considered:** Membiarkan error Axios mentah naik ke UI; ditolak karena variasi struktur antar-kasus.

4. **Integrasi bertahap ke halaman `src/app/pages`**
   - **Decision:** Halaman yang berinteraksi dengan API (chat/report/assessment terkait) menggunakan service layer, bukan request langsung.
   - **Rationale:** Meminimalkan coupling dan memudahkan rollout perubahan bertahap.
   - **Alternative considered:** Big-bang migration semua halaman sekaligus; ditolak karena risiko regresi lebih tinggi.

## Risks / Trade-offs

- **[Risk] Base URL lokal hardcoded menyebabkan mismatch saat environment berubah** → **Mitigation:** Pertahankan fallback `http://localhost:8000/` namun tetap mendukung override via environment variable.
- **[Risk] Normalisasi error terlalu generik dapat menyembunyikan detail debugging** → **Mitigation:** Simpan payload asli backend pada `details` untuk logging internal.
- **[Risk] Perubahan service contract berdampak ke banyak halaman** → **Mitigation:** Lakukan migrasi berbasis fungsi API yang kompatibel dan uji alur session/chat/report per halaman.
- **[Trade-off] Lapisan abstraksi bertambah** → **Mitigation:** Dokumentasikan fungsi service dan contract agar maintainability tetap tinggi.
