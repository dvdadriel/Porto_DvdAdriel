# PRODUCT.md

## Apa ini

Portofolio pribadi **David Adriel Alvyn** — fullstack developer di Jakarta, Web
Developer di Massindo Group. Satu halaman, dua bahasa (ID default, EN), tanpa
backend.

**Register: brand.** Desain di sini *adalah* produknya. Situs ini tidak melayani
pekerjaan lain; ia sendiri yang dinilai.

## Untuk siapa

Recruiter dan engineering lead di Jakarta, membuka tautan dari LinkedIn, sering
lewat HP, siang hari, kadang di luar ruangan. Mereka memindai cepat dan
memutuskan dalam hitungan detik apakah orang ini layak diajak bicara.

Konsekuensi yang mengikat seluruh desain:

- **Terang sebagai default.** Dark mode elegan di studio dan kalah di layar 500
  nit kena matahari.
- **Mobile bukan versi ciut.** Mayoritas kunjungan pertama datang dari HP.
- **Berat halaman adalah argumen.** Salah satu klaim di situs ini adalah optimasi
  Core Web Vitals; situs yang lambat membantahnya sendiri.

## Pekerjaan yang dilakukan halaman ini

1. Menjawab "siapa ini dan apa yang bisa dia bikin" dalam satu layar.
2. Membuktikannya dengan aplikasi yang benar-benar berjalan, bukan mockup.
3. Membuat orang mengambil satu langkah: email atau WhatsApp.

## Premis isi

Baca `src/data/projects.js`. Setiap project punya `metrics` **dan** `caveat`:

- IdxScreener: alpha +24,65% — dan profit factor 0,784, yang artinya rugi.
- Go-Courier: empat service gRPC — dan "belum ada test", ditulis terbuka.
- Go-FoodStore: coverage 100% — dan semua HTTP status 200, cacat warisan yang
  didokumentasikan alih-alih disembunyikan.

Batasan yang dipublikasikan adalah hal paling langka di portofolio developer.
Karena itu **caveat punya warnanya sendiri dan posisi setara dengan metrik**,
bukan catatan kecil di bawah. Kalau sebuah usulan desain menyembunyikan atau
memperkecil caveat, usulan itu melawan premis situs.

## Struktur

| # | Section | Isi |
|---|---|---|
| — | Hero | Pernyataan besar + carousel aplikasi yang hidup |
| 01 | Tentang | Foto, biodata, dua accordion (latar belakang, cara kerja) |
| 02 | Pengalaman | Massindo Group + sembilan situs dengan pratinjau saat hover |
| 03 | Project | Empat record accordion, masing-masing metrik + batasan |
| 04 | Stack | Empat baris inventaris |
| — | Kontak | Empat baris kontak + tombol salin email |

## Sumber data

Semua konten hidup di `src/data/`:

- `translations.js` — seluruh teks ID dan EN. String baru **wajib** masuk kedua
  bahasa sekaligus, jangan ditunda.
- `projects.js` — slug dan URL project. URL sengaja tidak disimpan di
  `translations.js`: URL bukan konten terjemahan, dan menyimpannya per-bahasa
  berarti dua salinan yang bisa berbeda diam-diam, lalu satu bahasa menunjuk
  domain mati tanpa ada yang sadar.
- `work.js` — Massindo dan sembilan brand-nya, termasuk `slug` untuk pratinjau.
- `profile.js` — email, telepon, tautan sosial.

## Batasan yang tidak dinegosiasikan

- **Kode Massindo milik perusahaan.** Situs ini hanya menautkan ke domain
  publiknya dan menyatakan itu terbuka. Tidak ada cuplikan kode klien.
- **Tidak ada screenshot yang dibuat-buat.** Tangkapan layar diambil dari domain
  yang benar-benar berjalan. Kalau angkanya jelek hari itu, ya itu angkanya.
- **Tidak ada backend.** Tombol yang butuh server tidak dipasang.

## Status

Rombak "The Ledger" dikerjakan di branch `redesign-ledger`. `main` belum
disentuh. Rencana dan catatan riset ada di `docs/porto-redesign-plan.md` dan
`docs/porto-redesign-assets.md` (keduanya tidak ter-commit — `docs/` masuk
`.gitignore`).

**Belum selesai:** record Weblyzer (project ke-5), output teks Go-Courier dan
Go-FoodStore, OG image baru.

**Perlu diperiksa:** metrik IdxScreener di `translations.js` (+24,65% / profit
factor 0,784) tidak lagi cocok dengan yang tampil di dashboard live (alpha
−5,97% / profit factor 0,61 saat terakhir dicek, 14 Sep 2026). Di situs yang
premisnya angka bisa diperiksa, selisih itu adalah masalah.
