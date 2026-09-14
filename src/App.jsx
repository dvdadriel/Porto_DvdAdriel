import React, { useState, useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Rail from './components/Rail.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import ProfessionalWork from './sections/ProfessionalWork.jsx'
import Projects from './sections/Projects.jsx'
import TechStack from './sections/TechStack.jsx'
import Contact from './sections/Contact.jsx'

function MainContent() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section, footer')

    // rootMargin memotong viewport jadi pita tipis di sepertiga atas. Tanpa itu,
    // dua section bisa sama-sama "terlihat" dan penanda aktif berkedip bolak-balik
    // sepanjang scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grain min-h-screen">
      <Rail activeSection={activeSection} />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-3"
        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-ink)' }}
      >
        Lewati ke konten
      </a>

      {/* Ruang untuk rail hanya di lg ke atas; di bawah itu rail berubah jadi
          bar bawah dan tidak mengambil lebar apa pun. */}
      <main className="lg:pl-[200px]">
        <Hero />
        <About />
        <ProfessionalWork />
        <Projects />
        <TechStack />
        <Contact />
      </main>

      {/* Bar bawah di HP menutupi bagian akhir halaman kalau tidak diberi ruang. */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
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
