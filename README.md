# TANG-LOOP: Platform B2B Hyperlocal Berbasis AI untuk Penyelamatan Pangan Grade-B & By-product di Tangerang Raya

Prototype Frontend Terintegrasi End-to-End mencakup **16 Layar**, Interaksi Lintas Peran, Simulasi Fitur AI (★), dan Visualizer Alur Operasi Lapangan.

---

## 🌟 Ringkasan Eksekutif & Konteks Lapangan

* **Lokasi & Sentra Pasokan:** Pasar Induk Tanah Tinggi Kota Tangerang (kapasitas perputaran ±3.000 ton/hari) dan Sentra By-product Tahu/Tempe (Cipondoh & Ceger).
* **Permasalahan Utama:**
  * Food loss & waste Indonesia 23–48 juta ton/tahun (kerugian Rp213–551 triliun).
  * Hortikultura mengalami susut 31,8% dari ketersediaan domestik.
  * Sampah organik mendominasi **57,65%** dari timbulan sampah harian TPA Rawa Kucing.
  * Ampas tahu basah cepat rusak (hanya bertahan 2–3 hari).
  * Pencatatan manual lambat, grading informal tanpa harga transparan, dan keengganan pedagang pasar menggunakan aplikasi rumit.
* **Solusi TANG-LOOP:**
  * Platform B2B Hyperlocal menghubungkan pemasok (pedagang pasar induk & pengrajin tahu) dengan pembeli (92.783 UMKM kuliner Tangerang Raya: warteg, katering, pengolah pakan/kompos).
  * **★ Fitur AI Inti:** Grading foto Computer Vision, estimasi sisa umur simpan, asisten WhatsApp tanpa aplikasi, Valorization Router 4-tingkat, formula harga dinamis eksponensial, dan prinsip *Responsible AI with Human-in-the-Loop Verification*.

---

## 📱 Alur 16 Layar End-to-End

