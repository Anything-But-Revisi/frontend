# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## API Configuration

Frontend API client menggunakan `axios` dengan base URL dari environment variable `VITE_API_BASE_URL`.

1. Salin file `.env.example` menjadi `.env`.
2. Isi nilai `VITE_API_BASE_URL` sesuai endpoint backend Anda.

Contoh:

```
VITE_API_BASE_URL=http://localhost:8000
```

Jika nilai env tidak valid, aplikasi akan fallback ke same-origin relative path.

## Manual Verification Flow

Setelah backend aktif, jalankan aplikasi lalu lakukan alur berikut:

1. Klik `Create Session`.
2. Kirim pesan dengan `Send Message`.
3. Ambil riwayat dengan `Get History`.
4. Hapus sesi dengan `Delete Session`.

UI akan menampilkan status dan error dengan kontrak error terstandar `{ status, message, details }`.
