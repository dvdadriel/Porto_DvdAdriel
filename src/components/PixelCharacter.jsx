import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Karakter piksel dengan siklus jalan 2 frame.
 *
 * Dua hal yang KRUSIAL untuk animasi pixel art, dan keduanya mudah salah:
 *
 * 1. `steps()` pada timing function, bukan easing halus. Sprite harus MELOMPAT
 *    antar frame. Interpolasi apa pun akan menampilkan setengah frame satu dan
 *    setengah frame lain sekaligus.
 * 2. `image-rendering: pixelated` (kelas .pixelated). Tanpa ini browser akan
 *    memulus sprite saat diperbesar dan seluruh karakter 8-bit-nya hilang.
 *
 * Sprite di-scale dengan bilangan BULAT (SCALE) supaya tiap piksel sumber
 * memetakan ke kotak utuh di layar. Skala pecahan menghasilkan baris piksel
 * yang tebalnya tidak rata.
 */

const FRAME = { front: [40, 89], left: [38, 90], back: [38, 89], right: [39, 89] }
const SCALE = 4

export default function PixelCharacter({
  dir = 'front',
  walking = false,
  scale = SCALE,
  className = '',
}) {
  const [w, h] = FRAME[dir]
  const src = walking ? `/sprites/${dir}-walk.png` : `/sprites/${dir}-idle.png`
  const frames = walking ? 2 : 1
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    if (!walking) {
      // Diam pun tidak boleh benar-benar mati: bob satu piksel sumber
      // (= `scale` piksel layar) supaya karakter terasa bernapas.
      gsap.to(ref.current, {
        y: scale,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      })
    }
  }), { dependencies: [walking, scale, dir], scope: ref })

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Karakter piksel yang mewakili David"
      className={`pixelated ${className}`}
      style={{
        width: w * scale,
        height: h * scale,
        backgroundImage: `url(${src})`,
        backgroundSize: `${w * frames * scale}px ${h * scale}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        // Siklus jalan: geser background per frame, melompat dengan steps().
        animation: walking
          ? `sprite-walk-${dir} 0.45s steps(${frames}) infinite`
          : 'none',
      }}
    >
      <style>{`
        @keyframes sprite-walk-${dir} {
          from { background-position: 0 0; }
          to   { background-position: -${w * frames * scale}px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          /* Reduced motion: karakter tetap tampil, tapi berhenti bergerak.
             Menyembunyikannya akan menghilangkan konten, bukan gerak. */
          [role="img"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
