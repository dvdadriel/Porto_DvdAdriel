# Portfolio Web Implementation Plan (Workstream B)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Satu halaman portofolio scroll-driven yang animasinya sendiri menjadi bukti kemampuan frontend, menautkan empat repo hasil Workstream A, dan menempatkan kerja profesional Massindo di atas side project.

**Architecture:** Vite + React SPA satu halaman tanpa router, tanpa backend, tanpa CMS. Seluruh konten berada di tiga file data (`profile.js`, `work.js`, `projects.js`) sehingga menambah project atau mengganti foto tidak menyentuh komponen. Animasi lewat GSAP ScrollTrigger, dibungkus `gsap.matchMedia()` supaya `prefers-reduced-motion` dihormati di satu tempat. Deploy statis ke Vercel.

**Tech Stack:** Vite 7 · React 19 · Tailwind CSS v4 (`@tailwindcss/vite`) · GSAP + `@gsap/react` · Vercel

**Spec:** `docs/superpowers/specs/2026-08-26-porto-design.md`

---

## Kondisi awal yang sudah terverifikasi

Diperiksa 2026-08-26, jangan diasumsikan ulang:

| Fakta | Nilai |
|---|---|
| `node` / `npm` | v26.6.0 / 11.18.0 ✓ |
| `~/Documents/Other Project/Porto` | hanya berisi `.claude/` dan `docs/` — **belum git repo** |
| `vercel` CLI | **belum terpasang** |
| Pengalaman stack | `Apple-Clone-Website` sudah memakai `@tailwindcss/vite`, `@gsap/react`, `gsap` — stack ini bukan hal baru |
| Repo Massindo lokal | ~15 di `~/Documents/Project_Massindo` (comforta, dr_rest, isleep, massindogroup, purefoam, sleepcenter, thera, therapedicnew, therasg, dll) |
| Izin menyebut brand Massindo | **BELUM ADA** — bangun versi generik, lihat Task 5 |

### Hasil Workstream A yang ditautkan web ini

Semua angka di bawah sudah terverifikasi dan terpublikasi. **Jangan mengarang angka baru.**

| Repo | URL | Fakta yang dipakai di web |
|---|---|---|
| **idx-screener** | `github.com/dvdadriel/idx-screener` | Rails 8.1 · PostgreSQL · Solid Queue · 170 test · walk-forward terbaik: alpha **+24,65%** vs IHSG (730d, buffer 20) · paper trading profit factor **0,784** dari 16.879 trade · screenshot ada di `docs/images/dashboard.png` |
| **News-Update** | `github.com/dvdadriel/News-Update` | Cloudflare Workers · cron 3×/hari · RSS multi-sumber + ringkasan NVIDIA NIM · dedup Workers KV · dashboard Basic Auth |
| **Go-Courier** | `github.com/dvdadriel/Go-Courier` | 4 service gRPC + 4 HTTP gateway · PostgreSQL · JWT lewat gRPC interceptor · Docker Compose · CI hijau. **Karya perorangan — BUKAN project tim** |
| **Go-FoodStore** | `github.com/dvdadriel/Go-FoodStore` | Go 1.24 · arsitektur berlapis · **coverage 100%** di layer service · 20/25 mutasi tertangkap · Docker Compose · Postman 21 request · CI hijau |

### Biodata

- **Headline:** Fullstack Developer
- **Pengalaman:** Web Developer — 2025–sekarang, Massindo Group
- **Pendidikan:** Bina Nusantara University, Computer Science, 2021–2025
- **Stack:** Go, Ruby/Rails, PHP/Laravel, Python, JavaScript/React, gRPC, PostgreSQL
- **Kontak:** dvdadrielwork@gmail.com
- **Foto:** menyusul → placeholder yang penggantiannya menyentuh satu file

---

## File Structure

