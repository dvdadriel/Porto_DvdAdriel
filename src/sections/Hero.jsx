import React, { useRef } from 'react'
import MarioAvatarBox from '../components/MarioAvatarBox.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'

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
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-20 pb-4 relative overflow-hidden"
    >
      {/* Main Game Stage Area */}
      <div className="grid md:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-12 items-center my-auto w-full">
        {/* Kolom Kiri: Mario Game Avatar Box */}
        <div data-hero-item className="flex justify-center md:justify-start">
          <MarioAvatarBox />
        </div>

        {/* Kolom Kanan: Profile Briefing Dialog Box */}
        <div
          data-hero-item
          className="border-2 border-copper bg-surface/85 p-4 sm:p-6 flex flex-col justify-between max-h-[68vh] overflow-y-auto"
          style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
        >
          {/* Header Title */}
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-copper/40 pb-3 mb-3">
              <div>
                <p className="font-pixel text-[11px] sm:text-[13px] text-sand tracking-widest">
                  <ShuffleText text={t.hero.headline} key={t.hero.headline} />
                </p>
                <h1 className="font-pixel text-[20px] sm:text-[28px] md:text-[34px] text-cream leading-[1.3] tracking-wide mt-1">
                  <ShuffleText text={t.hero.name} key={t.hero.name} />
                </h1>
              </div>
              <span className="font-pixel text-[10px] text-sand/80 bg-ink/90 border border-copper/60 px-2 py-1 shrink-0">
                {t.hero.stageBadge}
              </span>
            </div>

            {/* Exact User Description from Point 7 */}
            <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-normal text-justify sm:text-left">
              {t.hero.tagline}
            </p>
          </div>

          {/* Action buttons */}
          <div className="mt-5 pt-3 border-t border-copper/30 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-pixel text-[11px] sm:text-[12px] border-2 border-copper bg-ink text-cream hover:bg-copper px-4 py-2.5 tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
            >
              <span>{t.hero.startBtn}</span>
              <span className="text-copper group-hover:text-cream">↓</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-pixel text-[11px] sm:text-[12px] border-2 border-copper/60 bg-surface/50 text-sand hover:text-cream hover:border-copper px-4 py-2.5 tracking-wider transition-colors"
            >
              {t.hero.contactBtn}
            </a>
          </div>
        </div>
      </div>

      {/* 8-bit Ground Stage Terrain Strip at bottom */}
      <div className="w-full border-t-2 border-copper/60 pt-2 flex items-center justify-between text-[10px] font-pixel text-sand/60">
        <div className="flex items-center gap-2">
          <span className="text-copper">■■■</span>
          <span className="hidden sm:inline">8-BIT ARCADE STAGE</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-copper">
          <span>▲</span>
          <span>▼</span>
          <span>◄</span>
          <span>►</span>
          <span className="ml-2 font-pixel text-[9px] text-sand/80">SCROLL TO PLAY</span>
        </div>
      </div>
    </section>
  )
}
