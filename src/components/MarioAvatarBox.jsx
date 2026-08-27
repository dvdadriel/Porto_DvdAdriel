import React, { useState, useEffect, useRef } from 'react'
import PixelCharacter from './PixelCharacter.jsx'
import ShuffleText from './ShuffleText.jsx'

const SKILL_POWERUPS = [
  { id: 'go', name: 'GOLANG', icon: '🐹', color: '#00ADD8', label: 'GOLANG BOOST!' },
  { id: 'rails', name: 'RUBY ON RAILS', icon: '💎', color: '#CC0000', label: 'RAILS 8.1 ACTIVE!' },
  { id: 'laravel', name: 'LARAVEL', icon: '⚡', color: '#FF2D20', label: 'LARAVEL POWER!' },
  { id: 'react', name: 'REACT 19', icon: '⚛️', color: '#61DAFB', label: 'REACT UI LEVEL UP!' },
  { id: 'postgres', name: 'POSTGRESQL', icon: '🐘', color: '#336791', label: 'POSTGRESQL READY!' },
  { id: 'docker', name: 'DOCKER', icon: '🐳', color: '#2496ED', label: 'CONTAINER DEPLOYED!' },
]

export default function MarioAvatarBox() {
  const [skillIdx, setSkillIdx] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [boxHit, setBoxHit] = useState(false)
  const [coinFloat, setCoinFloat] = useState(false)
  const timerRef = useRef(null)

  const currentSkill = SKILL_POWERUPS[skillIdx]

  const triggerJump = () => {
    if (isJumping) return
    setIsJumping(true)

    // Character reaches peak at 200ms -> hits question box
    setTimeout(() => {
      setBoxHit(true)
      setCoinFloat(true)
      setSkillIdx((prev) => (prev + 1) % SKILL_POWERUPS.length)
    }, 200)

    // Box recovery & character lands
    setTimeout(() => {
      setBoxHit(false)
      setIsJumping(false)
    }, 450)

    // Coin float fadeout
    setTimeout(() => {
      setCoinFloat(false)
    }, 800)
  }

  // Automatic Mario game cycle every 3.2 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      triggerJump()
    }, 3200)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div
      onClick={triggerJump}
      title="Klik untuk memicu lompatan Mario & ganti power-up skill!"
      className="border-2 border-copper bg-surface p-4 sm:p-6 flex flex-col items-center justify-between relative cursor-pointer select-none transition-all hover:border-cream/80 w-full max-w-[260px] sm:max-w-[280px] h-[340px]"
      style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
    >
      {/* 1. Mario Mystery Question Box (INSIDE BORDER) */}
      <div className="w-full flex justify-center relative pt-1">
        {/* Floating Power-Up Item that pops out when hit */}
        {coinFloat && (
          <div className="absolute -top-6 font-pixel text-[12px] bg-copper text-cream px-2 py-0.5 border border-cream animate-bounce z-20 shadow-md">
            +{currentSkill.name}!
          </div>
        )}

        <div
          className={`border-2 border-copper bg-ink/90 px-3 py-1.5 flex items-center gap-2 transition-transform duration-150 ${
            boxHit
              ? '-translate-y-2.5 scale-110 border-cream bg-copper text-cream shadow-lg'
              : 'hover:border-copper'
          }`}
          style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
        >
          <span className="font-pixel text-[11px] text-cream animate-pulse">
            {boxHit ? '★' : '[?]'}
          </span>
          <span className="text-base leading-none">{currentSkill.icon}</span>
          <span className="font-pixel text-[10px] text-cream tracking-wider font-bold">
            {currentSkill.name}
          </span>
        </div>
      </div>

      {/* 2. Character with synchronized jump animation */}
      <div className="my-auto py-2 flex items-center justify-center">
        <div
          className={`transition-transform duration-200 ease-out ${
            isJumping ? '-translate-y-6 scale-105' : 'translate-y-0'
          }`}
        >
          <PixelCharacter action="waving" size={145} />
        </div>
      </div>

      {/* 3. Bottom Dynamic Skill Status Text */}
      <div className="w-full text-center border-t border-copper/40 pt-2.5">
        <p className="font-pixel text-[10px] text-copper tracking-wider">
          <ShuffleText text={currentSkill.label} key={currentSkill.id} />
        </p>
      </div>
    </div>
  )
}
