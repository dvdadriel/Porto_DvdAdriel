import React, { useEffect, useRef } from 'react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Kursor kustom: satu titik yang mengikuti persis, satu cincin yang tertinggal.
 *
 * Selisih kecepatan itulah seluruh efeknya. Kalau keduanya bergerak sama cepat,
 * yang terlihat cuma kursor bawaan yang digambar ulang; kalau cincinnya terlalu
 * lambat, ia berhenti terbaca sebagai bagian dari kursor dan jadi benda kedua
 * yang mengganggu.
 *
 * Tiga hal yang membuat ini tidak merusak kegunaan halaman:
 *
 * 1. Hanya dipasang kalau `(pointer: fine)` DAN reduced motion tidak diminta.
 *    Di layar sentuh tidak ada yang bisa diganti, dan mengganti penunjuk orang
 *    yang sudah bilang "kurangi gerak" adalah persis hal yang dilarang.
 * 2. `cursor: none` dipasang lewat class di <html>, bukan di CSS tanpa syarat.
 *    Kalau komponen ini gagal mount karena alasan apa pun, kursor bawaan tetap
 *    ada — arah gagal yang benar.
 * 3. Deteksi elemen interaktif pakai event delegation di document
 *    (pointerover/pointerout), bukan listener per elemen. Kartu project dan
 *    accordion di halaman ini muncul dan hilang saat di-scroll, dan listener
 *    per elemen akan kehilangan jejak setiap kali React merender ulang.
 */

const HOT = 'a, button, [role="button"], summary, input, select, textarea, [data-cursor-hot]'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    return onMotionOK(() => {
      const root = document.documentElement
      root.classList.add('has-cursor')

      // quickTo mengembalikan fungsi yang menulis ke tween yang sama berulang
      // kali, jadi tidak ada tween baru dibuat tiap pergerakan mouse. Membuat
      // gsap.to() per event akan menumpuk ratusan tween per detik.
      const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
      const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })
      const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3.out' })
      const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3.out' })

      let seen = false
      const move = (e) => {
        if (!seen) {
          // Lompatan pertama dipasang tanpa tween. Tanpa ini kursor selalu
          // terbang dari pojok kiri atas saat mouse pertama masuk halaman.
          seen = true
          gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY, autoAlpha: 1 })
        }
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      }

      // Keduanya ditandai, bukan cincinnya saja: cincin membesar dan titik
      // menghilang. Dua tanda yang berlawanan arah lebih cepat terbaca
      // daripada satu perubahan ukuran.
      const setHot = (e, value) => {
        if (!e.target.closest?.(HOT)) return
        ring.current.dataset.hot = value
        dot.current.dataset.hot = value
      }
      const over = (e) => setHot(e, 'true')
      const out = (e) => setHot(e, 'false')

      // Kursor disembunyikan saat pointer keluar jendela. Tanpa ini ia
      // menempel di tepi layar seperti sisa gambar.
      const leave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 })
      const enter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2 })

      window.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('pointerover', over)
      document.addEventListener('pointerout', out)
      document.addEventListener('pointerleave', leave)
      document.addEventListener('pointerenter', enter)

      return () => {
        root.classList.remove('has-cursor')
        window.removeEventListener('pointermove', move)
        document.removeEventListener('pointerover', over)
        document.removeEventListener('pointerout', out)
        document.removeEventListener('pointerleave', leave)
        document.removeEventListener('pointerenter', enter)
      }
    })
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" style={{ visibility: 'hidden' }} aria-hidden="true" />
      <div ref={dot} className="cursor-dot" style={{ visibility: 'hidden' }} aria-hidden="true" />
    </>
  )
}
