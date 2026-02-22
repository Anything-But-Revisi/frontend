## Context

Frontend SafeSpace perlu menggunakan backend environment integrasi `http://anything-but-revisi.hackathon.sev-2.com/` secara konsisten agar alur session, chat, dan report berjalan sesuai kontrak OpenAPI. Saat ini konfigurasi base URL dapat berganti antara local dan remote, sehingga perlu standar konfigurasi yang jelas di service layer.

Perubahan ini bersifat lintas modul karena mencakup `httpClient`, abstraction service API, normalisasi response/error contract, serta integrasi halaman UI di `src/app/pages`.

## Goals / Non-Goals

**Goals:**

- Menetapkan Axios instance terpusat dengan target default `http://anything-but-revisi.hackathon.sev-2.com/`.
- Menjaga dukungan override via environment variable untuk fleksibilitas deployment.
- Menyelaraskan endpoint sessions/chat/report dengan schema OpenAPI.
- Menstandarkan konsumsi response dan error di UI melalui contract tunggal.

**Non-Goals:**

- Tidak mengubah API backend atau schema OpenAPI.
- Tidak menambah dependency HTTP baru selain Axios.
- Tidak melakukan redesign UX di luar kebutuhan integrasi data API.

## Decisions

1. **Single Axios client sebagai gateway semua request**
   - **Decision:** Semua request API dijalankan via satu instance di `src/services/httpClient.js`.
   - **Rationale:** Menjamin konsistensi base URL, timeout, header, serta interceptor error di semua halaman.
   - **Alternative considered:** Request langsung dari komponen; ditolak karena memecah konfigurasi dan kontrak error.

2. **Remote base URL default dengan env override**
   - **Decision:** Default diarahkan ke `http://anything-but-revisi.hackathon.sev-2.com/` ketika env tidak terisi/invalid, namun tetap bisa dioverride oleh `VITE_API_BASE_URL`.
   - **Rationale:** Aman untuk environment integrasi sekaligus kompatibel dengan workflow lokal.
   - **Alternative considered:** Hardcode tanpa override; ditolak karena membatasi portability antar environment.

3. **Contract normalization dipusatkan di `apiContract.js`**
   - **Decision:** Mapping success (`SessionResponse`, `MessageResponse`, `ChatHistoryResponse`, `ReportResponse`) dan error (`status`, `message`, `details`) dipusatkan dalam helper contract.
   - **Rationale:** UI tidak bergantung ke bentuk response mentah Axios.
   - **Alternative considered:** Mapping di tiap halaman; ditolak karena duplikasi logic.

4. **UI hanya mengonsumsi service layer**
   - **Decision:** Halaman chat/report/assessment mengakses API via `safespaceApi.js`.
   - **Rationale:** Menyederhanakan maintenance dan memudahkan perbaikan jika endpoint berubah.
   - **Alternative considered:** Hybrid sebagian langsung ke API; ditolak karena menimbulkan inkonsistensi.

## Risks / Trade-offs

- **[Risk] Env file mengarah ke host yang tidak aktif** → **Mitigation:** Gunakan fallback jelas, tampilkan pesan error koneksi terstandar.
- **[Risk] Response remote berbeda minor dari ekspektasi UI** → **Mitigation:** Gunakan normalisasi payload defensif dengan default value aman.
- **[Risk] Latensi environment remote memengaruhi UX** → **Mitigation:** Tampilkan state loading yang konsisten dan pesan gagal yang actionable.
- **[Trade-off] Layer abstraksi bertambah** → **Mitigation:** Pertahankan API service surface kecil dan dokumentasi task/spec jelas.
