## Why

Frontend saat ini belum memiliki kontrak integrasi API yang siap pakai untuk endpoint sesi dan chat berdasarkan dokumentasi OpenAPI. Perlu disiapkan sekarang agar integrasi ke halaman berjalan konsisten, mudah dirawat, dan error handling tidak tersebar di banyak komponen.

## What Changes

- Menambahkan capability klien API berbasis `axios` yang mengikuti endpoint pada `openapi.json` (`create session`, `delete session`, `send message`, `get chat history`, dan endpoint health bila diperlukan).
- Menambahkan kontrak response dan error handling yang seragam agar komponen halaman menerima bentuk data yang stabil.
- Menyiapkan utilitas request/response untuk konsumsi di layer page tanpa mengikat logika UI ke detail HTTP.
- Mendefinisikan batasan payload sesuai spesifikasi (misalnya validasi panjang pesan dari endpoint chat).

## Capabilities

### New Capabilities

- `safespace-api-client`: Menyediakan fungsi API berbasis `axios` untuk seluruh endpoint inti sesi dan chat sesuai OpenAPI.
- `safespace-api-response-contract`: Menetapkan pemetaan response/error terstruktur untuk konsumsi page secara konsisten.

### Modified Capabilities

- Tidak ada (folder `openspec/specs` saat ini kosong).

## Impact

- Affected code: layer service/API frontend (mis. modul klien HTTP dan wrapper endpoint), serta titik integrasi di page yang akan diberikan berikutnya.
- APIs: endpoint REST pada `openapi.json` dengan base path `/api/v1/sessions` dan turunannya.
- Dependencies: penambahan package `axios` untuk integrasi HTTP client.
- Systems: perubahan terbatas pada frontend; tidak mengubah kontrak backend yang sudah ada.