```
Porto/
├── index.html                  entry Vite, <html lang="id">, meta OG
├── package.json
├── vite.config.js              plugin react + tailwind
├── vercel.json                 SPA, header cache aset
├── .gitignore
├── public/
│   ├── avatar.svg              PLACEHOLDER — ganti file ini saja
│   └── shots/                  screenshot project
└── src/
    ├── main.jsx                mount React
    ├── App.jsx                 susunan section, tidak ada logika lain
    ├── index.css               Tailwind + design token
    ├── data/
    │   ├── profile.js          nama, headline, pendidikan, kontak, stack
    │   ├── work.js             pengalaman profesional (2 tahap, lihat Task 5)
    │   └── projects.js         4 project + angka terverifikasi
    ├── lib/
    │   └── motion.js           SATU tempat semua aturan gsap + reduced-motion
    ├── components/
    │   ├── Reveal.jsx          pembungkus reveal saat scroll, dipakai ulang
    │   ├── SectionHeading.jsx
    │   └── Pill.jsx            chip tech stack
    └── sections/
        ├── Hero.jsx
        ├── ProfessionalWork.jsx
        ├── Projects.jsx        map projects.js → ProjectPanel
        ├── ProjectPanel.jsx    satu project, kolom kiri sticky
        ├── TechStack.jsx
        ├── About.jsx
        └── Contact.jsx
```

**Alasan pembagian ini:** konten dan presentasi dipisah total. Menambah project = menyunting satu array. Mengganti foto = menimpa satu file. Semua aturan animasi dan `prefers-reduced-motion` ada di `lib/motion.js`, jadi tidak ada komponen yang bisa diam-diam melanggarnya. `ProjectPanel` dipisah dari `Projects` karena panel-nya kompleks (sticky + reveal berlapis) sementara `Projects` hanya melakukan map.

---

## Prinsip yang tidak boleh dilanggar

Dilanggar = task gagal, bukan sekadar catatan review.

1. **Konten harus terbaca tanpa JavaScript berjalan.** Jangan pernah menulis `opacity: 0` di CSS lalu mengandalkan GSAP untuk memunculkannya. Pakai `gsap.from()` yang menetapkan state awal saat runtime. Kalau JS gagal atau lambat, teks tetap terlihat.
2. **`prefers-reduced-motion` dihormati.** Semua ScrollTrigger didaftarkan di dalam `gsap.matchMedia()`. Pada reduced-motion tidak ada gerak sama sekali. Efek menempel dikerjakan CSS `position: sticky`, yang aman karena tidak menganimasikan apa pun.
3. **Tidak ada angka yang dikarang.** Setiap angka di `projects.js` harus bisa ditelusuri ke tabel "Hasil Workstream A" di atas.
4. **Tidak ada nama brand Massindo** sampai izin turun (Task 5).
5. **Tidak ada dependensi di luar yang disebut plan ini.** Tanpa library UI, tanpa animation library kedua, tanpa icon pack (pakai SVG inline atau emoji).

---

## Task 1: Scaffold project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Init git dan scaffold Vite**

`Porto/` sudah berisi `docs/` dan `.claude/` yang harus dipertahankan, jadi jangan pakai `npm create vite@latest .` yang menolak direktori tidak kosong — buat file-nya manual.

