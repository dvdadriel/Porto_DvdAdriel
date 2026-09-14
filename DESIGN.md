# DESIGN.md

Sistem visual portofolio ini. Sumber kebenarannya `src/index.css`; dokumen ini
menjelaskan *kenapa*, bukan menggantikan nilainya.

## Arah

Tipografi kondensasi berukuran besar di atas bidang kertas greige, dengan dua
section gelap sebagai jeda. Referensi arah: [grigoletti.ch](https://grigoletti.ch/en/)
— tegas, padat, huruf besar, tanpa ornamen.

Versi sebelumnya memakai serif berkontras tinggi dengan skala kecil dan banyak
ruang kosong. Hasilnya bukan tenang, tapi kosong: di kanvas 1440px, headline
84px bukan peristiwa, dan konten cuma mengisi sekitar 55% lebar. Itu kesalahan
yang tidak boleh diulang — kalau sebuah usulan membuat halaman lebih lirih,
periksa dulu apakah ia juga membuatnya lebih kosong.

## Warna

OKLCH, anchor hue 168 untuk tinta. **Semua rasio di bawah diukur, bukan
diperkirakan.** Kalau Anda mengubah satu nilai, ukur ulang.

| Token | Nilai | Peran | Kontras |
|---|---|---|---|
| `--color-ink` | `oklch(0.22 0.03 168)` | teks utama | 13,99:1 di surface |
| `--color-night` | `oklch(0.22 0.03 168)` | latar section gelap | — |
| `--color-ink-soft` | `oklch(0.45 0.02 168)` | teks sekunder | 6,00:1 |
| `--color-surface` | `oklch(0.93 0.006 150)` | latar halaman | — |
| `--color-surface-raised` | `oklch(0.97 0.004 150)` | bidang terangkat | — |
| `--color-rule` | `oklch(0.78 0.01 150)` | hairline | 1,63:1 — sengaja lirih |
| `--color-signal` | `oklch(0.44 0.12 150)` | caveat di terang | 5,99:1 |
| `--color-signal-on-ink` | `oklch(0.76 0.13 150)` | caveat di gelap | 8,41:1 |
| `--color-verified` | `oklch(0.48 0.09 168)` | penanda terverifikasi | 5,01:1 |
| `--color-on-ink` | `oklch(0.96 0.008 168)` | teks di gelap | 15,32:1 |
| `--color-on-ink-soft` | `oklch(0.74 0.015 168)` | sekunder di gelap | 7,49:1 |

Tiga hal yang gampang salah kalau tidak tahu alasannya:

1. **`--color-night` nilainya sama dengan `--color-ink` tapi bukan duplikat.**
   Di dalam `.on-ink`, `--color-ink` **ditukar** jadi warna terang. Latar yang
   membaca `--color-ink` akan ikut jadi terang dan seluruh section memudar. Itu
   pernah terjadi. Latar gelap selalu pakai `--color-night`.

2. **`--color-signal` punya dua varian** karena satu nilai tidak pernah lolos
   4,5:1 di latar terang *dan* gelap sekaligus. Hue 150 memisahkannya dari
   `--color-verified` di 168, jadi "terukur" dan "belum terbukti" tidak jadi
   warna yang sama.

3. **Caveat hijau, bukan amber.** Amber membaca sebagai error sistem; batasan di
   sini bukan error, melainkan bagian dari catatan.

### Section gelap

`.on-ink` menukar palet lewat custom property, bukan daftar override per elemen:

```css
.on-ink {
  background-color: var(--color-night);
  --color-ink:      var(--color-on-ink);
  --color-ink-soft: var(--color-on-ink-soft);
  --color-rule:     var(--color-rule-on-ink);
  --color-signal:   var(--color-signal-on-ink);
  --color-surface:  var(--color-night);
}
```

Komponen menulis warnanya sebagai `var(--color-ink-soft)` di mana pun ia dipakai,
dan ikut benar di kedua konteks tanpa tahu ia sedang di mana.

Dipakai di **Pengalaman** dan **Stack**, keduanya warna polos. Video ambient
sempat dipakai lalu dicabut: dua section gelap dengan video berarti dua kali
biaya untuk efek yang sama, dan warna polos justru membuat tipografinya lebih
tegas.

## Tipografi

| Peran | Typeface | Catatan |
|---|---|---|
| Display, judul, tombol, angka | **Anton** (Google, OFL, self-host, subset latin, 12 KB) | satu weight, huruf besar, digambar untuk dipakai besar dan rapat |
| Teks, label | **Switzer** (Fontshare, 400/500/700) | grotesk netral |

Tidak ada monospace. Label kecil ber-monospace adalah tell, dan masalah yang
biasanya dipakai untuk menyelesaikannya — perataan angka — sudah diselesaikan
`font-variant-numeric: tabular-nums lining-nums` di kelas `.numeric`.

`text-transform: uppercase` dipasang di aturan `h1,h2,h3`, bukan per komponen:
huruf besar adalah bagian dari bentuk Anton, bukan keputusan per-tempat.

Skala:

```
display  clamp(3rem, 9.5vw, 8.5rem)     line-height 0.88
h2       clamp(2.25rem, 5.5vw, 4.5rem)
h3       clamp(1.5rem, 2.4vw, 2rem)
body     1.125rem                        line-height 1.65
metric   clamp(2.25rem, 4vw, 3.25rem)
caption  0.9375rem
```

Prosa tidak pernah lebih lebar dari 68ch (`.prose-measure`).

## Layout

- Container `max-w-[1600px]`, padding `px-6 / sm:px-10 / lg:px-14`.
- Grid 12 kolom. Pola tetap: **klaim di kolom 1–7, bukti di kolom 9–12**, tidak
  pernah bercampur. Pemisahan itu sendiri yang mengatakan "yang ini pendapat
  saya, yang itu angkanya".
- Section dipisah hairline, bukan dikemas jadi kartu. Alasan praktis di luar
  estetika: daftar berhairline tidak peduli isinya empat atau tujuh, sementara
  grid 2×2 pecah begitu jumlahnya ganjil — project kelima sudah di jalan.
- Kepala section: hairline penuh, nomor urut di kolom kiri, judul besar di
  sebelahnya (`SectionHeader`). Nomornya informasi, bukan eyebrow: halaman ini
  dibaca berurutan dan angka memberi tempat berpijak saat men-scroll jauh.
- **Tentang** memakai `SectionHeader` yang sama persis dengan section lain —
  kepala section tidak boleh berubah ukuran antar-section, itu yang membuat
  halaman terbaca sebagai satu dokumen. Yang beda cuma isinya: potret membelah
  ke tepi kanan di atas latar terang. Arah: [christoph-nagel.dev](https://christoph-nagel.dev/#webentwicklung).
- Potret dikelas `.portrait-bleed`: hitam putih, tepi dilarutkan mask gradien.
  Foto berwarna (kayu cokelat, dedaunan hijau) di tengah palet hijau-tinta akan
  membawa warnanya sendiri dan memecah halaman. Fotonya mulai di bawah garis
  kepala section: hairline yang memotong wajah terbaca sebagai kesalahan cetak.

  **Dua nilai berbeda antara HP dan desktop, keduanya karena bentuk kotaknya
  berbeda — bukan karena selera.** (1) Pelarutan ke arah kiri hanya di ≥1024px;
  di 390px foto selebar layar dengan gradien kiri-ke-kanan membuat separuh
  kirinya jadi kabut. (2) `object-position`: desktop `50% 100%` (kotak
  tinggi-sempit, bingkai dikunci ke tepi bawah sehingga ukiran dan atap terpotong
  dan orangnya mengisi penuh), HP `50% 34%` (kotak lebar-pendek, nilai 100% di
  sana memenggal kepala — terlihat di 390px). Karena itu keduanya hidup di CSS,
  bukan inline style: inline style tidak bisa punya media query.

## Komponen

| Komponen | Catatan |
|---|---|
| `Accordion` | Di atas `<details>`/`<summary>` native — keyboard, ARIA, Ctrl+F yang membuka panel tertutup, dan isinya tetap ada tanpa JS. Atribut `name` membuat satu grup saling menutup. **Membuka** dibiarkan native lalu dianimasikan GSAP; **menutup** harus dicegat, karena tanpa itu browser langsung menghapus isinya dan tidak ada yang tersisa untuk dianimasikan. `height:auto` tidak bisa di-tween, jadi tingginya diukur dulu lalu dilepas kembali ke auto. |
| `Record` | Satu project, terlipat. Terbuka semua berarti empat dinding teks sebelum sampai ke yang dicari. |
| `Metric` | `<dt>`/`<dd>` di dalam `<dl>` pemanggil. `note` bukan hiasan: itu yang membedakan angka yang bisa diperiksa dari angka yang cuma diklaim. |
| `Caveat` | Border penuh warna signal. Bukan garis tebal di satu sisi — aksen samping adalah dekorasi yang menyamar jadi struktur. |
| `ShowcaseCarousel` | Crossfade + skala, bukan geser: semua slide seukuran dan mirip, gerakan menyamping hanya membuat mata mengejar sesuatu yang tidak berubah. Titiknya tombol sungguhan. |
| `SectionHeader` | `align="center"` menumpuk nomor di atas judul, dipakai di section yang isinya juga berporos tengah. Varian, bukan pilihan gaya yang bisa dipakai bergantian. |
| Monogram DAA | Outline diekstrak dari Anton (font display situs) jadi path SVG, 571 byte, di-inline ke `TopNav` dan `public/favicon.svg`. Dipakai `currentColor` supaya ikut berbalik di section gelap tanpa aset kedua. Referensi `<use href>` lintas-berkas sengaja dihindari — diblokir banyak browser. |
| `TopNav` | Pill bergaris, **statis bukan fixed**. Halaman berganti terang/gelap; nav melayang akan jadi blok gelap di atas section gelap. |

Tombol: `.btn` + `.btn-solid` / `.btn-outline`. Border 1,5px, sudut tidak
membulat, tanpa shadow. Bayangan lembut di bawah setiap elemen adalah kosakata
kartu SaaS, dan ini bukan dashboard.

## Motion

Satu momen orkestrasi saat load (hero: baris headline naik, lalu isi di
bawahnya, lalu carousel), lalu satu efek masuk per section saat ia pertama
terlihat — garis kepala section ditarik dari kiri, nomor dan judul menyusul.
Selebihnya motion **menjawab aksi**: hover, buka accordion, buka sheet.

Efek masuk hidup di satu komponen, `SectionReveal`, bukan ditulis ulang di tiap
section: itu satu-satunya cara ritmenya tetap sama. Durasi yang berbeda-beda
antar-section terbaca sebagai halaman yang dirakit dari potongan. Kontak memakai
salinan manual dengan angka identik karena elemennya `<footer>`, bukan
`<section>`.

Dua efek, dan bedanya menandai hierarki:

| Tanda | Efek | Dipakai untuk |
|---|---|---|
| `data-section-rule` | `scaleX` 0→1 dari kiri | garis kepala section |
| `data-reveal-mask` | naik dari balik garis (`yPercent` 110→0) | nomor dan judul section |
| `data-reveal` | fade-up (`y` 18→0 + opacity) | deskripsi dan isi section |

Judul memakai efek yang sama persis dengan headline hero, jadi keduanya terbaca
sebagai satu bahasa. Kalau semua ikut naik dari balik garis, tidak ada lagi yang
menonjol — itu sebabnya deskripsi sengaja dibedakan.

Pembungkus mask butuh **dua** span: yang luar memotong (`overflow-hidden`), yang
dalam yang digeser. Satu elemen untuk keduanya akan memotong dirinya sendiri.
`pb-[0.12em]` di pembungkus mencegah bawah huruf ikut terpotong — Anton
ber-`line-height` 0.88, jadi kotak barisnya lebih pendek daripada glyph-nya.
`yPercent`, bukan `y`: persentase mengikuti tinggi barisnya sendiri, jadi nomor
"01" yang kecil dan judul yang besar sama-sama tersembunyi penuh di titik mulai.

Aturan yang tidak boleh dilanggar:

- **Selalu `fromTo()`, tidak pernah `gsap.set()` diikuti `.to()`.** `set()`
  memisahkan keadaan tersembunyi dari tween yang membukanya: kalau tween-nya
  mati — di-revert, di-kill, atau komponennya dipasang ulang — `set()` tertinggal
  dan elemennya macet tersembunyi selamanya. Terukur: versi `set()` + `to()`
  membuat hero membeku permanen di keadaan tersembunyi saat React StrictMode
  memasang komponen dua kali di mode dev, sementara di build produksi ia jalan
  normal — jenis bug yang paling mudah lolos. Dengan `fromTo()` keadaan
  tersembunyi itu milik tween; kalau tween-nya hilang, yang tersisa adalah
  konten yang terlihat.
- **Konten tersembunyi sampai JS berjalan, dan itu keputusan sadar.** Efeknya
  hanya terlihat kalau elemen memang mulai dari tersembunyi. Yang menjaganya
  tetap aman: `onMotionOK` tidak menjalankan apa pun untuk pengguna reduced
  motion, dan tanpa JavaScript tidak ada satu pun gaya yang dipasang. Sisa
  risikonya satu — GSAP hidup tapi ScrollTrigger gagal menyala.
- **`autoAlpha`, bukan `opacity`.** Pada nilai 0 GSAP ikut memasang
  `visibility: hidden`, jadi elemen yang belum muncul tidak menangkap klik dan
  tidak dibacakan screen reader. Cek: setelah semua section dikunjungi, tidak
  boleh ada elemen `[data-reveal]` yang masih `visibility: hidden`.
- Garis kepala dianimasikan dengan `scaleX`, bukan `width`: `width` memicu layout
  tiap frame, `scaleX` hanya compositing.
- **Ambang `start: 'top 68%'`, bukan 88%.** Di 88% section baru mengintip 12%
  dari tepi bawah: animasinya berjalan sementara orang masih membaca section
  sebelumnya, dan begitu ia benar-benar sampai semuanya sudah selesai — efeknya
  ada di kode tapi tidak pernah terlihat. Lebih rendah dari 68% berbalik jadi
  masalah lain: teks yang baru mulai muncul saat sudah di tengah layar membuat
  orang menunggu bacaannya.
- **ScrollTrigger harus di-refresh setelah font selesai dimuat.** Posisi tiap
  trigger dihitung sekali dan dipakai sampai disuruh hitung ulang, sementara
  Anton baru menggantikan font sistem setelah woff2-nya turun — tiap judul
  berubah tinggi dan semua section di bawahnya bergeser. Terukur: sebelum
  refresh ini, ambang 68% menyala saat Pengalaman dan Project masih di 95% dan
  Stack di 104%, yaitu sebelum section-nya kelihatan sama sekali. Accordion juga
  memanggil `refresh()` setelah animasinya selesai, karena membuka panel
  menggeser semua yang ada di bawahnya.
- `once: true` di semua ScrollTrigger. Animasi yang mengulang tiap kali orang
  menggulung naik-turun berhenti jadi sambutan dan mulai jadi gangguan. Efek
  sampingnya: trigger yang sudah menyala hilang dari `ScrollTrigger.getAll()` —
  itu normal, bukan tanda gagal.
- Semua animasi lewat `onMotionOK()` di `src/lib/motion.js`.
- Carousel berhenti berputar total pada `prefers-reduced-motion`, bukan
  melambat. Rotasi otomatis adalah gerak yang tidak diminta siapa pun.
- Tidak ada: reveal fade-up per section, parallax, scroll-jacking, kursor
  kustom, counter angka naik dari nol.

## Aturan mobile

Diuji di 320px dan 390px setiap kali ada perubahan layout.

- Nol overflow horizontal. `documentElement.scrollWidth === window.innerWidth`.
- Target sentuh ≥ 44px (dipasang lewat `@media (pointer: coarse)`).
- `100dvh`, bukan `100vh`. `env(safe-area-inset-bottom)` pada bar bawah.
- Nav jadi bar bawah di zona ibu jari; index pakai `<dialog>` native — punya
  `::backdrop`, tutup dengan Escape, kunci fokus, dan hidup di top layer, jadi
  tidak bisa terpotong `overflow:hidden` container mana pun (cara paling umum
  menu mobile rusak tanpa ketahuan).
- **Aset berat tidak dirender, bukan disembunyikan.** `<video autoplay>` dan
  `<img>` tetap diunduh walau `display:none` — diukur, sembilan pratinjau brand
  (216 KB) terunduh di HP untuk hover yang tidak mungkin terjadi. Keduanya kini
  dipagari `matchMedia` di JS, bukan CSS.

## OG image

`public/og-image.jpg`, 1200×630. Dibuat dari desain situs sendiri, bukan digambar
terpisah: kalimatnya sama dengan hero, fontnya Anton + Switzer yang sama, warnanya
token yang sama. Kartu preview yang kalimatnya beda dari halamannya membuat orang
merasa salah klik.

Cara membuat ulang:

1. Buat `public/_og.html` berisi kartu 1200×630 (tidak perlu responsif — berkas
   ini dirender sekali jadi gambar, tidak pernah dikunjungi orang).
2. Screenshot pada viewport 1200×630 **DPR 2**, lalu turunkan ke 1200×630 dengan
   Lanczos. Menangkap langsung di DPR 1 menghasilkan tepi huruf yang kasar.
3. Hapus `_og.html` — kalau ikut ter-deploy, ia jadi halaman publik yang bisa
   diindeks.

Dua hal yang mudah salah:

- **Pemenggalan baris headline ditulis manual**, tidak dibiarkan membungkus
  sendiri. Anton pada `line-height` di bawah 1 punya glyph yang lebih tinggi
  daripada kotak barisnya, jadi baris hasil pembungkusan otomatis saling
  bertumpuk — dan `margin-top` negatif antar baris memperparahnya.
- **URL-nya diberi `?v=N`.** WhatsApp, X, dan LinkedIn men-cache kartu preview
  dengan agresif; tanpa URL yang berubah mereka menampilkan gambar lama
  berbulan-bulan. Naikkan angkanya setiap kali gambarnya diganti.

## Sebelum merge

1. Ukur ulang kontras kalau ada warna yang berubah. **`getComputedStyle`
   mengembalikan `oklch()` mentah di Chrome modern**; perhitungan naif di atasnya
   menghasilkan angka palsu (pernah melaporkan 205 kegagalan yang tidak ada).
   Konversi warnanya lewat canvas dulu.
2. Uji 320px dan 390px: overflow, target sentuh, kata terpanjang di headline.
3. Cek halaman dengan JavaScript mati — `<noscript>` harus tetap memuat siapa,
   apa, dan cara menghubungi.
4. Focus ring terlihat di setiap elemen interaktif, di latar terang dan gelap.

## Yang ditolak dengan sadar

Krem/sand sebagai latar; aksen terracotta; eyebrow all-caps di atas setiap
heading; grid kartu identik dengan radius dan shadow seragam; gradient text;
glassmorphism; WebGL/Three.js (kepribadian pinjaman untuk portofolio backend,
dan ~150 KB JS di situs yang klaimnya justru performa); monospace untuk label
kecil; panah `↗` sebagai karakter di dalam teks tombol (dirender SVG terpisah
ber-`aria-hidden`, supaya tidak ikut terbaca screen reader dan tidak ikut
ter-copy).
