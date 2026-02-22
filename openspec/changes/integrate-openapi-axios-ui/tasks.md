## 1. Setup & Dasar Storage

- [x] 1.1 Buat helper utilitas di `src/services/storage.js` untuk manajemen `localStorage` (getItem, setItem, removeItem).
- [x] 1.2 Pastikan `VITE_API_BASE_URL` terkonfigurasi di file `.env`.

## 2. Sinkronisasi API Client & Session Flow

- [x] 2.1 Perbarui `src/services/httpClient.js` dengan konfigurasi `axios` (baseURL, timeout).
- [x] 2.2 Implementasi `createSession` di `safespaceApi.js` yang mengembalikan `session_id`.
- [x] 2.3 Implementasi `sendMessage` dan `getChatHistory` agar menerima `session_id` untuk disisipkan ke URL path.
- [x] 2.4 Tambahkan fungsi `deleteSession` yang menghapus sesi di backend dan membersihkan `localStorage`.

## 3. Standarisasi Response & Guard

- [x] 3.1 Update `src/services/apiContract.js` untuk memetakan response ke schema `SessionResponse`, `MessageResponse`, dll.
- [x] 3.2 Implementasi interceptor error untuk mengubah error Axios menjadi format `{ status, message, details }`.
- [x] 3.3 Tambahkan validasi panjang karakter (1-4096) pada fungsi `sendMessage`.

## 4. Integrasi UI & Logic Persistensi

- [x] 4.1 Tambahkan logic pada entry point chat: Jika `localStorage` kosong, eksekusi `createSession` dan simpan hasilnya.
- [x] 4.2 Hubungkan aksi kirim pesan di UI dengan service `sendMessage` menggunakan ID dari storage.
- [x] 4.3 Implementasi penanganan error di UI: Jika API mengembalikan error bahwa sesi tidak ditemukan, arahkan user untuk reset/pembuatan sesi ulang.

## 5. Verifikasi

- [ ] 5.1 Uji alur: Buka aplikasi -> Sesi tersimpan di localStorage -> Refresh halaman -> Sesi tetap sama.
- [ ] 5.2 Uji alur: Kirim pesan -> Pastikan URL request mengandung ID yang benar.
- [ ] 5.3 Uji skenario error: Simulasi error 503 (server down) dan pastikan UI menampilkan pesan yang sesuai.
