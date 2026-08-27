import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Karakter piksel dengan siklus jalan 2 frame.
 *
 * Dua hal KRUSIAL untuk animasi pixel art, keduanya mudah salah:
 *
 * 1. `steps()` pada timing, bukan easing halus. Sprite harus MELOMPAT antar
 *    frame; interpolasi menampilkan setengah frame satu dan setengah frame
 *    lain sekaligus.
 * 2. `image-rendering: pixelated`. Tanpa ini browser memulus sprite saat
 *    diperbesar dan seluruh karakter 8-bit-nya hilang.
 *
 * Skala selalu bilangan BULAT supaya tiap piksel sumber memetakan ke kotak
 * utuh di layar. Skala pecahan membuat tebal baris piksel tidak rata.
 *
 * Kenapa bukan GIF: GIF tidak bisa dihentikan oleh prefers-reduced-motion,
 * tidak bisa disinkronkan ke scroll, tidak bisa ganti arah, dan 1748 warna
 * sprite ini akan dikuantisasi ke 256. Sprite sheet + CSS lebih mampu.
 */

const FRAME = { front: [40, 89], left: [38, 90], back: [38, 89], right: [39, 89] }

export default function PixelCharacter({
  dir = 'front',
  walking = false,
  scale = 4,
  /** Kecepatan siklus jalan (detik untuk 2 frame). Lebih kecil = lebih hidup. */
  cadence = 0.3,
  /**
   * Cerminkan horizontal. WAJIB untuk berjalan ke kiri: sprite sheet sumber
   * menggambar SIDE L dan SIDE R sama-sama MENGHADAP KANAN (labelnya berarti
   * sisi tubuh, bukan arah pandang). Tanpa flip, karakter berjalan mundur.
   */
  flip = false,
  className = '',
}) {
  const [w, h] = FRAME[dir]
  const src = walking ? `/sprites/${dir}-walk.png` : `/sprites/${dir}-idle.png`
  const frames = walking ? 2 : 1
  const wrap = useRef(null)

  useGSAP(() => onMotionOK(() => {
    // Secondary motion. Inilah yang menghilangkan rasa kaku — trik NES klasik:
    // badan naik satu piksel sumber tepat saat kaki bertumpu. Tanpa ini,
    // dua frame walk terasa seperti gambar berkedip, bukan orang berjalan.
    const bob = gsap.to(wrap.current, {
      y: -scale,
      duration: walking ? cadence / 2 : 0.55,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',   // lompat, jangan meluncur — ini pixel art
    })
    return () => bob.kill()
  }), { dependencies: [walking, scale, dir, cadence, flip], scope: wrap })

  return (
    <div ref={wrap} className={className} style={{ width: w * scale, height: h * scale }}>
      <div
        role="img"
        aria-label="Karakter piksel yang mewakili David"
        className="pixelated"
        style={{
          width: w * scale,
          height: h * scale,
          backgroundImage: `url(${src})`,
          backgroundSize: `${w * frames * scale}px ${h * scale}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'pixelated',
          // Flip dipasang DI SINI, bukan di elemen luar. Elemen luar di-tween
          // GSAP (bob 'y'); GSAP mengelola transform-nya sendiri, jadi menaruh
          // transform inline di elemen yang sama akan saling menimpa —
          // flip hilang atau bob patah.
          transform: flip ? 'scaleX(-1)' : undefined,
          animation: walking
            ? `sprite-walk-${dir}-${scale} ${cadence}s steps(${frames}) infinite`
            : 'none',
        }}
      />
      <style>{`
        @keyframes sprite-walk-${dir}-${scale} {
          from { background-position: 0 0; }
          to   { background-position: -${w * frames * scale}px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          /* Karakter tetap TAMPIL, hanya berhenti bergerak. Menyembunyikannya
             akan menghilangkan konten, bukan sekadar gerak. */
          .pixelated { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
