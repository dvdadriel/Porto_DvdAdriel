import React, { useState } from 'react'
import ShuffleText from '../components/ShuffleText.jsx'
import SectionDownArrow from '../components/SectionDownArrow.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function TechStack() {
  const { t } = useLanguage()
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <section
      id="stack"
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-12 relative overflow-hidden"
    >
      <div className="mb-4 sm:mb-6">
        <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">{t.stack.sectionNum}</p>
        <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
          <ShuffleText text={t.stack.title} key={t.stack.title} />
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-cream/75 font-normal">
          {t.stack.subtitle}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
        {t.stack.categories.map((group) => (
          <div
            key={group.category}
            className="border-2 border-copper bg-surface p-4 sm:p-5 flex flex-col justify-between"
            style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-copper/40 pb-2 mb-3">
                <h3 className="font-pixel text-[10px] sm:text-[11px] text-sand tracking-wider">
                  {group.category}
                </h3>
                <span className="text-copper font-mono text-[10px]">■■</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const isHovered = hoveredSkill === skill
                  return (
                    <span
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`font-pixel text-[9px] sm:text-[10px] px-2.5 py-1.5 border transition-all cursor-default select-none ${
                        isHovered
                          ? 'border-cream bg-copper text-cream -translate-y-0.5 scale-105'
                          : 'border-copper/70 bg-ink/80 text-cream/90 hover:border-copper'
                      }`}
                      style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
                    >
                      {skill}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Down Arrow Indicator to About */}
      <SectionDownArrow targetId="contact" label={t.nav.contact} />
    </section>
  )
}
