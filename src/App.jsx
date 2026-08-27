import React, { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import ProfessionalWork from './sections/ProfessionalWork.jsx'
import Projects from './sections/Projects.jsx'
import TechStack from './sections/TechStack.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'

function MainContent() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section, footer')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.45 }
    )

    sections.forEach((s) => observer.observe(s))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative bg-ink text-cream min-h-screen">
      {/* Top Fixed 8-bit Navigation Header with Language Switcher */}
      <Navbar activeSection={activeSection} />

      {/* Screen Reader Skip Link */}
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-[60] focus:border-2 focus:border-copper focus:bg-surface focus:px-4 focus:py-3 focus:font-pixel focus:text-[14px]"
      >
        LEWATI KE KONTEN
      </a>

      {/* Full-screen Snap Scroll Main Container */}
      <main className="scanlines bg-ink text-cream">
        <Hero />
        <ProfessionalWork />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  )
}
