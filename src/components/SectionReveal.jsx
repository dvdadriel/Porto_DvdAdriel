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
 * `start` 68%, bukan 88%. Di 88% section baru mengintip 12% dari tepi bawah,
 * animasinya berjalan sementara orang masih membaca section sebelumnya, dan
 * begitu ia benar-benar sampai semuanya sudah selesai — efeknya ada di kode
 * tapi tidak pernah terlihat. Di 68% ambangnya jatuh saat sepertiga section
 * sudah masuk layar, yaitu saat orang memang sedang menuju ke sana.
 *
 * Lebih rendah dari itu berbalik jadi masalah lain: teks yang animasinya baru
 * mulai ketika sudah di tengah layar membuat orang menunggu bacaannya.
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
          scrollTrigger: { trigger: root.current, start, once: true },
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
    { scope: root, dependencies: [start, stagger] }
  )

  return (
    <section id={id} ref={root} className={className}>
      {children}
    </section>
  )
}
