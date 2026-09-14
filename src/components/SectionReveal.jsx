import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Efek masuk saat section pertama kali terlihat.
 *
 * Dibuat satu komponen, bukan ditulis ulang di tiap section, karena itu satu-
 * satunya cara menjaga ritmenya sama. Efek masuk yang durasinya berbeda-beda
 * antar-section terbaca sebagai halaman yang dirakit dari potongan.
 *
 * ── Keadaan awal ────────────────────────────────────────────────────────────
 * Elemen tersembunyi lebih dulu, lalu dibuka saat ScrollTrigger menyala.
 *
 * Dipakai `fromTo()` dengan `immediateRender: true` (bawaannya), BUKAN
 * `gsap.set()` diikuti `.to()`. Bedanya bukan gaya penulisan: `set()` memisahkan
 * keadaan tersembunyi dari tween yang membukanya, jadi kalau tween-nya mati —
 * di-revert, di-kill, atau komponennya dipasang ulang — `set()` tertinggal dan
 * elemennya macet tersembunyi selamanya. Ini bukan dugaan; versi `set()` + `to()`
 * membuat hero membeku di keadaan tersembunyi saat React StrictMode memasang
 * komponen dua kali di mode dev.
 *
 * Dengan `fromTo()`, keadaan tersembunyi itu milik tween. Kalau tween-nya hilang,
 * keadaan tersembunyinya ikut hilang, dan yang tersisa adalah konten yang
 * terlihat — arah gagal yang benar.
 *
 * Konsekuensi yang tetap harus disadari: kalau JavaScript jalan tapi
 * ScrollTrigger gagal menyala, section itu tersembunyi. Yang melindunginya,
 * `onMotionOK` tidak menjalankan apa pun untuk pengguna reduced motion, dan
 * tanpa JavaScript tidak ada satu pun gaya yang dipasang.
 *
 * `autoAlpha`, bukan `opacity`: pada nilai 0 GSAP ikut memasang
 * `visibility: hidden`, jadi elemen yang belum muncul tidak menangkap klik dan
 * tidak dibacakan screen reader.
 *
 * ── Ambang ──────────────────────────────────────────────────────────────────
 * `start` 68%, bukan 88%. Di 88% section baru mengintip 12% dari tepi bawah,
 * animasinya berjalan sementara orang masih membaca section sebelumnya, dan
 * begitu ia benar-benar sampai semuanya sudah selesai. Lebih rendah dari 68%
 * berbalik jadi masalah lain: teks yang baru mulai muncul saat sudah di tengah
 * layar membuat orang menunggu bacaannya.
 */
export default function SectionReveal({
  children,
  stagger = 0.08,
  start = 'top 68%',
  className,
  id,
}) {
  const root = useRef(null)

  useGSAP(
    () => {
      return onMotionOK(() => {
        const masks = gsap.utils.toArray(root.current.querySelectorAll('[data-reveal-mask]'))
        const targets = gsap.utils.toArray(root.current.querySelectorAll('[data-reveal]'))
        const rule = root.current.querySelector('[data-section-rule]')
        if (!masks.length && !targets.length) return

        const tl = gsap.timeline({
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: root.current, start, once: true },
        })

        // Garis kepala section ditarik dari kiri. scaleX, bukan width: width
        // memicu layout di setiap frame, scaleX hanya compositing.
        if (rule) {
          tl.fromTo(
            rule,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.8 }
          )
        }

        // Judul section naik dari balik garis — efek yang sama dengan headline
        // hero, jadi keduanya terbaca sebagai satu bahasa. yPercent, bukan y:
        // persentase mengikuti tinggi barisnya sendiri, jadi nomor "01" yang
        // kecil dan judul yang besar sama-sama tersembunyi penuh di titik mulai.
        if (masks.length) {
          tl.fromTo(
            masks,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, stagger: 0.07 },
            rule ? '-=0.6' : 0
          )
        }

        // Deskripsi dan isi section: fade-up. Sengaja beda dari judul — kalau
        // semuanya naik dari balik garis, tidak ada lagi yang menonjol.
        if (targets.length) {
          tl.fromTo(
            targets,
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger },
            '-=0.62'
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
