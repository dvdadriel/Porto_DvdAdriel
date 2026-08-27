import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'
import { profile } from '../data/profile.js'

export default function Hero() {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from('[data-hero-item]', {
      opacity: 0, y: 28, duration: 0.9, ease: EASE, stagger: 0.12, delay: 0.1,
    })
  }), { scope: ref })

  return (
    <section ref={ref} className="min-h-svh flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      <img
        data-hero-item
        src={profile.avatar}
        alt=""
        width="96" height="96"
        className="w-24 h-24 rounded-full border border-line mb-10"
      />
      <p data-hero-item className="font-mono text-sm text-fg-dim mb-5">{profile.headline}</p>
      <h1 data-hero-item className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
        {profile.name}
      </h1>
      <p data-hero-item className="mt-7 text-lg md:text-xl text-fg-dim max-w-2xl leading-relaxed">
        {profile.tagline}
      </p>
      <div data-hero-item className="mt-12 font-mono text-xs text-fg-dim" aria-hidden="true">
        ↓ scroll
      </div>
    </section>
  )
}
