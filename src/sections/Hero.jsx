import React, { useState, useEffect, useRef } from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import SectionDownArrow from '../components/SectionDownArrow.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import {
  RubyIcon,
  LaravelIcon,
  GoIcon,
  ReactIcon,
  CIcon,
  OutsystemsIcon,
  PostgresIcon,
  DockerIcon,
} from '../components/SkillLogos.jsx'

const STAGE_SKILLS = [
  { id: 'rails', name: 'RUBY ON RAILS', icon: RubyIcon },
  { id: 'laravel', name: 'LARAVEL', icon: LaravelIcon },
  { id: 'go', name: 'GO LANGUAGE', icon: GoIcon },
  { id: 'react', name: 'JAVASCRIPT / REACT', icon: ReactIcon },
  { id: 'c', name: 'C LANGUAGE', icon: CIcon },
  { id: 'outsystems', name: 'OUTSYSTEMS', icon: OutsystemsIcon },
  { id: 'postgres', name: 'POSTGRESQL', icon: PostgresIcon },
  { id: 'docker', name: 'DOCKER', icon: DockerIcon },
]

export default function Hero() {
  const { t } = useLanguage()
  const [activeSkillIdx, setActiveSkillIdx] = useState(0)
  const [charPosPercent, setCharPosPercent] = useState(10)
  const [isJumping, setIsJumping] = useState(false)
  const [hitBoxIdx, setHitBoxIdx] = useState(null)
  const animFrameRef = useRef(null)
  const dirRef = useRef(1) // 1 = right, -1 = left

  // Auto-running character along the full-width terrain track
  useEffect(() => {
    let lastTime = performance.now()
    const speed = 0.035 // speed percent per ms

    const runLoop = (time) => {
      const delta = time - lastTime
      lastTime = time

      setCharPosPercent((prev) => {
        let next = prev + dirRef.current * speed * delta

        // Check bounce at screen edges
        if (next >= 88) {
          dirRef.current = -1
          next = 88
        } else if (next <= 8) {
          dirRef.current = 1
          next = 8
        }

        // Check if passing near a skill box (calculate which box is nearby)
        const boxCount = STAGE_SKILLS.length
        const step = 80 / (boxCount - 1)
        const currentNearBox = Math.round((next - 8) / step)

        if (currentNearBox >= 0 && currentNearBox < boxCount) {
          const targetBoxPos = 8 + currentNearBox * step
          if (Math.abs(next - targetBoxPos) < 1.2 && !isJumping) {
            setIsJumping(true)
            setHitBoxIdx(currentNearBox)
            setActiveSkillIdx(currentNearBox)

            setTimeout(() => {
              setIsJumping(false)
              setHitBoxIdx(null)
            }, 360)
          }
        }

        return next
      })

      animFrameRef.current = requestAnimationFrame(runLoop)
    }

    animFrameRef.current = requestAnimationFrame(runLoop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isJumping])

  const activeSkill = STAGE_SKILLS[activeSkillIdx]

  return (
    <section
      id="hero"
      className="h-screen min-h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-16 pb-3 relative overflow-hidden select-none"
    >
      {/* 1. Floating Description Box in the Upper/Center Stage */}
      <div className="w-full max-w-5xl mx-auto my-auto z-10">
        <div
          className="border-2 border-copper bg-surface/90 backdrop-blur-md p-4 sm:p-6 shadow-2xl relative overflow-hidden"
          style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-copper/40 pb-2.5 mb-3">
            <div>
              <p className="font-pixel text-[11px] sm:text-[13px] text-sand tracking-widest flex items-center gap-1.5">
                <span className="text-copper">▶</span>
                <ShuffleText text={t.hero.headline} key={t.hero.headline} />
              </p>
              <h1 className="font-pixel text-[18px] sm:text-[26px] md:text-[32px] text-cream leading-[1.3] tracking-wide mt-1">
                <ShuffleText text={t.hero.name} key={t.hero.name} />
              </h1>
            </div>

            {/* Active Skill Power-Up Badge */}
            <div
              className="border-2 border-copper bg-ink/90 px-3 py-1.5 flex items-center gap-2"
              style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
            >
              <span className="font-pixel text-[9px] text-sand">SKILL:</span>
              <span className="font-pixel text-[10px] sm:text-[11px] text-cream tracking-wider font-bold">
                <ShuffleText text={activeSkill.name} key={activeSkill.id} />
              </span>
            </div>
          </div>

          {/* Full Bio Description Text */}
          <div className="max-h-[32vh] sm:max-h-[36vh] overflow-y-auto pr-1">
            <p className="text-xs sm:text-[13px] md:text-sm text-cream/90 leading-relaxed font-normal text-justify sm:text-left">
              {t.hero.tagline}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-3.5 pt-2.5 border-t border-copper/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-pixel text-[10px] sm:text-[12px] border-2 border-copper bg-ink text-cream hover:bg-copper px-4 py-2 tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
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
                className="font-pixel text-[10px] sm:text-[12px] border-2 border-copper/60 bg-surface/50 text-sand hover:text-cream hover:border-copper px-4 py-2 tracking-wider transition-colors"
              >
                {t.hero.contactBtn}
              </a>
            </div>

            <span className="hidden sm:inline font-pixel text-[9px] text-sand/60">
              STAGE 1-1 · AUTO-RUNNER
            </span>
          </div>
        </div>
      </div>

      {/* 2. Full-Width 8-bit Ground & Mario Jump Track Across Screen */}
      <div className="w-full relative z-10 mt-auto pb-4">
        {/* Floating Skill Question Boxes Array along the track */}
        <div className="w-full flex items-center justify-between px-6 sm:px-12 mb-2 relative">
          {STAGE_SKILLS.map((skill, idx) => {
            const isHit = hitBoxIdx === idx
            const IconComp = skill.icon
            const isActive = activeSkillIdx === idx

            return (
              <div
                key={skill.id}
                onClick={() => {
                  setActiveSkillIdx(idx)
                  setHitBoxIdx(idx)
                  setTimeout(() => setHitBoxIdx(null), 300)
                }}
                className="flex flex-col items-center cursor-pointer group"
                title={`Klik untuk memilih ${skill.name}`}
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 aspect-square border-2 border-copper bg-ink/95 flex items-center justify-center transition-all duration-150 relative ${
                    isHit
                      ? '-translate-y-3 scale-110 border-cream bg-copper shadow-lg'
                      : isActive
                      ? 'border-cream bg-surface -translate-y-1'
                      : 'hover:border-cream'
                  }`}
                  style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
                >
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            )
          })}
        </div>

        {/* The Running & Jumping Pixel Character on Track */}
        <div className="w-full relative h-16 pointer-events-none">
          <div
            className="absolute bottom-0 transition-transform duration-100 ease-out flex items-center justify-center"
            style={{
              left: `${charPosPercent}%`,
              transform: `translateX(-50%) ${isJumping ? 'translateY(-26px) scale(1.08)' : 'translateY(0)'}`,
            }}
          >
            <PixelCharacter
              action="walking"
              flip={dirRef.current === -1}
              size={56}
            />
          </div>
        </div>

        {/* 8-bit Ground / Brick Terrain Strip */}
        <div
          className="w-full h-7 border-t-4 border-copper bg-surface/95 flex items-center justify-between px-4 text-[9px] font-pixel text-sand/80 relative"
          style={{ boxShadow: '0 -2px 0 var(--color-shadow)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-copper">■■■■■</span>
            <span className="hidden sm:inline">TERRAIN LEVEL 1-1</span>
          </div>

          <div className="flex items-center gap-1 text-[9px] text-cream/70 font-mono">
            <span>RUNNING: {activeSkill.name}</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom-Center Down Arrow to Next Section */}
      <SectionDownArrow targetId="work" label="WORK" />
    </section>
  )
}
