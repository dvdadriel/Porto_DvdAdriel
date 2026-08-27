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
export default function WalkingBuddy({ size = 80 }) {
  const box = useRef(null)
  const [state, setState] = useState({ flip: false })

  useGSAP(() => onMotionOK(() => {
    const el = box.current
    if (!el) return

    // quickTo: setter GSAP yang dioptimasi untuk update per-frame.
    // Diberi easing supaya langkahnya tidak menyentak saat scroll cepat.
    const moveX = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power2.out' })

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        // Lebar jelajah: sisakan margin supaya tidak menempel tepi layar.
        const margin = 20
        const span = Math.max(0, window.innerWidth - size - margin * 2)
        moveX(margin + self.progress * span)

        // Cerminkan arah menghadap: menghadap kanan saat scroll ke bawah, kiri saat scroll ke atas
        setState({ flip: self.direction === -1 })
      },
    })

    return () => { st.kill() }
  }), { dependencies: [size] })

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="fixed bottom-2 left-0 z-40 pointer-events-none hidden md:block"
    >
      <PixelCharacter
        action="walking"
        flip={state.flip}
        size={size}
      />
    </div>
  )
}
