import React from 'react'

export default function SectionDownArrow({ targetId, label = "NEXT" }) {
  const handleClick = (e) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        title={`Lanjut ke section #${targetId}`}
        className="group flex flex-col items-center gap-1 font-pixel text-[9px] text-sand/75 hover:text-cream transition-all cursor-pointer select-none"
      >
        <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity tracking-widest text-[8px] text-copper">
          {label}
        </span>
        <div
          className="w-7 h-7 border-2 border-copper bg-surface/90 flex items-center justify-center transition-transform group-hover:translate-y-0.5 animate-bounce shadow-md"
          style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
        >
          <svg viewBox="0 0 10 10" fill="currentColor" className="w-3.5 h-3.5 text-copper group-hover:text-cream pixelated" aria-hidden="true">
            <rect x="1" y="2" width="8" height="2" />
            <rect x="2" y="4" width="6" height="2" />
            <rect x="3" y="6" width="4" height="2" />
            <rect x="4" y="8" width="2" height="2" />
          </svg>
        </div>
      </a>
    </div>
  )
}