```bash
cd "/Users/david/Documents/Other Project/Porto"
git init
npm init -y
npm install react react-dom gsap @gsap/react
npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: `package.json` — ganti bagian scripts**

```json
{
  "name": "porto",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Pertahankan blok `dependencies` dan `devDependencies` hasil Step 1.

- [ ] **Step 3: `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ react(), tailwindcss() ],
})
```

- [ ] **Step 4: `index.html`**

`lang="id"` karena kontennya Bahasa Indonesia — pembaca layar memakai ini untuk memilih pelafalan.

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>David Adriel Alvyn — Fullstack Developer</title>
    <meta name="description" content="Fullstack Developer. Go, Rails, Laravel, React. Portofolio project dan pengalaman kerja." />
    <meta property="og:title" content="David Adriel Alvyn — Fullstack Developer" />
    <meta property="og:description" content="Fullstack Developer. Go, Rails, Laravel, React." />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#09090b" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: `.gitignore`**

```gitignore
node_modules/
dist/
.vercel/
.DS_Store
*.local
.env
.env.*
!.env.example
```

- [ ] **Step 6: `src/index.css` — Tailwind v4 + token**

Tailwind v4 memakai `@import`, bukan direktif `@tailwind`.

```css
@import "tailwindcss";

@theme {
  --color-ink: #09090b;
  --color-ink-soft: #18181b;
  --color-line: #27272a;
  --color-fg: #fafafa;
  --color-fg-dim: #a1a1aa;
  --color-accent: #38bdf8;
}

html {
  scroll-behavior: smooth;
  background-color: var(--color-ink);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  color: var(--color-fg);
  -webkit-font-smoothing: antialiased;
}

/* Fokus keyboard harus selalu terlihat — tema gelap membuat outline default
   nyaris tak tampak. */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

- [ ] **Step 7: `src/main.jsx`**

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 8: `src/App.jsx` sementara, untuk membuktikan build jalan**

```jsx
export default function App() {
  return <h1 className="p-10 text-4xl font-bold">Porto</h1>
}
```

- [ ] **Step 9: Verifikasi dev server dan build**

```bash
npm run dev &
sleep 5
curl -s -o /dev/null -w "dev  -> %{http_code}\n" http://localhost:5173/
kill %1
npm run build && echo "BUILD OK" && ls -la dist/
```

Expected: `dev -> 200`, `BUILD OK`, `dist/index.html` ada.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + Tailwind v4"
```

---

## Task 2: Aturan animasi terpusat

**Files:**
- Create: `src/lib/motion.js`, `src/components/Reveal.jsx`

Ini task pertama yang berisi logika, dan sengaja didahulukan: setiap section setelah ini memakainya, jadi `prefers-reduced-motion` tidak bisa terlewat di satu section saja.

- [ ] **Step 1: `src/lib/motion.js`**

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Menjalankan `build` hanya kalau pengguna TIDAK meminta reduced motion.
 * Semua animasi wajib lewat sini — bukan sekadar sopan santun: pinned scroll
 * pada reduced motion bisa memicu mual bagi sebagian orang.
 *
 * gsap.matchMedia() otomatis membersihkan animasi saat query tidak lagi cocok,
 * jadi mengganti setelan sistem langsung berefek tanpa reload.
 */
export function onMotionOK(build, scope) {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', build, scope)
  return () => mm.revert()
}

/** Durasi & easing dipusatkan supaya ritme animasi konsisten di seluruh halaman. */
export const EASE = 'power2.out'
export const DUR = 0.7
```

- [ ] **Step 2: `src/components/Reveal.jsx`**

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE, DUR } from '../lib/motion.js'

/**
 * Memunculkan anak-anaknya saat masuk viewport.
 *
 * Memakai gsap.from(), BUKAN opacity:0 di CSS. Kalau JavaScript gagal atau
 * belum termuat, konten tetap terlihat — reveal-nya peningkatan, bukan syarat.
 */
export default function Reveal({ children, y = 24, stagger = 0.08, className = '' }) {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    const targets = ref.current.children
    if (!targets.length) return
    gsap.from(targets, {
      opacity: 0,
      y,
      duration: DUR,
      ease: EASE,
      stagger,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
    })
  }), { scope: ref })

  return <div ref={ref} className={className}>{children}</div>
}
```

- [ ] **Step 3: Verifikasi build masih jalan**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/motion.js src/components/Reveal.jsx
git commit -m "feat(motion): centralize gsap rules and reduced-motion handling

Semua animasi wajib lewat onMotionOK() supaya prefers-reduced-motion tidak
bisa terlewat di satu section saja. Reveal memakai gsap.from() alih-alih
opacity:0 di CSS, sehingga konten tetap terbaca kalau JS gagal termuat."
```

---

## Task 3: File data

**Files:**
- Create: `src/data/profile.js`, `src/data/projects.js`

- [ ] **Step 1: `src/data/profile.js`**

```js
export const profile = {
  name: 'David Adriel Alvyn',
  headline: 'Fullstack Developer',
  tagline: 'Go, Rails, Laravel, React — dan kebiasaan mengukur sebelum mengklaim.',
  avatar: '/avatar.svg',   // placeholder; ganti ke '/avatar.jpg' saat foto asli ada
  email: 'dvdadrielwork@gmail.com',
  github: 'https://github.com/dvdadriel',
  education: {
    school: 'Bina Nusantara University',
    major: 'Computer Science',
    period: '2021 – 2025',
  },
  stack: [
    'Go', 'Ruby on Rails', 'PHP / Laravel', 'Python',
    'JavaScript / React', 'gRPC', 'PostgreSQL', 'MySQL',
    'Docker', 'Cloudflare Workers',
  ],
}
```

- [ ] **Step 2: `src/data/projects.js`**

Setiap `metrics` harus bisa ditelusuri ke tabel "Hasil Workstream A". `caveat` sengaja ada: menampilkan angka tanpa batasannya justru yang paling mudah dibongkar saat interview.

```js
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
    shot: '/shots/news-update.png',
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
    shot: '/shots/go-courier.png',
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
    shot: '/shots/go-foodstore.png',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.js src/data/projects.js
git commit -m "feat(data): add profile and project data

Setiap metrik bisa ditelusuri ke hasil yang sudah dipublikasikan di repo
masing-masing. Field caveat sengaja ada dan sengaja diisi: menampilkan angka
tanpa batasannya adalah hal yang paling mudah dibongkar saat interview."
```

---

## Task 4: Hero

**Files:**
- Create: `src/sections/Hero.jsx`, `public/avatar.svg`
- Modify: `src/App.jsx`

- [ ] **Step 1: Buat placeholder avatar**

Placeholder harus terlihat jelas sebagai placeholder, supaya tidak diam-diam ikut ter-deploy sebagai foto asli.

```bash
cd "/Users/david/Documents/Other Project/Porto"
mkdir -p public/shots
cat > /tmp/avatar.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
  <rect width="480" height="480" fill="#18181b"/>
  <circle cx="240" cy="190" r="76" fill="#27272a"/>
  <path d="M104 420c0-75 61-136 136-136s136 61 136 136z" fill="#27272a"/>
  <text x="240" y="462" font-family="ui-monospace,monospace" font-size="22" fill="#52525b" text-anchor="middle">FOTO MENYUSUL</text>
</svg>
SVG
cp /tmp/avatar.svg public/avatar.svg && rm /tmp/avatar.svg
```

`profile.avatar` sudah menunjuk `/avatar.svg` sejak Task 3, jadi tidak ada yang perlu diubah di sini. Saat foto asli datang: simpan sebagai `public/avatar.jpg`, ubah satu baris di `profile.js`.

- [ ] **Step 2: `src/sections/Hero.jsx`**

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'
import { profile } from '../data/profile.js'

export default function Hero() {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from('[data-hero-item]', {
      opacity: 0, y: 28, duration: 0.9, ease: EASE, stagger: 0.12, delay: 0.1,
    })
  }), { scope: ref })

  return (
    <section ref={ref} className="min-h-svh flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      <img
        data-hero-item
        src={profile.avatar}
        alt=""
        width="96" height="96"
        className="w-24 h-24 rounded-full border border-line mb-10"
      />
      <p data-hero-item className="font-mono text-sm text-fg-dim mb-5">{profile.headline}</p>
      <h1 data-hero-item className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
        {profile.name}
      </h1>
      <p data-hero-item className="mt-7 text-lg md:text-xl text-fg-dim max-w-2xl leading-relaxed">
        {profile.tagline}
      </p>
      <div data-hero-item className="mt-12 font-mono text-xs text-fg-dim" aria-hidden="true">
        ↓ scroll
      </div>
    </section>
  )
}
```

`alt=""` pada avatar disengaja: foto profil dekoratif di sini karena nama sudah tertulis sebagai teks di sebelahnya. Memberi alt "Foto David" akan membuat pembaca layar mengulang informasi yang sama.

- [ ] **Step 3: Pasang di `src/App.jsx`**

```jsx
import Hero from './sections/Hero.jsx'

export default function App() {
  return (
    <main className="bg-ink text-fg">
      <Hero />
    </main>
  )
}
```

- [ ] **Step 4: Verifikasi visual dan reduced-motion**

```bash
npm run dev
```

Buka `http://localhost:5173/`. Periksa:
1. Nama, headline, tagline muncul dengan animasi masuk bertahap
2. **Matikan JavaScript di DevTools, reload** → semua teks tetap terlihat. Kalau ada yang hilang, ada `opacity:0` di CSS yang harus dihapus.
3. DevTools → Rendering → **Emulate `prefers-reduced-motion: reduce`**, reload → teks langsung tampil tanpa gerak

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(hero): add hero section with placeholder avatar

Avatar placeholder sengaja bertuliskan FOTO MENYUSUL supaya tidak diam-diam
ter-deploy sebagai foto asli. Menggantinya cukup menimpa satu file dan
mengubah satu baris di profile.js."
```

---

## Task 5: Professional Work — versi generik

**Files:**
- Create: `src/data/work.js`, `src/sections/ProfessionalWork.jsx`, `src/components/SectionHeading.jsx`
- Modify: `src/App.jsx`

**Ini section paling penting di halaman ini** dan sengaja ditempatkan **di atas** Projects: kerja profesional berbayar untuk ~15 situs klien lebih meyakinkan untuk posisi "Web Developer 2025–now" daripada side project mana pun.

> ### ⚠️ Izin belum ada — bangun versi generik
>
> Kode yang ditulis sebagai karyawan adalah milik perusahaan. Per 2026-08-26 David
> **belum meminta izin** ke atasannya, jadi:
>
> **BOLEH sekarang:** menyebut jabatan, periode, nama perusahaan, dan jenis
> pekerjaan. Itu isi CV biasa.
>
> **JANGAN sekarang:** nama brand klien (Therapedic, Comforta, Sleep Center,
> Dr. Rest, Purefoam, dll), link ke situsnya, screenshot situsnya, atau link
> ke repo mana pun. ~15 repo di `~/Documents/Project_Massindo` **tetap privat**.
>
> Struktur `work.js` dibuat agar tahap 2 hanya perlu mengisi array `clients` —
> tanpa menyentuh komponen.

- [ ] **Step 1: `src/data/work.js`**

```js
export const work = [
  {
    company: 'Massindo Group',
    role: 'Web Developer',
    period: '2025 – sekarang',
    summary:
      'Mengembangkan dan memelihara situs untuk sejumlah brand di bawah satu grup — pengerjaan fitur, perbaikan, dan pemeliharaan berkelanjutan di lingkungan produksi yang sedang dipakai.',
    doing: [
      'Pengembangan dan pemeliharaan situs multi-brand',
      'Pengerjaan fitur dan perbaikan pada sistem yang sudah berjalan',
      'Deployment dan konfigurasi server',
    ],
    // TAHAP 2 — isi hanya setelah izin tertulis dari atasan diterima.
    // Bentuk tiap entri: { brand: 'Nama', url: 'https://…', role: 'peran spesifik' }
    // Komponennya sudah menangani array kosong maupun terisi.
    clients: [],
    note:
      'Kode milik perusahaan, jadi tidak dipublikasikan. Detail brand dan tautan situsnya bisa saya sampaikan langsung.',
  },
]
```

- [ ] **Step 2: `src/components/SectionHeading.jsx`**

```jsx
export default function SectionHeading({ index, title, sub }) {
  return (
    <div className="mb-14">
      <p className="font-mono text-xs text-accent mb-3">{index}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-fg-dim max-w-2xl leading-relaxed">{sub}</p>}
    </div>
  )
}
```

- [ ] **Step 3: `src/sections/ProfessionalWork.jsx`**

```jsx
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { work } from '../data/work.js'

export default function ProfessionalWork() {
  return (
    <section id="work" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading
        index="01"
        title="Pengalaman Profesional"
        sub="Pekerjaan berbayar di lingkungan produksi yang sedang dipakai orang."
      />

      {work.map((w) => (
        <Reveal key={w.company} className="border-t border-line pt-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-xl md:text-2xl font-semibold">{w.role}</h3>
            <span className="text-fg-dim">· {w.company}</span>
            <span className="font-mono text-sm text-fg-dim ml-auto">{w.period}</span>
          </div>

          <p className="mt-5 text-fg-dim leading-relaxed max-w-3xl">{w.summary}</p>

          <ul className="mt-7 grid gap-2 md:grid-cols-3">
            {w.doing.map((d) => (
              <li key={d} className="text-sm text-fg-dim border border-line rounded-lg p-4 leading-relaxed">
                {d}
              </li>
            ))}
          </ul>

          {w.clients.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {w.clients.map((c) => (
                <li key={c.brand}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition-colors"
                  >
                    {c.brand} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}

          {w.note && <p className="mt-7 text-sm text-fg-dim/80 italic max-w-2xl">{w.note}</p>}
        </Reveal>
      ))}
    </section>
  )
}
```

Blok `clients` dibungkus `length > 0` sehingga versi generik tidak menampilkan daftar kosong, dan tahap 2 langsung bekerja begitu array-nya diisi.

- [ ] **Step 4: Pasang di App, verifikasi, commit**

```bash
npm run build && echo "BUILD OK"
git add -A
git commit -m "feat(work): add professional experience section, brand-agnostic for now

Ditempatkan DI ATAS Projects secara sengaja: kerja profesional berbayar lebih
meyakinkan untuk posisi Web Developer daripada side project.

Nama brand klien, tautan situs, dan screenshot-nya SENGAJA belum dicantumkan —
kode yang ditulis sebagai karyawan milik perusahaan, dan izin belum diminta.
Array clients kosong dan komponennya sudah menangani kedua keadaan, jadi
mengisinya nanti tidak menyentuh komponen."
```

---

## Task 6: Projects dengan kolom detail sticky

**Files:**
- Create: `src/sections/Projects.jsx`, `src/sections/ProjectPanel.jsx`, `src/components/Pill.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: `src/components/Pill.jsx`**

```jsx
export default function Pill({ children }) {
  return (
    <span className="inline-block font-mono text-xs border border-line rounded-full px-3 py-1 text-fg-dim">
      {children}
    </span>
  )
}
```

- [ ] **Step 2: `src/sections/ProjectPanel.jsx`**

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'

export default function ProjectPanel({ project, index }) {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from(ref.current.querySelectorAll('[data-panel-item]'), {
      opacity: 0, y: 24, duration: 0.7, ease: EASE, stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
    })
  }), { scope: ref })

  return (
    <article
      ref={ref}
      className="border-t border-line py-20 md:py-28 grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16"
    >
      <div className="md:sticky md:top-24 md:self-start">
        <p data-panel-item className="font-mono text-xs text-accent mb-4">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 data-panel-item className="text-3xl md:text-4xl font-bold tracking-tight">
          {project.name}
        </h3>
        <p data-panel-item className="mt-3 font-mono text-sm text-fg-dim">{project.kicker}</p>

        <div data-panel-item className="mt-8 flex flex-wrap gap-3">
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
             className="text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition-colors">
            Kode ↗
          </a>
          {project.docs && (
            <a href={project.docs} target="_blank" rel="noopener noreferrer"
               className="text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition-colors">
              Dokumentasi ↗
            </a>
          )}
        </div>
      </div>

      <div>
        <p data-panel-item className="text-lg text-fg-dim leading-relaxed">{project.summary}</p>

        <dl data-panel-item className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="border border-line rounded-xl p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wide text-fg-dim">{m.label}</dt>
              <dd className="mt-2 text-2xl font-bold">{m.value}</dd>
              <dd className="mt-1 text-xs text-fg-dim leading-snug">{m.note}</dd>
            </div>
          ))}
        </dl>

        <ul data-panel-item className="mt-10 space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm text-fg-dim leading-relaxed pl-5 relative">
              <span className="absolute left-0 text-accent" aria-hidden="true">·</span>
              {h}
            </li>
          ))}
        </ul>

        {project.caveat && (
          <p data-panel-item className="mt-10 text-sm text-fg-dim border-l-2 border-line pl-5 leading-relaxed">
            {project.caveat}
          </p>
        )}
      </div>
    </article>
  )
}
```

**Kenapa sticky, bukan ScrollTrigger pin.** Kolom kiri memakai `md:sticky md:top-24` — CSS murni. Ini keputusan sadar meski spec menyebut "pinned scroll": sticky memberi efek menempel yang sama, otomatis mati di bawah breakpoint `md` (di mobile, pinning memakan hampir seluruh viewport dan membuat scroll terasa macet), tidak butuh JavaScript sama sekali sehingga tetap bekerja saat JS gagal, dan tidak mengubah tinggi dokumen — `ScrollTrigger.pin` menyuntikkan elemen spacer yang justru sering merusak layout. Tidak ada pemanggilan pin di komponen ini.

- [ ] **Step 3: `src/sections/Projects.jsx`**

```jsx
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectPanel from './ProjectPanel.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading
        index="02"
        title="Project"
        sub="Empat project pribadi. Angka yang ditampilkan bisa ditelusuri ke hasil yang dipublikasikan di repo masing-masing — termasuk yang hasilnya kurang bagus."
      />
      {projects.map((p, i) => <ProjectPanel key={p.slug} project={p} index={i} />)}
    </section>
  )
}
```

- [ ] **Step 4: Verifikasi**

```bash
npm run build && echo "BUILD OK"
npm run dev
```

Periksa di browser:
1. Kolom kiri menempel saat menggulir panel di layar lebar
2. Perkecil ke lebar mobile → sticky mati, layout jadi satu kolom, tidak ada scroll macet
3. Matikan JS → seluruh teks project tetap terbaca
4. Emulate reduced-motion → tidak ada gerak, konten tampil

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(projects): add project panels with sticky detail column

Memakai CSS position:sticky, BUKAN ScrollTrigger pin. Efek menempelnya sama,
tapi sticky otomatis mati di bawah breakpoint md, tidak butuh JavaScript, dan
tidak menyuntikkan spacer yang mengubah tinggi dokumen — pin ScrollTrigger
sering merusak layout justru karena itu.

Field caveat ditampilkan setara dengan metrik, tidak disembunyikan."
```

