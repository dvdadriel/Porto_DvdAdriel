import React, { useRef, useCallback } from 'react'
import { useTerrainWalk } from '../hooks/useTerrainWalk.js'
import { VIEW, BOX_LIFT, LABEL_LIFT } from '../lib/terrain.js'
import PixelCharacter from './PixelCharacter.jsx'
import {
  RubyIcon,
  LaravelIcon,
  GoIcon,
  ReactIcon,
  CIcon,
  OutsystemsIcon,
  PostgresIcon,
  DockerIcon,
} from './SkillLogos.jsx'

export const STAGE_SKILLS = [
  { id: 'rails', name: 'RUBY ON RAILS', icon: RubyIcon },
  { id: 'laravel', name: 'LARAVEL', icon: LaravelIcon },
  { id: 'go', name: 'GOLANG', icon: GoIcon },
  { id: 'react', name: 'REACT', icon: ReactIcon },
  { id: 'c', name: 'C LANGUAGE', icon: CIcon },
  { id: 'outsystems', name: 'OUTSYSTEMS', icon: OutsystemsIcon },
  { id: 'postgres', name: 'POSTGRESQL', icon: PostgresIcon },
  { id: 'docker', name: 'DOCKER', icon: DockerIcon },
]

export default function Terrain({ className = '' }) {
  const spriteRef = useRef(null)

  // onFrame callback writes directly to the sprite transform via ref (0 React re-renders per frame)
  const onFrame = useCallback(({ x, y, angle, dir, jump }) => {
    const el = spriteRef.current
    if (!el) return
    const clampedAngle = Math.max(-14, Math.min(14, angle * 0.6))
    el.style.left = `${(x / VIEW.w) * 100}%`
    el.style.top = `${(y / VIEW.h) * 100}%`
    el.style.transform =
      `translate(-50%, -100%) ` +
      `translateY(${-jump * 36}px) ` +
      `rotate(${clampedAngle}deg) ` +
      `scaleX(${dir})`
  }, [])

  const { terrain, hitIdx, activeIdx } = useTerrainWalk({
    count: STAGE_SKILLS.length,
    onFrame,
  })

  return (
    <div className={`relative w-full h-[32vh] sm:h-[36vh] lg:h-[38vh] select-none overflow-visible ${className}`}>
      {/* 1. Background Hill Silhouettes & Foreground Ground SVG */}
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle 8-bit Ground Pattern */}
          <pattern id="ground-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="var(--color-surface)" />
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(162, 123, 92, 0.15)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Backdrop Hill Layer */}
        <path
          d={terrain.fillD}
          fill="var(--color-surface)"
          opacity="0.6"
          transform="scale(1.02, 1.05) translate(-10, -5)"
        />

        {/* Foreground Ground Silhouette with Pattern */}
        <path d={terrain.fillD} fill="url(#ground-grid)" />
        <path d={terrain.fillD} fill="var(--color-surface)" opacity="0.85" />

        {/* Ground Top Stroke (Copper line) */}
        <path
          d={terrain.strokeD}
          fill="none"
          stroke="var(--color-copper)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 2. Floating Skill Question Boxes */}
      {terrain.boxes.map((box, idx) => {
        const skill = STAGE_SKILLS[idx]
        const IconComp = skill.icon
        const isHit = hitIdx === idx
        const isActive = activeIdx === idx

        return (
          <div
            key={skill.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{
              left: `${(box.x / VIEW.w) * 100}%`,
              top: `${(box.y / VIEW.h) * 100}%`,
            }}
          >
            {/* Skill Label: Appears ONLY when hitIdx === idx */}
            {isHit && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-9 z-30 font-pixel text-[8px] sm:text-[10px] bg-copper text-cream px-2 py-0.5 sm:py-1 border-2 border-cream whitespace-nowrap shadow-xl animate-bounce"
                style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
              >
                {skill.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-copper" />
              </div>
            )}

            {/* 8-bit Square Question Box */}
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 aspect-square border-2 border-copper bg-ink/95 flex items-center justify-center transition-all duration-150 relative ${
                isHit
                  ? '-translate-y-3 scale-110 border-cream bg-copper shadow-xl'
                  : isActive
                  ? 'border-cream bg-surface'
                  : 'hover:border-cream'
              }`}
              style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
            >
              <IconComp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />

              {/* Pixel corner dots */}
              <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-copper/60" />
              <span className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-copper/60" />
              <span className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 bg-copper/60" />
              <span className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-copper/60" />
            </div>
          </div>
        )
      })}

      {/* 3. Pixel Character Sprite on Top of Ground (Driven by onFrame via ref) */}
      <div
        ref={spriteRef}
        className="absolute top-0 left-0 z-20 pointer-events-none transition-transform will-change-transform"
        style={{
          transformOrigin: '50% 100%',
        }}
      >
        <PixelCharacter action="walking" size={54} />
      </div>
    </div>
  )
}
