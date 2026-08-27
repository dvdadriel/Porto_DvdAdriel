# Portfolio Project — Design

**Tanggal:** 2026-08-26
**Pemilik:** David Adriel Alvyn (github.com/dvdadriel)

## Konteks

Profil GitHub `dvdadriel` punya 10 repo publik, tapi tidak ada satu pun yang siap
dipajang sebagai portofolio: bio kosong, tanpa foto, tanpa demo live, README banyak
yang masih template default, dan dua repo membocorkan secret ke publik. Beberapa repo
justru merepresentasikan kemampuan lebih rendah dari yang sebenarnya — versi lokal
`News-Update` jauh lebih baik dari versi publiknya dan belum pernah di-push.

Target: melamar posisi **Backend/Fullstack Engineer di pasar Indonesia**.

Hasil akhir yang diinginkan: 4 repo yang benar-benar meyakinkan, plus satu web
portofolio single-page yang animasinya sendiri jadi bukti kemampuan frontend.

## Keputusan yang sudah disepakati

| Topik | Keputusan |
|---|---|
| Target audiens | Backend/Fullstack engineer, pasar Indonesia |
| Project yang dipajang | MarketScreener · News-Update · Go-Courier · Go-FoodStore |
| Purge secret | `git filter-repo` + force push (repo tanpa kontributor lain) |
| Slot ke-4 | Go-FoodStore (bukan TernaKu) |
| Kedalaman test/CI | Go-FoodStore dikerjakan serius sebagai repo percontohan; repo lain cukup CI build/vet |
| Hasil backtest | Dipublikasikan apa adanya + caveat jujur + strategi yang gagal |
| Stack web porto | Vite + React + Tailwind + GSAP ScrollTrigger → Vercel |
| Domain | Subdomain gratis `*.vercel.app` dulu |
| Arah visual | Product Reveal gelap — tipografi besar, pinned scroll, reveal bertahap |

## Biodata

- **Headline:** Fullstack Developer
- **Pengalaman:** Web Developer — 2025–sekarang (Massindo Group)
- **Pendidikan:** Bina Nusantara University, Computer Science, 2021–2025
- **Tech stack:** Go, Ruby/Rails, PHP/Laravel, Python, JavaScript/React, gRPC, PostgreSQL
- **Kontak:** dvdadrielwork@gmail.com
- **Foto:** menyusul → pakai placeholder yang bisa diganti satu file

---

## Workstream A — Pembenahan repo

Dikerjakan lebih dulu. Web porto menampilkan hasil workstream ini, jadi kalau dibalik
urutannya, web-nya akan menautkan repo yang masih rusak.

### A0. Urgent — secret bocor (paling dulu)

1. **Revoke Telegram bot token** di @BotFather — **dikerjakan manual oleh David.**
   `News-Update/.env` di GitHub publik memuat `TELEGRAM_TOKEN` (48 char) dan
   `TELEGRAM_CHAT_ID`. Repo tidak punya `.gitignore`. Purge history **tidak** menarik
   balik salinan yang sudah ter-clone atau ter-index — revoke adalah satu-satunya
   mitigasi yang nyata.
2. **Rotate Laravel `APP_KEY`** di TernaKu (51 char, ter-commit meski `.gitignore` ada).
   Kredensial DB-nya localhost/root sehingga risikonya rendah, tapi tetap dipurge.
3. `git filter-repo` untuk menghapus `.env` (dan `.venv/`, 1.656 file di News-Update)
   dari seluruh history kedua repo, lalu force push.

### A1. MarketScreener — flagship

Masalah utama: **hanya 2 commit** (`initial`, `update readme`) untuk aplikasi Rails
207 file. Terbaca sebagai tidak ada proses pengembangan, dan skenario terburuk memicu
kecurigaan soal kepemilikan kode.

- Pecah kerja yang belum ke-commit di `~/Projects/CryptoScreener` menjadi 8–12 commit
  conventional yang bermakna. Material yang tersedia: `evidence_backup_service.rb`,
  `momentum_gate_evaluator.rb`, `momentum_snapshot_backfill_service.rb`, perubahan di
  10+ service, dan test job. Cukup untuk membangun history yang terbaca.
  History lama **tidak** dipalsukan mundur.
- Satukan penamaan. Saat ini ada tiga nama untuk satu hal: repo `MarketScreener`,
  aplikasi `CryptoRadar`, isi sebenarnya screener saham IDX dengan crypto dimatikan.
- README ulang dengan alur: masalah → arsitektur → **hasil backtest** → cara jalan →
  batasan.
