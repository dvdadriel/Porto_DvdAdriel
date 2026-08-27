import React, { useRef } from 'react'
import MarioAvatarBox from '../components/MarioAvatarBox.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'
import { profile } from '../data/profile.js'

export default function Hero() {
  const { t } = useLanguage()
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from('[data-hero-item]', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: EASE,
      stagger: 0.08,
      delay: 0.1,
    })
  }), { scope: ref })

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-8 relative overflow-hidden"
    >
      {/* 8-bit HUD Status Bar */}
      <div
        data-hero-item
        className="flex flex-wrap items-center justify-between gap-2 border-2 border-copper bg-surface/90 px-4 py-2 mb-6 sm:mb-8 font-pixel text-[10px] sm:text-[12px] text-sand"
        style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-copper">●</span>
          <span>{t.nav.player}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>HP: <span className="text-copper">■■■■■</span></span>
          <span className="hidden sm:inline">{t.nav.world}</span>
          <span className="text-cream">{t.nav.status}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-6 sm:gap-10 lg:gap-16 items-center w-full">
        {/* Karakter Avatar 8-bit dengan Mario Question Box di dalam border */}
        <div data-hero-item className="flex justify-center md:justify-start">
          <MarioAvatarBox />
        </div>

        {/* Info & Headline */}
        <div>
          <p data-hero-item className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest mb-3 sm:mb-4">
            <span className="text-copper mr-2">▶</span>
            <ShuffleText text={t.hero.headline} key={t.hero.headline} />
          </p>

          {/* Nama tanpa kursor ketik di bawah/samping */}
          <h1
            data-hero-item
            className="font-pixel text-[26px] sm:text-[36px] md:text-[48px] text-cream leading-[1.35] tracking-wide mb-2"
          >
            <ShuffleText text={t.hero.name} key={t.hero.name} />
          </h1>

          {/* Tagline / Deskripsi Terjemahan Bersih */}
          <p data-hero-item className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-cream/90 max-w-xl leading-relaxed font-normal">
            {t.hero.tagline}
          </p>

          {/* Action buttons */}
          <div data-hero-item className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-pixel text-[12px] sm:text-[13px] border-2 border-copper bg-surface text-cream px-5 py-3 tracking-wider transition-transform hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
              style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
            >
              <span>{t.hero.startBtn}</span>
              <span className="text-copper">↓</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-pixel text-[12px] sm:text-[13px] border-2 border-copper/60 bg-surface/50 text-sand hover:text-cream px-5 py-3 tracking-wider transition-colors"
            >
              {t.hero.contactBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