---

## Task 7: TechStack, About, Contact

**Files:**
- Create: `src/sections/TechStack.jsx`, `src/sections/About.jsx`, `src/sections/Contact.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: `src/sections/TechStack.jsx`**

```jsx
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Pill from '../components/Pill.jsx'
import { profile } from '../data/profile.js'

export default function TechStack() {
  return (
    <section id="stack" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading index="03" title="Stack" />
      <Reveal className="flex flex-wrap gap-3" stagger={0.04}>
        {profile.stack.map((s) => <Pill key={s}>{s}</Pill>)}
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: `src/sections/About.jsx`**

```jsx
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { profile } from '../data/profile.js'

export default function About() {
  const { school, major, period } = profile.education
  return (
    <section id="about" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading index="04" title="Tentang" />
      <Reveal>
        <p className="text-lg text-fg-dim leading-relaxed max-w-2xl">
          Saya lebih tertarik pada apakah sesuatu benar-benar bekerja daripada apakah
          ia terlihat bekerja. Karena itu project saya biasanya punya bagian
          &ldquo;batasan yang diketahui&rdquo; — termasuk hal-hal yang belum berhasil.
        </p>
        <div className="mt-12 border-t border-line pt-8">
          <p className="font-mono text-xs text-fg-dim mb-2">Pendidikan</p>
          <p className="text-lg">{school}</p>
          <p className="text-fg-dim">{major} · {period}</p>
        </div>
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 3: `src/sections/Contact.jsx`**

Tanpa form: form butuh backend atau layanan pihak ketiga, dan `mailto` cukup untuk tujuannya.

```jsx
import Reveal from '../components/Reveal.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  return (
    <footer id="contact" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40 border-t border-line">
      <Reveal>
        <p className="font-mono text-xs text-accent mb-3">05</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Kontak</h2>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <a href={`mailto:${profile.email}`} className="text-lg hover:text-accent transition-colors">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
             className="text-lg hover:text-accent transition-colors">
            github.com/dvdadriel ↗
          </a>
        </div>
        <p className="mt-16 font-mono text-xs text-fg-dim">
          {profile.name} · {new Date().getFullYear()}
        </p>
      </Reveal>
    </footer>
  )
}
```

- [ ] **Step 4: `src/App.jsx` final**

```jsx
import Hero from './sections/Hero.jsx'
import ProfessionalWork from './sections/ProfessionalWork.jsx'
import Projects from './sections/Projects.jsx'
import TechStack from './sections/TechStack.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ink-soft focus:px-4 focus:py-2 focus:rounded">
        Lewati ke konten
      </a>
      <main className="bg-ink text-fg">
        <Hero />
        <ProfessionalWork />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
    </>
  )
}
```

Skip link disertakan karena halaman ini panjang dan pengguna keyboard tidak seharusnya menelusuri seluruh hero setiap kali.

- [ ] **Step 5: Verifikasi dan commit**

```bash
npm run build && echo "BUILD OK"
git add -A
git commit -m "feat: add stack, about, and contact sections