- **Publikasi hasil backtest asli:** equity curve, tabel metrik (return, max drawdown,
  win rate, Sharpe), hasil walk-forward. Disertai caveat terus-terangan soal
  fee/slippage, panjang sampel yang masih pendek, dan strategi yang **gagal**
  (`SqueezeBreakoutService` terbukti rugi untuk saham). Menunjukkan bukti sekaligus
  sadar batas validitasnya sendiri adalah pembeda terkuat di portofolio ini.
- Screenshot dashboard dan alert Telegram.
- LICENSE (MIT).

### A2. Go-FoodStore — repo percontohan kualitas

Kondisi awal: 39 file, 1 commit, **tanpa README, `.gitignore`, `.env.example`, test,
maupun CI**. Orang membuka repo ini tidak punya cara tahu bagaimana menjalankannya.

Modalnya justru bagus: setiap layer (controller/service/repository) sudah punya
interface + implementasi terpisah, ada custom exception handler dan DI manual. Artinya
unit test bisa masuk tanpa refactor.

- README dari nol: arsitektur berlapis, struktur folder, cara jalan, contoh request.
- `.gitignore`, `.env.example`, `Dockerfile`, `docker-compose.yml` (PostgreSQL) —
  target: clone → satu perintah → jalan.
- **Table-driven unit test + mock repository untuk setiap service**, plus coverage report.
- GitHub Actions: `go test ./... && go vet ./...` + badge di README.
- Postman collection.
- LICENSE (MIT).

### A3. News-Update — serverless + AI

Versi publik masih script Python dengan `.venv/` ter-commit. Versi lokal jauh lebih
baik dan belum di-push: Cloudflare Workers, cron 3×/hari, RSS multi-sumber, ringkasan
per kategori via NVIDIA NIM, dedup lintas-hari via Workers KV, dan dashboard web
ber-Basic Auth. Commit `5d442cb` (gitignore + untrack secrets/venv) sudah ada secara
lokal, tinggal dikirim.

- Push versi Cloudflare Workers setelah A0 selesai.
- README + screenshot dashboard.
- CI lint.
- LICENSE (MIT).

### A4. Go-Courier — microservices

Repo dengan README paling rapi dari keempatnya, dan satu-satunya yang sudah punya
`docker-compose.yml`.

- **Kredit kontributor tim + peran David secara eksplisit.** History memuat
  `Merge branch 'main' of github.com/KecoaxBunting/Go-Courier` — ini project tim.
  Kerja tim adalah nilai plus, tapi kalau tidak disebut lalu ketahuan saat interview,
  justru merusak kepercayaan.
- Diagram arsitektur gRPC (Mermaid): 3 service + gateway.
- Perbaiki `DockerFile` → `Dockerfile` (aman di macOS, bisa gagal di Linux
  case-sensitive).
- Contoh request per endpoint.
- CI build.
- LICENSE (MIT).

### A5. Profil GitHub

- Isi bio, foto, lokasi.
- Pin 4 repo di atas.
- Arsipkan `ADEX-LEGEND` (CSS statis) dan `PMB-Website-main` (kosong); hapus fork
  `VondTutor`.
- `Apple-Clone-Website` dan `gsap_mojito` tetap publik tapi tidak di-pin, dan
  README-nya dikoreksi agar menyebut jelas bahwa keduanya latihan mengikuti tutorial.
  README saat ini masih template Vite default. Jujur lebih baik daripada ambigu —
  recruiter mengenali clone Apple.

---

## Workstream B — Web portofolio

Satu halaman panjang, scroll-driven, dengan animasi sebagai daya tarik utama. Web-nya
sendiri berfungsi sebagai bukti kemampuan frontend, sehingga tidak perlu memajang
Apple-Clone atau gsap_mojito sebagai project.

### Stack

Vite + React + Tailwind + GSAP ScrollTrigger, deploy ke Vercel.

Dipilih karena David sudah terbukti memakai Vite + React + GSAP (dan model `.glb`)
di dua repo sebelumnya — efek maksimal dengan risiko teknis minimal.

Data project disimpan di satu file array. Tanpa CMS, tanpa backend, tanpa router —
halamannya cuma satu.

### Struktur section

