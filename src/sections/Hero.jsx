import React, { useRef, useState } from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import SectionDownArrow from '../components/SectionDownArrow.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Hero sebagai title card, bukan level.
 *
 * Satu pekerjaan: mengumumkan siapa ini dan apa pendiriannya. Biodata pindah ke
 * About di bawah — hero yang membacakan CV adalah hero yang kehilangan fokus.
 *
 * UKURAN font-pixel: hanya kelipatan 8, minimum 16px. Ini aturan yang sudah
 * didokumentasikan di index.css dan berlaku karena Press Start 2P digambar pada
 * grid 8x8 — di 11px atau 13px pikselnya jatuh di antara piksel layar dan hasilnya
 * buram, merusak justru hal yang ingin dicapai.
 */
export default function Hero() {
  const { t } = useLanguage()
  const ref = useRef(null)

  // Foto tampil saat hover. `pinned` menutup celahnya: perangkat sentuh tidak punya
  // hover, jadi tanpa ini foto tidak akan pernah bisa dilihat di tablet — dan
  // pengguna keyboard tidak punya cara membukanya sama sekali.
  const [pinned, setPinned] = useState(false)

  // Nama masuk baris per baris dengan easing bertangga. Fade adalah kosakata gerak
  // yang salah di sini: layar judul 8-bit menghentak, tidak melarut.
  useGSAP(
    () =>
      onMotionOK(() => {
        gsap.from('[data-boot]', {
          opacity: 0,
          x: -14,
          duration: 0.4,
          stagger: 0.11,
          ease: 'steps(4)',
        })
      }),
    { scope: ref }
  )

  const nameLines = t.hero.name.split(' ')

  return (
    <section
      id="hero"
      ref={ref}
      className="h-screen min-h-screen snap-start snap-always flex items-center px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-16 pb-16 relative select-none"
    >
      {/* Flex, bukan grid 1fr_auto: dengan 1fr kolom teks memuai memenuhi lebar dan
          mendorong portrait ke tepi kanan. Flex membuat portrait duduk tepat di
          sebelah tekstnya. */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
        {/* Blok tipografi — bagian terbesar dan terpenting di halaman */}
        <div className="min-w-0 lg:max-w-2xl">
          {/* Penanda ▶ inline, bukan flex item: sebagai flex item ia terlempar ke
              barisnya sendiri begitu teks membungkus.

              Lokasi disembunyikan di layar sempit — 'FULLSTACK DEVELOPER · JAKARTA'
              di 16px Press Start 2P butuh ~450px dan tidak mungkin muat satu baris
              di ponsel, sementara membungkusnya meninggalkan '·' menggantung. Lokasi
              tetap dinyatakan di About dan Kontak. */}
          <p
            data-boot
            className="font-pixel text-[16px] text-sand tracking-widest flex items-center gap-2 leading-none"
          >
            <span className="text-copper">▶</span>
            <span>
              {t.hero.role}
              <span className="hidden sm:inline"> · {t.hero.location}</span>
            </span>
          </p>

          {/* Jarak baris dan offset shadow ikut mengecil bersama ukuran font —
              shadow 6px pada nama 32px menimpa baris di bawahnya. */}
          <h1 className="mt-5 sm:mt-7 flex flex-col gap-3 sm:gap-3 lg:gap-2">
            {nameLines.map((line) => (
              <span
                key={line}
                data-boot
                className="font-pixel text-[32px] sm:text-[40px] lg:text-[56px] text-cream leading-none tracking-tight [text-shadow:3px_3px_0_var(--color-copper)] lg:[text-shadow:6px_6px_0_var(--color-copper)]"
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            data-boot
            className="mt-7 sm:mt-9 font-pixel text-[16px] sm:text-[24px] text-copper leading-snug"
          >
            {t.hero.thesis}
          </p>

          <p
            data-boot
            className="mt-4 text-[13px] sm:text-sm text-cream/85 leading-relaxed max-w-xl"
          >
            {t.hero.sub}
          </p>

          {/* Bahasa sebagai satu baris tenang, bukan barisan logo. Logonya sudah
              dimiliki section STACK — hero tidak perlu mengulanginya. */}
          <p
            data-boot
            className="mt-6 pt-5 border-t border-copper/25 text-[11px] sm:text-xs text-sand tracking-wider max-w-xl"
          >
            {t.hero.stack.join('  ·  ')}
          </p>

          <div data-boot className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="font-pixel text-[16px] border-2 border-copper bg-ink text-cream hover:bg-copper hover:text-ink px-5 py-3 tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0.5 flex items-center gap-2"
              style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
            >
              {t.hero.startBtn}
            </a>

            <a
              href="#contact"
              className="font-pixel text-[16px] border-2 border-copper/50 text-sand hover:text-cream hover:border-copper px-5 py-3 tracking-wider transition-colors"
            >
              {t.hero.contactBtn}
            </a>
          </div>
        </div>

        {/* Portrait pilih-karakter. Satu-satunya kotak berbingkai di hero ini —
            begitu ada dua, tidak ada yang jadi fokus.

            Default sprite piksel; foto muncul saat hover. Keduanya tetap ter-mount
            dan hanya opacity-nya yang ditukar, jadi foto sudah termuat sebelum
            kebagian tampil dan tidak berkedip saat pertama di-hover.

            Interaksinya bergaya shadcn — angkat sedikit, border menguat, crossfade
            halus. Yang TIDAK diambil dari shadcn: shadow blur lembutnya. Hard offset
            shadow adalah tanda tangan halaman ini, dan menukarnya di satu elemen
            akan membuatnya asing di antara semua kartu lain. Offsetnya tumbuh, bukan
            berubah jenis.

            box-shadow dipindah dari style inline ke class: inline style menang atas
            variant apa pun, jadi hover:shadow tidak akan pernah berlaku.

            Transisinya didaftar eksplisit, BUKAN transition-all. GSAP menulis
            `opacity` inline di elemen ini untuk animasi boot; transition-all membuat
            CSS ikut mengklaim properti yang sama dan tweennya tersangkut di 0 —
            portrait tidak muncul sama sekali. Batasi CSS pada properti yang memang
            miliknya. */}
        <button
          type="button"
          data-boot
          onClick={() => setPinned((v) => !v)}
          aria-pressed={pinned}
          aria-label={pinned ? 'Tampilkan sprite piksel' : 'Tampilkan foto asli'}
          className="group hidden lg:block relative w-[240px] aspect-[2/3] shrink-0 cursor-pointer overflow-hidden border-2 border-copper bg-surface transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-cream [box-shadow:6px_6px_0_var(--color-shadow)] hover:[box-shadow:10px_10px_0_var(--color-shadow)]"
        >
          <img
            src="/portrait-david.jpg"
            alt={t.hero.name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
              pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />

          {/* Sprite dijangkarkan ke bawah, bukan dipusatkan: di foto David berdiri
              di tanah, jadi memusatkan sprite membuat kepalanya melompat saat
              berganti. Kanvas GIF-nya punya padding sendiri, jadi ia dibesarkan
              melampaui lebar bingkai dan sisanya dipotong. */}
          <div
            className={`absolute inset-0 flex translate-y-[13%] items-end justify-center transition-opacity duration-300 ease-out ${
              pinned ? 'opacity-0' : 'group-hover:opacity-0'
            }`}
          >
            <PixelCharacter action="waving" size={320} bob />
          </div>
        </button>
      </div>

      <SectionDownArrow targetId="about" label={t.nav.about} />
    </section>
  )
}
