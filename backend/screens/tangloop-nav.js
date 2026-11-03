/**
 * TANG-LOOP Interactive Prototype Navigation & State Bridge
 * Menghubungkan seluruh 16 layar Stitch secara end-to-end
 */

(function () {
  // Daftar 16 Layar: Onboarding dulu baru Sign-in / Masuk
  const SCREENS_MANIFEST = [
    { index: 1,  slug: "02-pengguna-normal-onboarding-interaktif", title: "Pengguna Normal - Onboarding Interaktif", role: "Onboarding & Pengenalan Persona", id: "94d6da470f3547b0820cf374b374efad" },
    { index: 2,  slug: "01-pengguna-normal-login-masuk", title: "Pengguna Normal - Login & Masuk", role: "Sign In / Sign Up Cepat (WA/Google)", id: "194c99e3b6dc42239572cc4c46dcd81f" },
    { index: 3,  slug: "05-layar-2-posting-grading-ai", title: "Layar 2: Posting & Grading AI", role: "Pemasok Lapak Tanah Tinggi", id: "c354b2ceb2374800ba9d50993ce482a9" },
    { index: 4,  slug: "13-layar-4-rekomendasi-rute-ai-router", title: "Layar 4: Rekomendasi Rute AI (Router)", role: "Valorization Router AI", id: "78dfa955d175446c88ad9debe76de73f" },
    { index: 5,  slug: "10-verifikator-login-petugas", title: "Verifikator - Login Petugas", role: "Petugas Tera & Mutu Pasar", id: "53b78e3a21f843feaebd4402cb8abdbd" },
    { index: 6,  slug: "11-verifikator-onboarding-sop", title: "Verifikator - Onboarding SOP", role: "SOP Pengujian Organoleptik", id: "ef927e785f9f4f059704e93fe59c790e" },
    { index: 7,  slug: "09-verifikator-antrean-verifikasi", title: "Verifikator - Antrean Verifikasi", role: "Human-in-the-Loop AI Queue", id: "fa34f05105104632b46eac6c765ad0fb" },
    { index: 8,  slug: "12-verifikator-detail-inspeksi-override", title: "Verifikator - Detail Inspeksi & Override", role: "Inspeksi & Override Mutu", id: "735b953f047846cabcfef59fdb8b5ab3" },
    { index: 9,  slug: "03-layar-1-beranda-lot-tang-loop", title: "Layar 1: Beranda Lot TANG-LOOP", role: "Pembeli B2B / Warteg", id: "a7b2f7d11877471d851ac8959de7cb6a" },
    { index: 10, slug: "04-layar-3-detail-lot-harga-dinamis", title: "Layar 3: Detail Lot & Harga Dinamis", role: "Kalkulator Harga Dinamis", id: "67208ab8cb27483492adca9e76159a25" },
    { index: 11, slug: "08-profil-pemasok-lapak-pasar-induk", title: "Profil Pemasok Lapak Pasar Induk", role: "Reputasi Lapak Tanah Tinggi", id: "e6141fd9ba8f40388794320e0c1d26cb" },
    { index: 12, slug: "14-layar-5-jadwal-pickup-logistik-subuh", title: "Layar 5: Jadwal Pickup & Logistik Subuh", role: "Logistik Subuh (02:00-06:00)", id: "3cba9ece72e44c868169c847bd4a2543" },
    { index: 13, slug: "06-pelacakan-langsung-armada-subuh", title: "Pelacakan Langsung Armada Subuh", role: "Live GPS & Suhu Kompartemen", id: "9c9742cbc3fc40af9b51765e0cdb7f93" },
    { index: 14, slug: "07-unduh-bukti-mutu-surat-jalan-digital", title: "Unduh Bukti Mutu & Surat Jalan Digital", role: "Manifest & QR Code Resmi", id: "cfa5c14a2b4844a0ac94f781e11a337f" },
    { index: 15, slug: "15-layar-6-dasbor-dampak-keberlanjutan", title: "Layar 6: Dasbor Dampak Keberlanjutan", role: "Metrik ESG & SDG 2, 11, 12", id: "f3905f2aa5c848ef9e9a46001c39ba36" },
    { index: 16, slug: "16-layar-7-profil-pengguna-riwayat-pesanan", title: "Layar 7: Profil Pengguna & Riwayat Pesanan", role: "Riwayat Transaksi & Akun", id: "87574b18b3214871a173d9fcc1d79ef6" }
  ];

  // Identifikasi Layar Saat Ini
  const currentPath = window.location.pathname;
  let currentScreen = null;
  for (const s of SCREENS_MANIFEST) {
    if (currentPath.includes(s.slug)) {
      currentScreen = s;
      break;
    }
  }

  // Notifikasi ke parent frame saat layar selesai dimuat
  if (currentScreen && window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'TANG_LOOP_SCREEN_LOADED',
      slug: currentScreen.slug,
      index: currentScreen.index
    }, '*');
  }

  // Helper Navigasi Terpadu
  function navigateTo(targetSlug) {
    const targetFile = targetSlug.endsWith('.html') ? targetSlug : targetSlug + '.html';
    
    // Kirim sinyal ke parent frame jika berada di dalam iframe master shell
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'TANG_LOOP_NAV',
        targetSlug: targetSlug.replace('.html', '')
      }, '*');
    }

    // Navigasi lokal di dalam frame atau tab
    window.location.href = targetFile;
  }

  // Inisialisasi setelah DOM siap
  document.addEventListener('DOMContentLoaded', function () {
    const isInsideIframe = window.parent && window.parent !== window;
    if (!isInsideIframe) {
      injectMinimalStandalonePill();
    }
    
    bindInteractiveButtons();
  });

  // Tampilkan pill minimalis HANYA jika file dibuka langsung tanpa index.html
  function injectMinimalStandalonePill() {
    if (!currentScreen) return;

    const currIdx = SCREENS_MANIFEST.findIndex(s => s.slug === currentScreen.slug);
    const prevScreen = currIdx > 0 ? SCREENS_MANIFEST[currIdx - 1] : null;
    const nextScreen = currIdx < SCREENS_MANIFEST.length - 1 ? SCREENS_MANIFEST[currIdx + 1] : null;

    const pill = document.createElement('div');
    pill.id = 'tangloop-nav-pill';
    pill.className = 'fixed bottom-4 right-4 z-[99999] flex items-center gap-1.5 bg-slate-900/90 text-slate-100 px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs select-none';

    let html = `
      <a href="../index.html" title="Kembali ke App Utama" class="flex items-center gap-1 text-emerald-400 font-bold pr-2 border-r border-slate-700 transition">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>App</span>
      </a>
      <span class="text-slate-300 font-mono text-[11px] px-1">${currIdx + 1}/16</span>
    `;

    if (prevScreen) {
      html += `
        <button id="tl-btn-prev" class="p-1 rounded hover:bg-slate-800 text-slate-300 transition flex items-center">
          <span class="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>
      `;
    }

    if (nextScreen) {
      html += `
        <button id="tl-btn-next" class="p-1 rounded hover:bg-slate-800 text-slate-300 transition flex items-center">
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      `;
    }

    pill.innerHTML = html;
    document.body.appendChild(pill);

    if (prevScreen) {
      document.getElementById('tl-btn-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateTo(prevScreen.slug);
      });
    }
    if (nextScreen) {
      document.getElementById('tl-btn-next').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateTo(nextScreen.slug);
      });
    }
  }

  // Wire up tombol & interaksi spesifik per layar
  function bindInteractiveButtons() {
    if (!currentScreen) return;
    const slug = currentScreen.slug;

    // Global: Back buttons
    document.querySelectorAll('button[aria-label="Kembali"], button span:contains("arrow_back")').forEach(btn => {
      btn.addEventListener('click', () => {
        const currIdx = SCREENS_MANIFEST.findIndex(s => s.slug === currentScreen.slug);
        if (currIdx > 0) {
          navigateTo(SCREENS_MANIFEST[currIdx - 1].slug);
        }
      });
    });

    // 01: Onboarding Interaktif (Tahap 1 Sekarang)
    if (slug === '02-pengguna-normal-onboarding-interaktif') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Mulai Sekarang') || btn.innerText.includes('Masuk') || btn.innerText.includes('Lewati')) {
          btn.addEventListener('click', () => {
            // Setelah onboarding, lanjut ke Login & Masuk (Sign in / Sign up)
            navigateTo('01-pengguna-normal-login-masuk');
          });
        }
        if (btn.innerText.includes('WhatsApp')) {
          btn.addEventListener('click', () => {
            navigateTo('01-pengguna-normal-login-masuk');
          });
        }
      });
    }

    // 02: Login & Masuk (Tahap 2 Sekarang)
    if (slug === '01-pengguna-normal-login-masuk') {
      const btnOtp = document.getElementById('btnOtpText');
      if (btnOtp) {
        btnOtp.closest('button').addEventListener('click', () => {
          setTimeout(() => navigateTo('03-layar-1-beranda-lot-tang-loop'), 600);
        });
      }
      // Link Google Bisnis & Petugas
      document.querySelectorAll('button, a').forEach(el => {
        if (el.innerText.includes('Google Bisnis') || el.innerText.includes('Daftar')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('03-layar-1-beranda-lot-tang-loop');
          });
        }
        if (el.innerText.includes('Petugas') || el.innerText.includes('Verifikator')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('10-verifikator-login-petugas');
          });
        }
      });
    }

    // 03: Beranda Lot
    if (slug === '03-layar-1-beranda-lot-tang-loop') {
      document.querySelectorAll('a, button').forEach(el => {
        if (el.innerText.includes('Detail') || el.closest('[class*="group"]')) {
          el.addEventListener('click', (e) => {
            if (!el.innerText.includes('Semua') && !el.innerText.includes('Konsumsi') && !el.innerText.includes('Pengolahan')) {
              e.preventDefault();
              navigateTo('04-layar-3-detail-lot-harga-dinamis');
            }
          });
        }
      });
    }

    // 04: Detail Lot & Harga Dinamis
    if (slug === '04-layar-3-detail-lot-harga-dinamis') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Ambil Lot') || btn.innerText.includes('Booking') || btn.innerText.includes('Rp375.000')) {
          btn.addEventListener('click', () => {
            navigateTo('14-layar-5-jadwal-pickup-logistik-subuh');
          });
        }
      });
    }

    // 05: Posting & Grading AI
    if (slug === '05-layar-2-posting-grading-ai') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Setuju & Posting') || btn.innerText.includes('Posting')) {
          btn.addEventListener('click', () => {
            navigateTo('13-layar-4-rekomendasi-rute-ai-router');
          });
        }
      });
    }

    // 06: Pelacakan Armada Subuh
    if (slug === '06-pelacakan-langsung-armada-subuh') {
      document.querySelectorAll('button, a').forEach(el => {
        if (el.innerText.includes('Surat Jalan')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('07-unduh-bukti-mutu-surat-jalan-digital');
          });
        }
      });
    }

    // 07: Surat Jalan & Bukti Mutu
    if (slug === '07-unduh-bukti-mutu-surat-jalan-digital') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Dampak') || btn.innerText.includes('Bagikan')) {
          btn.addEventListener('click', () => {
            navigateTo('15-layar-6-dasbor-dampak-keberlanjutan');
          });
        }
      });
    }

    // 08: Profil Pemasok
    if (slug === '08-profil-pemasok-lapak-pasar-induk') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Tambah Lot') || btn.innerText.includes('via AI')) {
          btn.addEventListener('click', () => {
            navigateTo('05-layar-2-posting-grading-ai');
          });
        }
        if (btn.innerText.includes('Mode Pembeli')) {
          btn.addEventListener('click', () => {
            navigateTo('03-layar-1-beranda-lot-tang-loop');
          });
        }
      });
    }

    // 09: Antrean Verifikasi
    if (slug === '09-verifikator-antrean-verifikasi') {
      document.querySelectorAll('[class*="cursor-pointer"], [class*="rounded-xl"]').forEach(card => {
        if (card.innerText.includes('Tomat') || card.innerText.includes('Ampas') || card.innerText.includes('Caisim')) {
          card.addEventListener('click', () => {
            navigateTo('12-verifikator-detail-inspeksi-override');
          });
        }
      });
    }

    // 10: Login Petugas
    if (slug === '10-verifikator-login-petugas') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Masuk') || btn.innerText.includes('Mulai Shift')) {
          btn.addEventListener('click', () => {
            navigateTo('11-verifikator-onboarding-sop');
          });
        }
      });
    }

    // 11: Onboarding SOP
    if (slug === '11-verifikator-onboarding-sop') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Mulai Tugas')) {
          btn.addEventListener('click', () => {
            navigateTo('09-verifikator-antrean-verifikasi');
          });
        }
      });
    }

    // 12: Detail Inspeksi & Override
    if (slug === '12-verifikator-detail-inspeksi-override') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Simpan') || btn.innerText.includes('Konfirmasi') || btn.innerText.includes('Grade-B')) {
          btn.addEventListener('click', () => {
            setTimeout(() => navigateTo('09-verifikator-antrean-verifikasi'), 500);
          });
        }
      });
    }

    // 13: Rekomendasi Rute AI
    if (slug === '13-layar-4-rekomendasi-rute-ai-router') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Terapkan') || btn.innerText.includes('Rute')) {
          btn.addEventListener('click', () => {
            navigateTo('14-layar-5-jadwal-pickup-logistik-subuh');
          });
        }
      });
    }

    // 14: Jadwal Pickup
    if (slug === '14-layar-5-jadwal-pickup-logistik-subuh') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Konfirmasi') || btn.innerText.includes('Kirim')) {
          btn.addEventListener('click', () => {
            navigateTo('06-pelacakan-langsung-armada-subuh');
          });
        }
      });
    }

    // 15: Dasbor Dampak
    if (slug === '15-layar-6-dasbor-dampak-keberlanjutan') {
      document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Ekspor') || btn.innerText.includes('Bappeda')) {
          btn.addEventListener('click', () => {
            alert('Laporan Dampak ESG & Pengalihan Sampah Pangan siap diekspor ke PDF untuk Pemkot Tangerang & DLH!');
          });
        }
      });
    }

    // 16: Profil & Riwayat Pesanan
    if (slug === '16-layar-7-profil-pengguna-riwayat-pesanan') {
      document.querySelectorAll('[class*="rounded-xl"]').forEach(el => {
        if (el.innerText.includes('Ampas Tahu') || el.innerText.includes('Tomat Ceri') || el.innerText.includes('INV-')) {
          el.addEventListener('click', () => {
            navigateTo('07-unduh-bukti-mutu-surat-jalan-digital');
          });
        }
      });
    }

    // Global Bottom Nav Bars across screens
    document.querySelectorAll('a[href="#"], button').forEach(el => {
      const text = el.innerText.toLowerCase();
      if (text.includes('lot') || text.includes('beranda')) {
        el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('03-layar-1-beranda-lot-tang-loop'); });
      } else if (text.includes('unggah') || text.includes('posting')) {
        el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('05-layar-2-posting-grading-ai'); });
      } else if (text.includes('rute')) {
        el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('13-layar-4-rekomendasi-rute-ai-router'); });
      } else if (text.includes('logistik')) {
        el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('14-layar-5-jadwal-pickup-logistik-subuh'); });
      } else if (text.includes('dampak')) {
        el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('15-layar-6-dasbor-dampak-keberlanjutan'); });
      } else if (text.includes('profil')) {
        el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('16-layar-7-profil-pengguna-riwayat-pesanan'); });
      }
    });
  }

  // Export global function
  window.tangloopNavigate = navigateTo;
})();