Kontak tanpa form: form butuh backend atau layanan pihak ketiga, sementara
mailto sudah cukup. Ditambahkan skip link karena halaman ini panjang dan
pengguna keyboard tidak seharusnya menelusuri seluruh hero tiap kali."
```

---

## Task 8: Screenshot project

**Files:**
- Create: `public/shots/*.png`
- Modify: `src/sections/ProjectPanel.jsx`

- [ ] **Step 1: Kumpulkan screenshot**

`idx-screener` sudah punya satu:

```bash
cd "/Users/david/Documents/Other Project/Porto"
cp ~/Projects/CryptoScreener/docs/images/dashboard.png public/shots/idx-screener.png
```

Untuk tiga lainnya, jalankan stack-nya lalu screenshot:
- **News-Update:** `cd ~/Documents/News-Update && npx wrangler dev` → buka `localhost:8787`, login, jepret. **Sensor** nama bot dan chat ID kalau tampil.
- **Go-FoodStore:** tidak punya UI. Pakai tangkapan terminal berisi respons `curl`, atau tangkapan Postman collection. Jangan paksakan screenshot UI yang tidak ada.
- **Go-Courier:** sama, tidak punya UI. Pakai tangkapan diagram Mermaid dari README GitHub-nya.

- [ ] **Step 2: Tampilkan di panel — hanya kalau berkasnya ada**

Tambahkan di `ProjectPanel.jsx`, di dalam kolom kanan, setelah `summary`:

```jsx
        {project.shot && (
          <img
            data-panel-item
            src={project.shot}
            alt={`Tangkapan layar ${project.name}`}
            loading="lazy"
            className="mt-10 w-full rounded-xl border border-line"
          />
        )}
```

Untuk project tanpa screenshot, set `shot: null` di `projects.js`. **Jangan biarkan menunjuk berkas yang tidak ada** — gambar rusak lebih buruk daripada tidak ada gambar.

- [ ] **Step 3: Verifikasi tidak ada gambar rusak**

```bash
npm run build
node -e "
const {projects} = await import('./src/data/projects.js');
const fs = await import('node:fs');
for (const p of projects) {
  if (!p.shot) { console.log('  (null)', p.slug); continue; }
  const f = 'public' + p.shot;
  console.log(fs.existsSync(f) ? '  OK   ' + f : '  HILANG ' + f);
}
" --input-type=module
```

Expected: tidak ada baris `HILANG`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add project screenshots where a UI actually exists

Go-FoodStore dan Go-Courier tidak punya UI, jadi shot-nya null alih-alih
dipaksakan. Gambar rusak lebih buruk daripada tidak ada gambar."
```

---

## Task 9: Deploy ke Vercel

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: `vercel.json`**

```json
{
  "cleanUrls": true,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

Aset build Vite sudah ber-hash nama berkas, jadi cache setahun aman. `index.html` sengaja tidak ikut di-cache panjang.

- [ ] **Step 2: Push ke GitHub**

```bash
cd "/Users/david/Documents/Other Project/Porto"
gh repo create dvdadriel/porto --public --source=. --remote=origin --push
```

- [ ] **Step 3: Deploy**

Cara paling sederhana lewat web, tanpa memasang CLI: buka **vercel.com/new**, import repo `dvdadriel/porto`. Vercel mendeteksi Vite otomatis (`npm run build` → `dist/`).

Kalau lebih suka CLI: `npm i -g vercel && vercel --prod`. **Butuh login interaktif** — ini langkah David, bukan agen.

- [ ] **Step 4: Verifikasi produksi**

Setelah URL `*.vercel.app` hidup:

```bash
URL="https://<subdomain>.vercel.app"
curl -s -o /dev/null -w "  status : %{http_code}\n" "$URL"
curl -s "$URL" | grep -c "David Adriel Alvyn" | xargs -I{} echo "  nama muncul di HTML: {}"
```

Lalu di browser:
1. **Lighthouse** pada build produksi — catat keempat skornya. Perbaiki temuan Accessibility apa pun; itu yang paling mudah dinilai orang.
2. **Emulate `prefers-reduced-motion: reduce`** → tidak ada gerak sama sekali
3. **Matikan JavaScript** → seluruh teks tetap terbaca
4. **Viewport mobile (375px)** → tidak ada scroll horizontal, tidak ada teks terpotong
5. **Tab lewat keyboard dari atas** → skip link muncul, semua tautan punya fokus terlihat

- [ ] **Step 5: Commit dan tautkan dari profil GitHub**

```bash
git add vercel.json
git commit -m "chore: add vercel config with immutable asset caching"
git push
gh repo edit dvdadriel/porto --homepage "https://<subdomain>.vercel.app" --description "Portofolio pribadi — Vite, React, Tailwind, GSAP."
```

---

## Selesai bila

- [ ] `npm run build` bersih, tanpa warning
- [ ] Konten terbaca penuh dengan JavaScript dimatikan
- [ ] `prefers-reduced-motion: reduce` menghilangkan seluruh gerak
- [ ] Tidak ada scroll horizontal di viewport 375px
- [ ] Skip link berfungsi, fokus keyboard terlihat di semua tautan
- [ ] Tidak ada gambar rusak (`shot: null` untuk project tanpa UI)
- [ ] Tidak ada nama brand Massindo, tautan situs, atau screenshot klien
- [ ] Setiap angka di `projects.js` bisa ditelusuri ke hasil yang dipublikasikan
- [ ] Skor Lighthouse dicatat; temuan Accessibility nol
- [ ] URL produksi hidup dan tertaut dari profil GitHub

## Setelah ini

**Tahap 2 Professional Work** begitu izin dari atasan turun: isi array `clients` di `src/data/work.js` dengan `{ brand, url, role }`, hapus atau perbarui `note`, tambahkan screenshot halaman publik ke `public/shots/`. Komponennya tidak perlu disentuh.

Sekalian minta **testimonial atau rekomendasi LinkedIn** — bobotnya di CV lebih besar daripada section project mana pun.