1. **Hero** — nama + "Fullstack Developer", animasi masuk.
2. **Professional Work** — Massindo Group.
   *Ditempatkan di atas side project: ini kerja profesional berbayar, bukti paling
   meyakinkan untuk "Web Developer 2025–now".*

   Dibangun dalam dua tahap karena bergantung pada izin (lihat "Batasan menampilkan
   pekerjaan Massindo" di bawah):
   - **Tahap 1 (default, tanpa izin):** generik — "Web Developer, Massindo Group,
     2025–now" dengan deskripsi jenis pekerjaan, tanpa menyebut brand.
   - **Tahap 2 (setelah izin turun):** nama brand + peran + link ke situs live
     (Therapedic, Comforta, Sleep Center, Dr. Rest, Purefoam, dll).

   Strukturnya dibuat agar tahap 2 hanya perlu mengisi data, bukan mengubah komponen.
3. **Projects** — 4 project, masing-masing satu pinned scroll section.
   MarketScreener dapat porsi terpanjang karena memuat hasil backtest.
4. **Tech Stack** — Go, Ruby/Rails, PHP/Laravel, Python, JS/React, gRPC, PostgreSQL.
5. **About** — Bina Nusantara University, Computer Science, 2021–2025.
6. **Contact** — dvdadrielwork@gmail.com.

### Arah visual

Product Reveal gelap: tipografi besar, ruang napas banyak, pinned scroll dengan reveal
bertahap, palet gelap dev-native. Equity curve MarketScreener digambar progresif
mengikuti scroll.

### Aksesibilitas dan ketahanan

- Semua animasi menghormati `prefers-reduced-motion` (via `gsap.matchMedia()`).
- Konten tetap terbaca tanpa bergantung pada JS-driven reveal — tidak ada informasi
  yang hanya muncul setelah animasi berjalan.
- Placeholder foto dibuat sedemikian sehingga penggantiannya hanya menyentuh satu file.

### Batasan menampilkan pekerjaan Massindo

Kode yang ditulis sebagai karyawan adalah milik perusahaan (work-for-hire). Karena itu:

**Boleh:** link ke situs live yang sudah publik · screenshot halaman publik · menyebut
nama brand dan peran yang akurat.

**Tidak boleh:** publish source code — ~15 repo di `~/Documents/Project_Massindo`
**tetap privat** · screenshot area internal (dashboard admin, data pelanggan, angka
penjualan, CMS, analytics) · klaim peran yang berlebihan, mis. "designed & built from
scratch" untuk situs yang sudah ada sebelum David masuk · memakai logo brand dengan
cara yang terbaca sebagai endorsement (tampilkan screenshot situs, bukan deretan logo).

Inilah sebabnya section Professional Work hanya menautkan situs live, bukan repo GitHub.

**Prasyarat tahap 2:** David meminta izin tertulis ke atasan (chat/email satu paragraf)
dan memeriksa klausa kerahasiaan di kontrak kerjanya. Ini bukan nasihat hukum dan
kontraknya belum diperiksa. Sekalian minta testimonial / rekomendasi LinkedIn — bobotnya
di CV lebih besar daripada section project mana pun.

## Urutan eksekusi

1. **A0** — revoke token (David, manual) → purge history → force push
2. **A1** — MarketScreener: commit, README, backtest, screenshot
3. **A2** — Go-FoodStore: README, Docker, test, CI
4. **A3** — News-Update: push versi Cloudflare, README
5. **A4** — Go-Courier: diagram, kredit tim, fix casing
6. **A5** — profil GitHub
7. **B** — web portofolio

Alasan urutan: web porto menautkan repo hasil workstream A, jadi A harus selesai lebih
dulu. Di dalam A, A0 didahulukan karena secret yang bocor adalah satu-satunya item
yang risikonya bertambah seiring waktu.

## Verifikasi

- **A0:** `git log --all --full-history -- .env` tidak mengembalikan apa pun di kedua
  repo; token lama ditolak saat dicoba ke API Telegram.
- **A1:** backtest dijalankan lokal dan angka di README cocok dengan output aktual.
- **A2:** `docker compose up` dari clone bersih → API merespons; `go test ./...` hijau;
  CI hijau di GitHub.
- **A3:** worker ter-deploy, dashboard bisa diakses, cron terkirim.
- **A4:** `docker compose up` jalan di Linux (casing terbukti benar).
- **B:** Lighthouse dijalankan pada build produksi; halaman dicek dengan
  `prefers-reduced-motion: reduce` aktif; dicek di viewport mobile.

## Yang sengaja tidak dikerjakan

- **TernaKu** tidak dipajang (kode 2023, naming controller lowercase, Laravel 10),
  tapi `.env`-nya tetap dipurge dan `APP_KEY` dirotasi karena itu isu keamanan.
- **Tidak ada test di Go-Courier, News-Update, MarketScreener** di luar yang sudah ada.
  Satu repo dengan test yang sungguh-sungguh lebih meyakinkan daripada empat repo yang
  masing-masing punya satu test asal ada.
- **Tanpa custom domain** dulu. Bisa ditambahkan nanti tanpa mengubah kode.
- **Tanpa CMS, tanpa backend, tanpa dark/light toggle** untuk web porto — halamannya
  satu dan temanya sudah gelap.
</content>
