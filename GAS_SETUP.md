# Setup Google Apps Script Backend

## Langkah 1: Buat Google Apps Script Project

1. Buka [Google Apps Script](https://script.google.com)
2. Klik "New Project"
3. Ganti nama project menjadi "Teacher Dashboard API"

## Langkah 2: Setup Code

1. Hapus semua code default di `Code.gs`
2. Copy semua code dari file `code.gs` di project ini
3. Paste ke editor Google Apps Script
4. Simpan project (Ctrl+S)

## Langkah 3: Deploy sebagai Web App

1. Klik tombol "Deploy" > "New deployment"
2. Pilih type: **Web app**
3. Set konfigurasi:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone (even anonymous)
4. Klik "Deploy"
5. **Copy Web App URL** yang diberikan

## Langkah 4: Konfigurasi Frontend

1. Buka file `js/api.js`
2. Cari baris dengan `const API_URL =`
3. Ganti dengan URL Web App yang sudah di-copy:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/ACTUAL_SCRIPT_ID/exec';
   ```

**Note**: API URL hanya perlu dikonfigurasi di `js/api.js`, semua file HTML akan menggunakan URL dari sana.

## Langkah 5: Test Koneksi

1. Buka `students.html` di browser
2. Buka Developer Tools (F12)
3. Lihat console - jika masih ada warning API_URL, berarti belum dikonfigurasi dengan benar

## Langkah 6: Setup Spreadsheet Permission

1. Buka Google Sheets dengan ID: `1Gedn6C21H0T9D9SznpwKPex42GhDqksNOuGthxF6Tuo`
2. Klik "Share" > "Anyone with the link can view"
3. Pastikan spreadsheet dapat diakses publik

## Troubleshooting

### Error CORS
- Pastikan sudah menggunakan GAS Web App URL, bukan langsung ke Google Sheets
- Pastikan deployment setting: "Anyone (even anonymous)"

### Error 403/404
- Periksa spreadsheet permission: "Anyone with the link can view"  
- Pastikan Spreadsheet ID benar
- Pastikan GAS Web App sudah di-deploy

### API_URL tidak terdefinisi
- Pastikan sudah mengganti URL di `js/api.js` dengan URL Web App yang benar
- URL harus dalam format: `https://script.google.com/macros/s/SCRIPT_ID/exec`
- Pastikan file `js/api.js` di-load dengan benar di HTML

### Data tidak sinkron dengan spreadsheet
- Klik tombol **"Refresh Data"** di halaman students.html untuk memuat ulang data
- Buka Browser Developer Tools (F12) dan lihat Console Log untuk debug info
- Pastikan Spreadsheet ID benar: `1Gedn6C21H0T9D9SznpwKPex42GhDqksNOuGthxF6Tuo`
- Periksa data di spreadsheet secara langsung vs data yang ditampilkan
- Jika masih berbeda, coba redeploy GAS Web App dengan versi baru

## Format Data di Spreadsheet

Spreadsheet harus memiliki header di baris pertama:
- `nama` atau `name` atau `student name`
- `nis` 
- `jenis_kelamin` atau `gender` (L/P atau Male/Female)
- `tanggal_lahir` atau `birth_date` (YYYY-MM-DD atau DD/MM/YYYY)

Contoh:
```
nama,nis,jenis_kelamin,tanggal_lahir
John Doe,12345,L,2000-01-15
Jane Smith,12346,P,1999-12-20
```

## Sesuai CORS Rules

Setup ini mengikuti aturan di `CORSrules.txt`:
- Frontend menggunakan `URLSearchParams` untuk POST request
- Tidak ada custom headers
- GAS Web App sebagai proxy untuk akses Google Sheets
- Tidak perlu setup CORS manual di GAS 