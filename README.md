# MamasOS Calculator Love Experience 🧮❤️

Sebuah web interaktif statis bertema romantis yang awalnya menyamar sebagai aplikasi kalkulator modern di ponsel, lalu bertransisi secara mengejutkan menjadi antarmuka terminal/TUI retro bernama **MamasOS** setelah memasukkan tanggal jadian.

Didesain khusus untuk **mobile-first** dan siap dideploy langsung ke **GitHub Pages** tanpa build step atau backend!

---

## ✨ Alur Pengalaman (User Flow)

```text
KALKULATOR MODERN
      ↓
Perhitungan ke-1 & ke-2 (berfungsi normal)
      ↓
Perhitungan ke-3 (tekan '=')
      ↓
POPUP RAHASIA: "eh coba masukin tanggal jadian kita deh sayang" [OK]
      ↓
INPUT LANGSUNG DI KALKULATOR:
  • Ketik tanggal jadian langsung menggunakan tombol angka kalkulator
    (contoh: 09062023, 9062023, 09.06.2023, atau 09-06-2023)
  • Tekan tombol '=' untuk memvalidasi tanggal
  • Jika salah: muncul popup "hmm... kayaknya bukan itu deh sayang" [Coba Lagi]
  • Jika benar: Validasi sukses & kalkulator langsung mati!
      ↓
KALKULATOR MATI (Glitch & Power Off)
      ↓
LAYAR HITAM PEKAT ("lah, kok mati?") ~1.2 detik
      ↓
BOOT MAMASOS (JetBrains Mono Terminal TUI)
  • SCANNING_ERROR.. dengan spinner (~3 detik)
  • [STATUS] ERROR_VALIDATED
  • Menampilkan 5 Error Diagnostik:
      [ERR-001] LOVE_OVERLOADED
      [ERR-002] HUG_NEEDED
      [ERR-003] MISSING_YOU
      [ERR-004] ATTENTION_REQUIRED
      [ERR-005] AFFECTION_OVERFLOW
  • Jeda 2 baris kosong
  • Animasi per detik: FIXING_ERROR. → FIXING_ERROR.. → FIXING_ERROR...
  • ERROR_HAS_BEEN_FIXED
  • ALL_THE_LOVE_IS_DIRECTLY_SENT_TO_YOU
  • > PRESS_ANYWHERE_TO_CONTINUE
      ↓
MAMASOS DASHBOARD (4 Menu TUI)
  • [01] APOLOGIZE_01 (Surat permintaan maaf pertama)
  • [02] APOLOGIZE_02 (Surat permintaan maaf kedua)
  • [03] LOVE_U (Pesan cinta & apresiasi)
  • [04] MAKE_UP (Pesan bujukan & ajakan baikan)
      ↓
LAYAR PESAN (Typewriter Effect)
  • Efek ketik terminal 32ms/karakter
  • Ketuk layar untuk langsung memunculkan seluruh pesan
  • Tombol `< BACK` di kiri atas kembali ke dashboard tanpa reload
```

---

## 🛠️ Cara Mengubah Pesan & Tanggal Jadian

Kamu bisa mengganti seluruh kata-kata romantis tanpa perlu mengerti coding atau mengubah logika aplikasi:

1. Buka file **[`js/messages.js`](file:///c:/Users/Lenovo/Documents/vibe_code/calculator-mas/js/messages.js)**.
2. Di dalam objek `MESSAGES`:
   - Ganti isi `APOLOGIZE_01.content`
   - Ganti isi `APOLOGIZE_02.content`
   - Ganti isi `LOVE_U.content`
   - Ganti isi `MAKE_UP.content`
3. Jika tanggal jadian berubah, kamu cukup mengubah `CONFIG.TARGET_DATE` di bagian atas file `js/messages.js`.

---

## 🚀 Cara Menjalankan Secara Lokal

Bisa menggunakan server lokal statis apa saja (misalnya VS Code Live Server, Python, Node, atau npx serve):

```bash
# Menggunakan npx serve
npx serve .

# Atau menggunakan Python
python -m http.server 8000
```

Buka browser di `http://localhost:8000` (atau gunakan device toolbar di Chrome/Safari untuk simulasi layar HP 360px–412px).

---

## 🌐 Cara Deploy ke GitHub Pages

1. Push repository ini ke GitHub:
   ```bash
   git add .
   git commit -m "feat: complete MamasOS Calculator Love Experience"
   git push origin main
   ```
2. Di halaman repository GitHub kamu:
   - Masuk ke tab **Settings** → **Pages**.
   - Pada bagian **Build and deployment** → **Source**, pilih **Deploy from a branch**.
   - Branch: pilih `main` dan folder `/ (root)`.
   - Klik **Save**.
3. Tunggu beberapa detik, tautan website kamu akan aktif dan siap dikirimkan ke pasanganmu! ❤️