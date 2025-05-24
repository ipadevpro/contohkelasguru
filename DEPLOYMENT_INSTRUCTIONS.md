# 🚨 INSTRUKSI DEPLOYMENT BACKEND (URGENT)

## Masalah Yang Terjadi:
- Data siswa tidak sinkron antara frontend dan spreadsheet
- Backend GAS belum menggunakan kode terbaru
- Tambah siswa tidak muncul di spreadsheet

## Langkah-Langkah Perbaikan:

### STEP 1: Update Backend GAS
1. **Buka Google Apps Script**: https://script.google.com
2. **Cari project yang sudah ada** dengan nama "Teacher Dashboard API" atau serupa
3. **Buka file `Code.gs`**
4. **HAPUS SEMUA kode yang ada**
5. **COPY-PASTE** semua kode dari file `code.gs` di project ini
6. **SAVE** (Ctrl+S)

### STEP 2: Redeploy Web App
1. **Klik "Deploy"** (tombol biru di kanan atas)
2. **Pilih "Manage deployments"**
3. **Klik icon gear ⚙️** di deployment yang sudah ada
4. **Ubah "Version"** dari "Head" ke **"New version"**
5. **Beri deskripsi**: "Fix spreadsheet sync issue"
6. **Klik "Deploy"**
7. **COPY URL baru** yang diberikan (jika berbeda)

### STEP 3: Verify Fix
1. **Refresh halaman** `students.html`
2. **Klik tombol "Debug Connection"**
3. **Cek Console Log** - harus menampilkan data yang benar dari spreadsheet
4. **Test tambah siswa** - harus muncul di spreadsheet

## Expected Results:
- ✅ Debug Connection berhasil tanpa error "Invalid action"
- ✅ Data siswa sinkron dengan spreadsheet
- ✅ Tambah siswa langsung muncul di spreadsheet
- ✅ Spreadsheet ID yang benar: `1Gedn6C21H0T9D9SznpwKPex42GhDqksNOuGthxF6Tuo`

## Jika Masih Error:
1. **Cek permission** spreadsheet (harus bisa diakses publik)
2. **Pastikan URL GAS benar** di file `js/api.js` (sudah dikonsoli menjadi 1 file API)
3. **Cek Console Log** untuk error detail
4. **Contact admin** jika masih tidak berhasil

## Key Changes dalam Update:
- ✅ Fixed `SS = SpreadsheetApp.openById(SPREADSHEET_ID)` instead of `getActiveSpreadsheet()`
- ✅ Added debug function `debugSpreadsheetConnection`
- ✅ Enhanced logging untuk troubleshooting
- ✅ Proper error handling
- ✅ **Consolidated API files**: Menggabungkan 3 file API menjadi 1 file `js/api.js`

---
**⚠️ PENTING**: Deploy harus menggunakan "New version", bukan "Head", agar perubahan ter-apply! 