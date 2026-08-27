import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, onMotionOK } from '../lib/motion.js'
import PixelCharacter from './PixelCharacter.jsx'

/**
 * Karakter yang menyusuri halaman mengikuti scroll.
 *
 * Perilakunya:
 * - Posisi horizontal mengikuti progres scroll: atas halaman = kiri,
 *   bawah halaman = kanan. Jadi ia benar-benar BERPINDAH, bukan jalan di tempat.
 * - Menghadap kanan saat scroll turun, kiri saat scroll naik. Sprite empat arah
 *   memang ada untuk ini.
 * - Berhenti dan menghadap depan saat scroll berhenti. Inilah yang membuatnya
 *   terasa seperti karakter, bukan animasi yang berputar tanpa sebab.
 *
 * Sepenuhnya dekoratif: aria-hidden dan pointer-events none. Karena itu pada
 * prefers-reduced-motion ia TIDAK dirender sama sekali — tujuannya semata gerak,
 * jadi menyembunyikannya tidak menghilangkan informasi apa pun.
 */
export default function WalkingBuddy({ scale = 3 }) {
  const box = useRef(null)
  const [state, setState] = useState({ dir: 'front', flip: false, walking: false })

  useGSAP(() => onMotionOK(() => {
    const el = box.current
    if (!el) return

    // quickTo: setter GSAP yang dioptimasi untuk update per-frame.
    // Diberi easing supaya langkahnya tidak menyentak saat scroll cepat.
    const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power2.out' })

    let stopTimer
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        // Lebar jelajah: sisakan margin supaya tidak menempel tepi layar.
        const margin = 24
        const span = Math.max(0, window.innerWidth - 40 * scale - margin * 2)
        moveX(margin + self.progress * span)

        // Selalu sprite 'right' (satu-satunya tampak samping yang menghadap
        // kanan), lalu dicerminkan untuk arah sebaliknya. Sprite 'left' TIDAK
        // dipakai untuk arah karena ia juga menghadap kanan.
        setState({ dir: 'right', flip: self.direction !== 1, walking: true })

        // Scroll berhenti -> karakter berhenti dan menghadap depan.
        clearTimeout(stopTimer)
        stopTimer = setTimeout(() => setState({ dir: 'front', flip: false, walking: false }), 320)
      },
    })

    return () => { clearTimeout(stopTimer); st.kill() }
  }), { dependencies: [scale] })

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="fixed bottom-0 left-0 z-40 pointer-events-none hidden md:block"
    >
      <PixelCharacter
        dir={state.dir}
        walking={state.walking}
        flip={state.flip}
        scale={scale}
        cadence={0.26}
      />
    </div>
  )
}
