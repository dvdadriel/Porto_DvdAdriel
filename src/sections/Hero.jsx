import React, { useRef } from 'react'
import ShuffleText from '../components/ShuffleText.jsx'
import Terrain from '../components/Terrain.jsx'
import SectionDownArrow from '../components/SectionDownArrow.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'

export default function Hero() {
  const { t } = useLanguage()
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from('[data-hero-card]', {
      opacity: 0,
      y: 18,
      duration: 0.65,
      ease: EASE,
      delay: 0.1,
    })
  }), { scope: ref })

  return (
    <section
      id="hero"
      ref={ref}
      className="h-screen min-h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-16 pb-2 relative overflow-hidden select-none"
    >
      {/* 1. Floating Bio Dialog Box (Compact on the left as planned in Phase 4) */}
      <div className="w-full flex justify-start pt-4 sm:pt-6 z-10">
        <div
          data-hero-card
          className="border-2 border-copper bg-surface/90 backdrop-blur-md p-4 sm:p-6 max-w-xl sm:max-w-2xl shadow-2xl relative"
          style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
        >
          {/* Headline & Name */}
          <div className="border-b border-copper/40 pb-2.5 mb-2.5">
            <p className="font-pixel text-[11px] sm:text-[12px] text-sand tracking-widest flex items-center gap-1.5">
              <span className="text-copper">▶</span>
              <ShuffleText text={t.hero.headline} key={t.hero.headline} />
            </p>
            <h1 className="font-pixel text-[18px] sm:text-[26px] md:text-[30px] text-cream leading-[1.3] tracking-wide mt-1">
              <ShuffleText text={t.hero.name} key={t.hero.name} />
            </h1>
          </div>

          {/* Concise 3-line Hook Description */}
          <p className="text-xs sm:text-[13px] md:text-sm text-cream/90 leading-relaxed font-normal">
            {t.hero.tagline}
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-3.5 pt-2.5 border-t border-copper/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-pixel text-[10px] sm:text-[11px] border-2 border-copper bg-ink text-cream hover:bg-copper px-3.5 py-2 tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
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
                className="font-pixel text-[10px] sm:text-[11px] border-2 border-copper/60 bg-surface/50 text-sand hover:text-cream hover:border-copper px-3.5 py-2 tracking-wider transition-colors"
              >
                {t.hero.contactBtn}
              </a>
            </div>

            <span className="hidden sm:inline font-pixel text-[9px] text-sand/60">
              STAGE 1-1 · HILLTERRAIN
            </span>
          </div>
        </div>
      </div>

      {/* 2. Full-Width Continuous Terrain with Walking Character & Skill Boxes */}
      <div className="w-full mt-auto relative z-10">
        <Terrain className="w-full" />
      </div>

      {/* 3. Bottom-Center Down Arrow Indicator */}
      <SectionDownArrow targetId="work" label="WORK" />
    </section>
  )
}
