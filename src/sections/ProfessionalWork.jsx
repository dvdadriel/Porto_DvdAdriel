import React from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import { work } from '../data/work.js'

export default function ProfessionalWork() {
  const currentWork = work[0]

  return (
    <section
      id="work"
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-8 relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">01</p>
          <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
            <ShuffleText text="PENGALAMAN KERJA" />
          </h2>
        </div>
        <div
          className="hidden sm:flex border-2 border-copper bg-surface p-2 items-center justify-center shrink-0"
          style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
        >
          <PixelCharacter action="walking" size={54} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8 items-start">
        {/* Kolom Kiri: Role & Summary */}
        <div
          className="border-2 border-copper bg-surface p-4 sm:p-6"
          style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-copper/40 pb-3">
            <div>
              <h3 className="font-pixel text-[14px] sm:text-[18px] text-cream">
                {currentWork.role}
              </h3>
              <p className="text-sand text-sm mt-1">@ {currentWork.company}</p>
            </div>
            <span className="font-pixel text-[10px] sm:text-[11px] bg-ink px-2.5 py-1 text-copper border border-copper/60">
              {currentWork.period.toUpperCase()}
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-cream/80 leading-relaxed">
            {currentWork.summary}
          </p>

          <div className="mt-4 space-y-2">
            <p className="font-pixel text-[10px] text-sand tracking-wider">FOKUS TANGGUNG JAWAB:</p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-cream/70">
              {currentWork.doing.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="text-copper">▪</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: 9 Multi-brand Sites */}
        <div
          className="border-2 border-copper bg-surface/70 p-4 sm:p-6"
          style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
        >
          <div className="flex items-center justify-between mb-3 border-b border-copper/40 pb-2">
            <span className="font-pixel text-[11px] sm:text-[12px] text-sand tracking-wider">
              9 MULTI-BRAND SITUS
            </span>
            <span className="text-[10px] font-mono text-sand/60">PRODUKSI</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {currentWork.clients.map((c) => (
              <a
                key={c.brand}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-copper/70 bg-ink/80 p-2 sm:p-2.5 transition-all hover:-translate-y-0.5 hover:border-copper hover:bg-ink"
                style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
              >
                <span className="block font-pixel text-[10px] sm:text-[11px] text-cream group-hover:text-copper truncate">
                  {c.brand}
                </span>
                <span className="block mt-1 text-[9px] sm:text-[10px] text-sand/70 truncate">
                  {c.url.replace('https://', '')} ↗
                </span>
              </a>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-cream/50 leading-relaxed italic border-t border-copper/30 pt-3">
            * {currentWork.note}
          </p>
        </div>
      </div>
    </section>
  )
}
