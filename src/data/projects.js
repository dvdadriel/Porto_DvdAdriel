export const projects = [
  {
    slug: 'idx-screener',
    name: 'IdxScreener',
    kicker: 'Rails · PostgreSQL · Solid Queue',
    summary:
      'Screener momentum saham IDX dengan backtesting walk-forward, paper trading, dan alert Telegram. Fokusnya bukan menghasilkan sinyal, tapi mengukur apakah sinyalnya layak dipercaya.',
    highlights: [
      'Backtest walk-forward dengan fee, slippage, dan position sizing',
      'Gate regime IHSG fail-closed dengan histeresis konfirmasi 5 hari',
      'Forward tracking harian — hasilnya tidak bisa diakali sesudahnya',
      'Backup bukti harian ber-rotasi dan watchdog kalau job gagal senyap',
    ],
    metrics: [
      { label: 'Alpha vs IHSG', value: '+24,65%', note: 'jendela 730 hari, buffer 20' },
      { label: 'Profit factor', value: '0,784', note: '16.879 trade paper' },
      { label: 'Test', value: '170', note: 'seluruhnya hijau' },
    ],
    caveat:
      'Profit factor di bawah 1 — kerugian melebihi keuntungan. Sistemnya bekerja; strateginya belum terbukti. Hasil dan batasannya dipublikasikan apa adanya.',
    repo: 'https://github.com/dvdadriel/idx-screener',
    docs: 'https://github.com/dvdadriel/idx-screener/blob/main/docs/backtest-results.md',
    shot: '/shots/idx-screener.png',
  },
  {
    slug: 'news-update',
    name: 'News Update',
    kicker: 'Cloudflare Workers · AI · Cron',
    summary:
      'Bot rangkuman berita harian yang berjalan serverless. RSS multi-sumber media Indonesia, diringkas per kategori oleh model AI, dikirim ke Telegram tiga kali sehari.',
    highlights: [
      'Cron 3×/hari di Cloudflare Workers — tanpa server yang perlu dijaga',
      'Ringkasan per kategori lewat NVIDIA NIM',
      'Dedup lintas-hari memakai Workers KV supaya berita tidak berulang',
      'Dashboard web ber-Basic Auth: digest terakhir, riwayat 7 hari, kirim manual',
    ],
    metrics: [
      { label: 'Jadwal', value: '3×/hari', note: '06.00 · 12.00 · 18.00 WIB' },
      { label: 'Infrastruktur', value: 'nol server', note: 'edge + KV' },
    ],
    caveat: null,
    repo: 'https://github.com/dvdadriel/News-Update',
    docs: null,
    shot: null,
  },
  {
    slug: 'go-courier',
    name: 'Go-Courier',
    kicker: 'Go · gRPC · Microservices',
    summary:
      'Sistem kurir berbasis microservices: empat service gRPC independen, masing-masing dengan HTTP gateway sendiri, autentikasi JWT lewat gRPC interceptor.',
    highlights: [
      'Empat service (auth, order, courier, delivery) + empat gateway HTTP',
      'JWT diverifikasi lokal di setiap service — auth bukan titik tunggal kegagalan',
      'delivery memanggil courier dan order lewat gRPC antar-service',
      'Satu perintah Docker Compose untuk seluruh stack',
    ],
    metrics: [
      { label: 'Service gRPC', value: '4', note: 'plus 4 HTTP gateway' },
      { label: 'CI', value: 'hijau', note: 'build + validasi compose' },
    ],
    caveat:
      'Belum ada test. Untuk sistem dengan empat service dan panggilan antar-service, itu kekurangan terbesarnya — dan dicatat terbuka di README-nya.',
    repo: 'https://github.com/dvdadriel/Go-Courier',
    docs: 'https://github.com/dvdadriel/Go-Courier/blob/main/documentation.md',
    shot: null,
  },
  {
    slug: 'go-foodstore',
    name: 'Go-FoodStore',
    kicker: 'Go · Clean Architecture · Testing',
    summary:
      'REST API pemesanan makanan yang saya jadikan percontohan kualitas: setiap layer punya interface terpisah, sehingga service bisa diuji tanpa database sama sekali.',
    highlights: [
      'Berlapis controller → service → repository, interface terpisah per layer',
      'Unit test dengan stub repository tulis tangan — tanpa library mock',
      'Test membuktikan sebuah method justru TIDAK dipanggil, bukan cuma nilai kembaliannya',
      'Konfigurasi dari environment, bukan hardcoded — bisa jalan di container',
    ],
    metrics: [
      { label: 'Coverage', value: '100%', note: 'layer service dan config' },
      { label: 'Mutasi tertangkap', value: '20/25', note: 'semua mutasi alur kontrol' },
    ],
    caveat:
      'Status HTTP selalu 200 — kode error hanya ada di body JSON. Cacat warisan yang saya dokumentasikan alih-alih sembunyikan; perbaikannya perubahan kontrak untuk setiap endpoint.',
    repo: 'https://github.com/dvdadriel/Go-FoodStore',
    docs: 'https://github.com/dvdadriel/Go-FoodStore/blob/main/docs/Go-FoodStore.postman_collection.json',
    shot: null,
  },
]
