import React from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import SectionDownArrow from '../components/SectionDownArrow.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-12 relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">{t.about.sectionNum}</p>
          <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
            <ShuffleText text={t.about.title} key={t.about.title} />
          </h2>
        </div>

        <div
          className="border-2 border-copper bg-surface p-2 flex items-center justify-center shrink-0"
          style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
        >
          <PixelCharacter action="waving" size={60} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start">
        {/* Filosofi & Prinsip Kerja */}
        <div
          className="border-2 border-copper bg-surface p-5 sm:p-6"
          style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
        >
          <div className="flex items-center gap-2 border-b border-copper/40 pb-3 mb-4">
            <span className="text-copper">★</span>
            <h3 className="font-pixel text-[12px] sm:text-[14px] text-cream">
              {t.about.philosophyTitle}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-normal">
            {t.about.philosophy1}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-cream/75 leading-relaxed font-normal">
            {t.about.philosophy2}
          </p>

          <div className="mt-5 border border-copper/50 bg-ink/70 p-3 font-pixel text-[10px] text-sand leading-relaxed">
            {t.about.quote}
          </div>
        </div>

        {/* Quest & Pendidikan */}
        <div className="space-y-4">
          <div
            className="border-2 border-copper bg-surface p-4 sm:p-5"
            style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
          >
            <div className="flex items-center justify-between border-b border-copper/40 pb-2 mb-3">
              <span className="font-pixel text-[11px] sm:text-[12px] text-sand tracking-wider">
                {t.about.educationTitle}
              </span>
              <span className="text-[10px] font-mono text-copper">{t.about.educationBadge}</span>
            </div>

            <p className="font-pixel text-[12px] sm:text-[13px] text-cream">{t.about.school}</p>
            <p className="text-xs sm:text-sm text-sand mt-1 font-normal">{t.about.major}</p>
            <p className="font-pixel text-[10px] text-sand/60 mt-1">{t.about.period}</p>
          </div>

          <div
            className="border-2 border-copper/70 bg-ink/80 p-4"
            style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
          >
            <p className="font-pixel text-[10px] sm:text-[11px] text-sand mb-2">
              {t.about.locationTitle}
            </p>
            <p className="text-xs sm:text-sm text-cream flex items-center gap-2 font-normal">
              <span className="text-copper">📍</span> {t.about.location}
            </p>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator to Contact */}
      <SectionDownArrow targetId="contact" label="CONTACT" />
    </section>
  )
}
