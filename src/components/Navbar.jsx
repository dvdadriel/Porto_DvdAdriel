import React, { useState, useEffect } from 'react'
import ShuffleText from './ShuffleText.jsx'
import { CoinIcon } from './PixelIcons.jsx'

const NAV_ITEMS = [
  { id: 'hero', label: 'HERO', num: '00' },
  { id: 'work', label: 'WORK', num: '01' },
  { id: 'projects', label: 'PROJECTS', num: '02' },
  { id: 'stack', label: 'STACK', num: '03' },
  { id: 'about', label: 'ABOUT', num: '04' },
  { id: 'contact', label: 'CONTACT', num: '05' },
]

export default function Navbar({ activeSection }) {
  const [active, setActive] = useState('hero')
  const [coins, setCoins] = useState(99)
  const [coinAnim, setCoinAnim] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const handleCoinClick = () => {
    setCoins((c) => c + 1)
    setCoinAnim(true)
    setTimeout(() => setCoinAnim(false), 300)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/95 border-b-2 border-copper backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-2 group font-pixel text-sm sm:text-base text-cream hover:text-copper transition-colors"
        >
          <span className="text-copper group-hover:animate-spin">❖</span>
          <span className="tracking-wider">
            <ShuffleText text="DAVID.EXE" />
          </span>
          <span className="hidden lg:inline text-[10px] text-sand/60 ml-2 font-mono">
            [LVL 99]
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-pixel text-[11px] lg:text-[12px] px-3 py-1.5 transition-all tracking-wider relative ${
                  isActive
                    ? 'bg-surface text-cream border border-copper -translate-y-0.5'
                    : 'text-sand hover:text-cream hover:bg-surface/50 border border-transparent'
                }`}
                style={isActive ? { boxShadow: '2px 2px 0 var(--color-shadow)' } : {}}
              >
                {isActive && <span className="text-copper mr-1">▶</span>}
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Right HUD Element (Mario Coins & Mobile Toggle) */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCoinClick}
            title="Klik untuk koin bonus!"
            className={`flex items-center gap-1.5 font-pixel text-[11px] sm:text-[12px] text-sand bg-surface/80 border border-copper/60 px-2.5 py-1 transition-transform active:translate-y-0.5 cursor-pointer select-none ${
              coinAnim ? 'scale-110 text-cream' : ''
            }`}
            style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
          >
            <CoinIcon className="w-3.5 h-3.5 text-copper" />
            <span className="text-cream">x{coins}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden font-pixel text-[12px] p-2 bg-surface border border-copper text-cream"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink border-b-2 border-copper px-6 py-4 flex flex-col gap-2 animate-fadeIn">
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
              <span>
                {active === item.id && <span className="text-copper mr-2">▶</span>}
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
