import PixelCharacter from '../components/PixelCharacter.jsx'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'
import { profile } from '../data/profile.js'

export default function Hero() {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    // steps() supaya teks pun muncul "berjenjang" seperti layar lama,
    // bukan meluncur halus. Konsisten dengan bahasa piksel halaman ini.
    gsap.from('[data-hero-item]', {
      opacity: 0, y: 16, duration: 0.6, ease: EASE, stagger: 0.1, delay: 0.15,
    })
  }), { scope: ref })

  return (
    <section
      ref={ref}
      className="min-h-svh flex items-center px-6 md:px-16 max-w-6xl mx-auto"
    >
      <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-20 items-center w-full">
        {/* Karakter dalam bingkai kotak — border 2px copper, sudut nol. */}
        <div
          data-hero-item
          className="border-2 border-copper bg-surface p-6 md:p-8 flex items-center justify-center"
          style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
        >
          <PixelCharacter action="waving" size={200} />
        </div>

        <div>
          <p data-hero-item className="font-pixel text-[16px] text-sand tracking-widest mb-6">
            FULLSTACK DEVELOPER
          </p>
          <h1
            data-hero-item
            className="font-pixel text-[32px] sm:text-[40px] md:text-[56px] text-cream leading-[1.45] tracking-wide"
          >
            DAVID<br />ADRIEL<br />ALVYN
            <span className="text-copper">▮</span>
          </h1>
          <p data-hero-item className="mt-8 text-base md:text-lg text-cream/80 max-w-xl leading-relaxed">
            {profile.tagline}
          </p>
          <p data-hero-item className="mt-12 font-pixel text-[16px] text-sand tracking-widest" aria-hidden="true">
            ↓ SCROLL
          </p>
        </div>
      </div>
    </section>
  )
}
