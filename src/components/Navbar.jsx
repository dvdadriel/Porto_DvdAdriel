import React, { useState, useEffect } from 'react'
import ShuffleText from './ShuffleText.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function getAgeLevel() {
  const birthDate = new Date(2003, 7, 1) // Agustus 2003
  const now = new Date()
  let age = now.getFullYear() - birthDate.getFullYear()
  const monthDiff = now.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--
  }
  return Math.max(0, age)
}

export default function Navbar({ activeSection }) {
  const { lang, toggleLang, t } = useLanguage()
  const [active, setActive] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userLevel = getAgeLevel()

  const NAV_ITEMS = [
    { id: 'hero', label: t.nav.hero, num: '00' },
    { id: 'work', label: t.nav.work, num: '01' },
    { id: 'projects', label: t.nav.projects, num: '02' },
    { id: 'stack', label: t.nav.stack, num: '03' },
    { id: 'about', label: t.nav.about, num: '04' },
    { id: 'contact', label: t.nav.contact, num: '05' },
  ]

  useEffect(() => {
    if (activeSection) {
      setActive(activeSection)
    }
  }, [activeSection])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/95 border-b-2 border-copper backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo - Lupis diamond perfectly aligned */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="inline-flex items-center gap-2 group font-pixel text-sm sm:text-base text-cream hover:text-copper transition-colors"
        >
          <span className="inline-flex items-center justify-center text-copper text-sm sm:text-base leading-none">
            ❖
          </span>
          <span className="tracking-wider inline-flex items-center leading-none">
            <ShuffleText text="DAVID.EXE" />
          </span>
          <span className="hidden lg:inline-flex items-center text-[10px] text-sand/75 ml-1.5 font-mono leading-none bg-surface/80 border border-copper/50 px-1.5 py-0.5">
            LVL {userLevel}
          </span>
        </a>

        {/* Desktop Navigation Links - Chevrons perfectly centered */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-pixel text-[11px] lg:text-[12px] px-3 py-1.5 transition-all tracking-wider inline-flex items-center justify-center ${
                  isActive
                    ? 'bg-surface text-cream border border-copper -translate-y-0.5'
                    : 'text-sand hover:text-cream hover:bg-surface/50 border border-transparent'
                }`}
                style={isActive ? { boxShadow: '2px 2px 0 var(--color-shadow)' } : {}}
              >
                {isActive && (
                  <span className="inline-flex items-center text-copper mr-1.5 text-[9px] leading-none">
                    ▶
                  </span>
                )}
                <span className="inline-flex items-center leading-none">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Right Side: Language Switcher & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
            className="font-pixel text-[10px] sm:text-[11px] bg-surface hover:bg-copper hover:text-cream text-sand border-2 border-copper px-2.5 py-1 transition-all active:translate-y-0.5 cursor-pointer inline-flex items-center gap-1.5"
            style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
          >
            <span className="text-copper group-hover:text-cream">🌐</span>
            <span>{lang.toUpperCase()}</span>
            <span className="text-[8px] opacity-60">[{lang === 'id' ? 'EN' : 'ID'}]</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden font-pixel text-[12px] p-2 bg-surface border border-copper text-cream cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink border-b-2 border-copper px-6 py-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`font-pixel text-[12px] py-2 px-3 tracking-wider flex items-center justify-between ${
                active === item.id
                  ? 'bg-surface text-cream border border-copper'
                  : 'text-sand hover:text-cream'
              }`}
            >
              <span className="inline-flex items-center">
                {active === item.id && <span className="text-copper mr-2 text-[10px]">▶</span>}
                {item.label}
              </span>
              <span className="text-[10px] text-sand/60">{item.num}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
