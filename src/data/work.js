export const work = [
  {
    company: 'Massindo Group',
    role: 'Web Developer',
    period: '2025 – sekarang',
    summary:
      'Mengembangkan dan memelihara situs untuk sembilan brand di bawah satu grup — pengerjaan fitur, perbaikan, dan pemeliharaan berkelanjutan di lingkungan produksi yang sedang dipakai.',
    doing: [
      'Pengembangan dan pemeliharaan situs multi-brand',
      'Pengerjaan fitur dan perbaikan pada sistem yang sudah berjalan',
      'Deployment dan konfigurasi server',
    ],
    // Tautan ke situs publik. Kode-nya milik perusahaan dan TIDAK dipublikasikan
    // — itu batas yang membedakan "menampilkan pekerjaan" dari "membocorkan aset".
    //
    // `slug` menunjuk tangkapan layar di /brands, dipakai sebagai pratinjau saat
    // hover. Diambil sendiri, bukan dari og:image: dua dari sembilan situs tidak
    // punya tag itu dan satu menunjuk domain staging, jadi og:image menghasilkan
    // sembilan gambar yang ukurannya tidak seragam.
    clients: [
      { slug: 'massindo', brand: 'Massindo',     url: 'https://massindo.com' },
      { slug: 'sleepcenter', brand: 'Sleep Center', url: 'https://sleepcenter.co.id' },
      { slug: 'sleepspa', brand: 'Sleep Spa',    url: 'https://sleepspatech.com' },
      { slug: 'springair', brand: 'Spring Air',   url: 'https://springair.co.id' },
      { slug: 'therapedic', brand: 'Therapedic',   url: 'https://therapedic.co.id' },
      { slug: 'comforta', brand: 'Comforta',     url: 'https://comforta.co.id' },
      { slug: 'isleep', brand: 'iSleep',       url: 'https://isleep.co.id' },
      { slug: 'purefoam', brand: 'Purefoam',     url: 'https://purefoam.co.id' },
      { slug: 'drrest', brand: 'Dr. Rest',     url: 'https://drrest.co.id' },
    ],
    note:
      'Kode milik perusahaan, jadi tidak dipublikasikan. Tautan menuju situs publiknya.',
  },
]
