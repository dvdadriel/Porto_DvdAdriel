import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Efek masuk saat section pertama kali terlihat.
 *
 * Dibuat satu komponen, bukan ditulis ulang di tiap section, karena itu
 * satu-satunya cara menjaga ritmenya sama. Efek masuk yang durasinya
 * berbeda-beda antar-section terbaca sebagai halaman yang dirakit dari
 * potongan.
 *
 * Tiga jenis target, dan urutannya adalah urutan bacanya:
 *   [data-reveal-mask]  judul, naik dari balik batas barisnya
 *   [data-reveal]       teks pendukung, fade-up
 *   [data-tile]         ubin bento, naik + membesar sedikit dari 0.97
 *
 * Ubin sengaja beda dari teks: ia BENDA, bukan kalimat. Skala kecil yang
 * menyusul membuatnya terbaca seperti kartu yang diletakkan ke tempatnya,
 * bukan teks yang muncul.
 *
 * ── Keadaan awal ────────────────────────────────────────────────────────────
 * Dipakai `fromTo()` dengan `immediateRender: true` (bawaannya), BUKAN
 * `gsap.set()` diikuti `.to()`. Bedanya bukan gaya penulisan: `set()`
 * memisahkan keadaan tersembunyi dari tween yang membukanya, jadi kalau
 * tween-nya mati — di-revert, di-kill, atau komponennya dipasang ulang —
 * `set()` tertinggal dan elemennya macet tersembunyi selamanya. Ini bukan
 * dugaan; versi `set()` + `to()` membuat hero membeku di keadaan tersembunyi
 * saat React StrictMode memasang komponen dua kali di mode dev.
 *
 * Dengan `fromTo()`, keadaan tersembunyi itu milik tween. Kalau tween-nya
 * hilang, keadaan tersembunyinya ikut hilang, dan yang tersisa adalah konten
 * yang terlihat — arah gagal yang benar.
 *
 * `autoAlpha`, bukan `opacity`: pada nilai 0 GSAP ikut memasang
 * `visibility: hidden`, jadi elemen yang belum muncul tidak menangkap klik dan
 * tidak dibacakan screen reader.
 *
 * ── Ambang ──────────────────────────────────────────────────────────────────
 * `start` 72%, bukan 88%. Di 88% section baru mengintip 12% dari tepi bawah,
 * animasinya berjalan sementara orang masih membaca section sebelumnya, dan
 * begitu ia benar-benar sampai semuanya sudah selesai.
 */
export default function SectionReveal({
  children,
  stagger = 0.07,
  start = 'top 72%',
  className,
  id,
}) {
  const root = useRef(null)

  useGSAP(
    () => {
      return onMotionOK(() => {
        const q = (sel) => gsap.utils.toArray(root.current.querySelectorAll(sel))
        const masks = q('[data-reveal-mask]')
        const targets = q('[data-reveal]')
        const tiles = q('[data-tile]')
        if (!masks.length && !targets.length && !tiles.length) return

        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: root.current, start, once: true },
        })

        if (targets.length) {
          tl.fromTo(targets, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05 })
        }

        if (masks.length) {
          tl.fromTo(masks, { yPercent: 112 }, { yPercent: 0, duration: 0.95, stagger: 0.07 }, 0.05)
        }

        if (tiles.length) {
          tl.fromTo(
            tiles,
            { y: 26, scale: 0.975, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 0.85, stagger },
            '-=0.55'
          )
        }
      })
    },
    { scope: root, dependencies: [start, stagger] }
  )

  return (
    <section id={id} ref={root} className={className}>
      {children}
    </section>
  )
}