| Tahap | ID Layar | Nama Layar | Persona | Peran dalam Inovasi Proposal | Berkas |
|:---:|:---:|---|---|---|:---:|
| **01** | `194c99e3...` | **Pengguna Normal - Login & Masuk** | Pemasok & Pembeli UMKM | Login instan OTP WhatsApp / Akun Lapak Google Bisnis | [`screens/01...html`](file:///c:/Users/Panji.%20F/tangloop/screens/01-pengguna-normal-login-masuk.html) |
| **02** | `94d6da47...` | **Pengguna Normal - Onboarding Interaktif** | Onboarding Persona | Seleksi profil Pemasok Lapak vs Pembeli UMKM Kuliner | [`screens/02...html`](file:///c:/Users/Panji.%20F/tangloop/screens/02-pengguna-normal-onboarding-interaktif.html) |
| **03** | `c354b2ce...` | **★ Layar 2: Posting & Grading AI** | Pemasok Lapak | CV grading foto (target kesesuaian ≥80%), estimasi jam simpan & bot WA | [`screens/05...html`](file:///c:/Users/Panji.%20F/tangloop/screens/05-layar-2-posting-grading-ai.html) |
| **04** | `78dfa955...` | **★ Layar 4: Rekomendasi Rute AI (Router)** | Valorization Router | Matriks keputusan 4-tier: Konsumsi, Pengolahan, Pakan, Kompos | [`screens/13...html`](file:///c:/Users/Panji.%20F/tangloop/screens/13-layar-4-rekomendasi-rute-ai-router.html) |
| **05** | `53b78e3a...` | **Verifikator - Login Petugas** | Petugas Tera Pasar | Otentikasi pengawas mutu pangan & inspektur tera Pasar Tanah Tinggi | [`screens/10...html`](file:///c:/Users/Panji.%20F/tangloop/screens/10-verifikator-login-petugas.html) |
| **06** | `ef927e78...` | **Verifikator - Onboarding SOP** | SOP Organoleptik | Standar uji fisik, tekstur, aroma, dan batas kelayakan konsumsi | [`screens/11...html`](file:///c:/Users/Panji.%20F/tangloop/screens/11-verifikator-onboarding-sop.html) |
| **07** | `fa34f051...` | **★ Verifikator - Antrean Verifikasi** | Human-in-the-Loop | Triage antrean lot dengan skor keyakinan AI < 80% / by-product sensitif | [`screens/09...html`](file:///c:/Users/Panji.%20F/tangloop/screens/09-verifikator-antrean-verifikasi.html) |
| **08** | `735b953f...` | **★ Verifikator - Detail Inspeksi & Override** | Inspeksi & Override | Audit visual resolusi tinggi & hak override keputusan AI oleh manusia | [`screens/12...html`](file:///c:/Users/Panji.%20F/tangloop/screens/12-verifikator-detail-inspeksi-override.html) |
| **09** | `a7b2f7d1...` | **Layar 1: Beranda Lot TANG-LOOP** | Pembeli B2B / Warteg | Katalog surplus transparan, filter waktu simpan, dan harga diskon | [`screens/03...html`](file:///c:/Users/Panji.%20F/tangloop/screens/03-layar-1-beranda-lot-tang-loop.html) |
| **10** | `67208ab8...` | **★ Layar 3: Detail Lot & Harga Dinamis** | Kalkulator Harga AI | Formula $P(t) = P_{min} + (P_{max}-P_{min}) \times (t_{sisa}/T_{tot})^\alpha$ | [`screens/04...html`](file:///c:/Users/Panji.%20F/tangloop/screens/04-layar-3-detail-lot-harga-dinamis.html) |
| **11** | `e6141fd9...` | **Profil Pemasok Lapak Pasar Induk** | Reputasi Lapak | Skor tera resmi, ulasan kebersihan, dan rekam jejak penyelamatan | [`screens/08...html`](file:///c:/Users/Panji.%20F/tangloop/screens/08-profil-pemasok-lapak-pasar-induk.html) |
| **12** | `3cba9ece...` | **Layar 5: Jadwal Pickup & Logistik Subuh** | Logistik Kolektif | Pengaturan rute subuh 02:00–05:30 WIB Tanah Tinggi–Tangerang Raya | [`screens/14...html`](file:///c:/Users/Panji.%20F/tangloop/screens/14-layar-5-jadwal-pickup-logistik-subuh.html) |
| **13** | `9c9742cb...` | **Pelacakan Langsung Armada Subuh** | Live GPS Radar | GPS tracking armada pendingin, telemetri suhu (14°C), dan ETA subuh | [`screens/06...html`](file:///c:/Users/Panji.%20F/tangloop/screens/06-pelacakan-langsung-armada-subuh.html) |
| **14** | `cfa5c14a...` | **Unduh Bukti Mutu & Surat Jalan Digital** | Traceability Manifest | QR Code verifikasi, e-signature inspektur pasar, dan surat jalan digital | [`screens/07...html`](file:///c:/Users/Panji.%20F/tangloop/screens/07-unduh-bukti-mutu-surat-jalan-digital.html) |
| **15** | `f3905f2a...` | **Layar 6: Dasbor Dampak Keberlanjutan** | Pemkot/DLH/CSR | Metrik kg pangan terselamatkan, emisi $CO_2e$, dan dampak SDG 2, 11, 12 | [`screens/15...html`](file:///c:/Users/Panji.%20F/tangloop/screens/15-layar-6-dasbor-dampak-keberlanjutan.html) |
| **16** | `87574b18...` | **Layar 7: Profil Pengguna & Riwayat Pesanan** | Pembeli B2B | Manajemen akun, arsip invoice, loyalty points, dan reorder | [`screens/16...html`](file:///c:/Users/Panji.%20F/tangloop/screens/16-layar-7-profil-pengguna-riwayat-pesanan.html) |

---

## 🛠️ Fitur Interaktif pada Master Shell ([index.html](file:///c:/Users/Panji.%20F/tangloop/index.html))

1. **Stepper Navigasi 16-Langkah Terpandu:**
   - Navigasi maju/mundur dengan tombol Keyboard / Klik.
   - Panel narasi proposal kontekstual yang otomatis menyesuaikan isi layar aktif dengan rujukan proposal penelitian.
2. **Device Frame Switcher:**
   - 📱 **Mobile (390 × 844 px)** dengan bezel iPhone realistis, notch dinamis, dan status bar.
   - 📟 **Tablet (768 × 1024 px)**
   - 💻 **Layar Penuh Responsif (100% Fluid)**
3. **Simulasi Bot Asisten WhatsApp (Modal Interaktif):**
   - Mendemonstrasikan pedagang yang mengirim foto atau voice note tanpa aplikasi, dengan respons AI instan (komoditas, berat, grade, dan estimasi harga).
4. **Interactive Dynamic Price Formula Sandbox:**
   - Visualisasi rumus harga dinamis proposal:
     $$P(t) = P_{min} + (P_{max} - P_{min}) \times \left(\frac{t_{sisa}}{T_{total}}\right)^\alpha$$
   - Slider interaktif sisa jam umur simpan ($t_{sisa}$) dan koefisien sensitivitas ($\alpha$) dengan kalkulasi diskon real-time.
5. **Radar Armada Subuh Live:**
   - Peta simulasi distribusi subuh (02:00 - 05:30 WIB) Pasar Induk Tanah Tinggi $\to$ Cipondoh $\to$ Serpong $\to$ Bintaro dengan telemetri suhu boks pendingin.
6. **Bidirectional Navigation Bridge:**
   - Setiap layar di dalam direktori `screens/` telah disuntikkan `tangloop-nav.js` sehingga tombol internal layar (Masuk, Onboarding, Detail, Booking, Grading, Override, Tracking) saling terhubung secara otomatis ke layar berikutnya.

---

## 🚀 Cara Menjalankan Prototype

### Opsi 1: Menjalankan Local Development Server (Rekomendasi)
Di terminal PowerShell / CMD pada folder proyek `tangloop`:
```bash
node server.js
```
Lalu buka di browser:
👉 **`http://localhost:3000`**

### Opsi 2: Buka Langsung Berkas File
Buka langsung berkas [index.html](file:///c:/Users/Panji.%20F/tangloop/index.html) menggunakan browser (Chrome, Edge, Firefox, atau Safari).
Semua dependensi Tailwind CSS, ikon Material Symbols, dan font Google dilayani melalui CDN resmi.

