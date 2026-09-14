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
 * Tiga aturan yang mengikat semua pemakaiannya:
 *
 * 1. `gsap.from()`, bukan `.to()` dari keadaan tersembunyi. Kalau visibilitas
 *    digantungkan pada transisi, section terkirim kosong ke tab background,
 *    renderer headless, dan crawler — tanpa ada yang tahu kenapa.
 * 2. `once: true`. Animasi yang mengulang tiap kali orang menggulung naik-turun
 *    berhenti jadi sambutan dan mulai jadi gangguan.
 * 3. Jarak geraknya kecil (18px). Ini penekanan, bukan pertunjukan; yang
 *    melintas setengah layar menahan pembacaan, bukan membantunya.
 *
 * `start` sengaja 88% — animasinya selesai sebelum elemen sampai ke tengah
 * layar, jadi orang tidak pernah menunggu teks yang belum muncul.
 */
export default function SectionReveal({ children, stagger = 0.08, className, id }) {
  const root = useRef(null)

  useGSAP(
    () => {
      return onMotionOK(() => {
        const targets = gsap.utils.toArray(root.current.querySelectorAll('[data-reveal]'))
        const rule = root.current.querySelector('[data-section-rule]')
        if (!targets.length) return

        // immediateRender: false WAJIB di sini. Tanpa itu gsap.from() menerapkan
        // keadaan awalnya begitu tween dibuat, jadi setiap section di bawah
        // layar langsung ber-opacity 0 — dan kalau ScrollTrigger tidak pernah
        // menyala (tab background, renderer headless, crawler), section itu
        // terkirim kosong. Diukur: sebelum perbaikan ini, elemen di #stack
        // punya opacity 0 pada saat muat.
        const tl = gsap.timeline({
          defaults: { ease: 'expo.out', immediateRender: false },
          scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
        })

        // Garis kepala section ditarik dari kiri. scaleX, bukan width: width
        // memicu layout di setiap frame, scaleX hanya compositing.
        if (rule) {
          tl.from(rule, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
          })
        }

        tl.from(targets, { y: 18, opacity: 0, duration: 0.7, stagger }, rule ? '-=0.55' : 0)
      })
    },
    { scope: root }
  )

  return (
    <section id={id} ref={root} className={className}>
      {children}
    </section>
  )
}
