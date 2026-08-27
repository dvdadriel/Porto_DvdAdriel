import React, { useState, useEffect } from 'react'
import ShuffleText from './ShuffleText.jsx'
import { GlobeIcon } from './PixelIcons.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function LupisDiamondIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={`pixelated shrink-0 ${className}`} aria-hidden="true">
      <rect x="7" y="1" width="2" height="2" />
      <rect x="5" y="3" width="6" height="2" />
      <rect x="3" y="5" width="10" height="2" />
      <rect x="1" y="7" width="14" height="2" />
      <rect x="3" y="9" width="10" height="2" />
      <rect x="5" y="11" width="6" height="2" />
      <rect x="7" y="13" width="2" height="2" />
      <rect x="7" y="5" width="2" height="6" fill="#2C3639" />
      <rect x="5" y="7" width="6" height="2" fill="#2C3639" />
    </svg>
  )
}

function PixelChevronIcon({ className = "w-2.5 h-2.5" }) {
  return (
    <svg viewBox="0 0 8 8" fill="currentColor" className={`pixelated shrink-0 ${className}`} aria-hidden="true">
      <rect x="1" y="1" width="2" height="6" />
      <rect x="3" y="2" width="2" height="4" />
      <rect x="5" y="3" width="2" height="2" />
    </svg>
  )
}

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
    { id: 'about', label: t.nav.about, num: '01' },
    { id: 'work', label: t.nav.work, num: '02' },
    { id: 'projects', label: t.nav.projects, num: '03' },
    { id: 'stack', label: t.nav.stack, num: '04' },
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
        {/* Brand Logo - Lupis SVG icon vertically centered */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-2 group font-pixel text-xs sm:text-sm text-cream hover:text-copper transition-colors"
        >
          <span className="flex items-center justify-center text-copper">
            <LupisDiamondIcon className="w-3.5 h-3.5" />
          </span>
          <span className="tracking-wider flex items-center">
            <ShuffleText text="DAVID.EXE" />
          </span>
          <span className="hidden lg:flex items-center text-[10px] text-sand/80 font-mono bg-surface/80 border border-copper/50 px-1.5 py-0.5 ml-1">
            LVL {userLevel}
          </span>
        </a>

        {/* Desktop Navigation Links - Pixel Chevrons vertically centered */}
        {/* Ambang lg (1024px), bukan md (768px): pada tablet enam item nav berhuruf
            Press Start 2P tidak muat berdampingan dengan logo dan pemilih bahasa,
            jadi ia berdesakan atau meluber. Di tablet dia collapse jadi hamburger. */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-pixel text-[11px] lg:text-[12px] px-3 py-1.5 transition-all tracking-wider flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-surface text-cream border border-copper -translate-y-0.5'
                    : 'text-sand hover:text-cream hover:bg-surface/50 border border-transparent'
                }`}
                style={isActive ? { boxShadow: '2px 2px 0 var(--color-shadow)' } : {}}
              >
                {isActive && (
                  <span className="flex items-center justify-center text-copper">
                    <PixelChevronIcon className="w-2.5 h-2.5" />
                  </span>
                )}
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Right Side: Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Hanya bahasa yang AKTIF yang ditampilkan. Sebelumnya tombol ini
              menampilkan keduanya ("ID [EN]"), yang justru ambigu: pembaca tidak
              tahu mana yang sedang berlaku dan mana tujuan kliknya. Aksinya
              dijelaskan lewat aria-label dan title, bukan dengan menaruh dua
              bahasa di layar.

              Globe-nya ikon SVG piksel, bukan emoji 🌐. Emoji adalah satu-satunya
              glyph non-piksel di navbar penuh Press Start 2P, punya ascent sendiri
              yang menyulitkan perataan, dan warnanya tidak bisa ikut berubah saat
              hover. SVG mewarisi currentColor, jadi ia menguat bersama teksnya. */}
          <button
            onClick={toggleLang}
            aria-label={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
            title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
            className="font-pixel text-[10px] sm:text-[11px] bg-surface hover:bg-copper hover:text-cream text-sand border-2 border-copper px-2.5 py-1.5 transition-all active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 leading-none"
            style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
          >
            <GlobeIcon className="w-4 h-4" />
            <span className="leading-none">{lang.toUpperCase()}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden font-pixel text-[12px] p-2 bg-surface border border-copper text-cream cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ink border-b-2 border-copper px-6 py-4 flex flex-col gap-2">
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
              <span className="flex items-center gap-2">
                {active === item.id && (
                  <span className="flex items-center text-copper">
                    <PixelChevronIcon className="w-2.5 h-2.5" />
                  </span>
                )}
                <span>{item.label}</span>
              </span>
              <span className="text-[10px] text-sand/60">{item.num}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
