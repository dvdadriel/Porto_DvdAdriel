import React, { useState, useEffect, useRef } from 'react'
import PixelCharacter from './PixelCharacter.jsx'
import ShuffleText from './ShuffleText.jsx'
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

const SKILL_ITEMS = [
  { id: 'rails', name: 'RUBY ON RAILS', icon: RubyIcon },
  { id: 'laravel', name: 'LARAVEL', icon: LaravelIcon },
  { id: 'go', name: 'GO LANGUAGE', icon: GoIcon },
  { id: 'react', name: 'JAVASCRIPT / REACT', icon: ReactIcon },
  { id: 'c', name: 'C LANGUAGE', icon: CIcon },
  { id: 'outsystems', name: 'OUTSYSTEMS', icon: OutsystemsIcon },
  { id: 'postgres', name: 'POSTGRESQL', icon: PostgresIcon },
  { id: 'docker', name: 'DOCKER', icon: DockerIcon },
]

export default function MarioAvatarBox() {
  const [skillIdx, setSkillIdx] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [boxHit, setBoxHit] = useState(false)
  const timerRef = useRef(null)

  const currentSkill = SKILL_ITEMS[skillIdx]
  const IconComponent = currentSkill.icon

  const triggerJump = () => {
    if (isJumping) return
    setIsJumping(true)

    // Karakter mencapai puncak lompatan pada 180ms -> membentur kotak tanda tanya
    setTimeout(() => {
      setBoxHit(true)
      setSkillIdx((prev) => (prev + 1) % SKILL_ITEMS.length)
    }, 180)

    // Kotak pulih & karakter mendarat
    setTimeout(() => {
      setBoxHit(false)
      setIsJumping(false)
    }, 420)
  }

  // Siklus game Mario otomatis berjalan setiap 3 detik
  useEffect(() => {
    timerRef.current = setInterval(() => {
      triggerJump()
    }, 3000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div
      onClick={triggerJump}
      title="Klik untuk melompat & ganti skill!"
      className="border-2 border-copper bg-surface/90 p-4 sm:p-5 flex flex-col items-center justify-between relative cursor-pointer select-none transition-all hover:border-cream/80 w-full max-w-[250px] sm:max-w-[270px] h-[330px] sm:h-[350px]"
      style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
    >
      {/* 1. Mario Mystery Question Box Persegi di dalam border */}
      <div className="w-full flex justify-center pt-1">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 aspect-square border-2 border-copper bg-ink/90 flex items-center justify-center transition-transform duration-150 relative ${
            boxHit
              ? '-translate-y-2.5 scale-110 border-cream bg-copper shadow-lg'
              : 'hover:border-copper'
          }`}
          style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
        >
          {/* Hanya Logo Skill di dalam Box Persegi (Tanpa Tulisan) */}
          <div className="flex items-center justify-center p-1">
            <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>

          {/* Corner pixel dots for 8-bit block look */}
          <span className="absolute top-1 left-1 w-1 h-1 bg-copper/60" />
          <span className="absolute top-1 right-1 w-1 h-1 bg-copper/60" />
          <span className="absolute bottom-1 left-1 w-1 h-1 bg-copper/60" />
          <span className="absolute bottom-1 right-1 w-1 h-1 bg-copper/60" />
        </div>
      </div>

      {/* 2. Karakter dengan animasi lompatan yang selaras */}
      <div className="my-auto py-1 flex items-center justify-center">
        <div
          className={`transition-transform duration-200 ease-out ${
            isJumping ? '-translate-y-6 scale-105' : 'translate-y-0'
          }`}
        >
          <PixelCharacter action="waving" size={140} />
        </div>
      </div>

      {/* 3. Teks Nama Skill Bersih di Bawah (Tanpa kata ready/boost/completed) */}
      <div className="w-full text-center border-t border-copper/40 pt-2.5">
        <p className="font-pixel text-[11px] sm:text-[12px] text-copper tracking-wider">
          <ShuffleText text={currentSkill.name} key={currentSkill.id} />
        </p>
      </div>
    </div>
  )
}
