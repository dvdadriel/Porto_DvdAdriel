import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { gsap, ScrollSmoother, onMotionOK } from './lib/motion.js'
import Cursor from './components/Cursor.jsx'
import TopNav from './components/TopNav.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import ProfessionalWork from './sections/ProfessionalWork.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'

function MainContent() {
  const [activeSection, setActiveSection] = useState('hero')
  const wrapper = useRef(null)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

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

  // ── Scroll halus ────────────────────────────────────────────────────────
  // ScrollSmoother memindahkan konten ke dalam transform dan menginterpolasi
  // posisinya, jadi roda mouse tidak lagi memindahkan halaman per-notch.
  //
  // `smoothTouch: false` disengaja dan bukan kelalaian: di layar sentuh, scroll
  // bawaan sudah punya inersia dari sistem operasi, dan menumpuk inersia kedua
  // di atasnya membuat jari terasa terputus dari halaman — keluhan nomor satu
  // pada situs yang memakai smooth scroll di HP.
  //
  // `effects: true` mengaktifkan atribut data-speed dan data-lag, yang dipakai
  // Hero dan About untuk parallax tanpa menulis satu ScrollTrigger pun.
  useGSAP(
    () => {
      return onMotionOK(() => {
        const smoother = ScrollSmoother.create({
          wrapper: wrapper.current,
          content: wrapper.current.firstElementChild,
          smooth: 1.15,
          smoothTouch: false,
          effects: true,
        })

        // Anchor bawaan melompat ke posisi scroll asli, sementara yang terlihat
        // di layar adalah posisi hasil interpolasi. Keduanya berbeda selama
        // animasi berlangsung, jadi tautan #section harus lewat smoother.
        const jump = (e) => {
          const link = e.target.closest('a[href^="#"]')
          if (!link) return
          const id = link.getAttribute('href')
          if (id.length < 2) return
          const target = document.querySelector(id)
          if (!target) return
          e.preventDefault()
          smoother.scrollTo(target, true, 'top 96px')
        }

        document.addEventListener('click', jump)
        return () => document.removeEventListener('click', jump)
      })
    },
    { scope: wrapper }
  )

  return (
    <>
      {/* Kursor dan nav hidup DI LUAR #smooth-content. Keduanya position:
          fixed, dan elemen fixed di dalam kontainer ber-transform jadi relatif
          terhadap kontainer itu — artinya ikut menggulung, yang membatalkan
          seluruh gunanya. */}
      <Cursor />
      <TopNav activeSection={activeSection} />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:px-5 focus:py-3"
        style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-navy)', border: '2px solid var(--color-navy)' }}
      >
        Lewati ke konten
      </a>

      {/* zIndex 1 menaruh seluruh konten di atas .ambience (z 0). ScrollSmoother
          menimpa `position` jadi fixed, tapi tidak menyentuh z-index. */}
      <div id="smooth-wrapper" ref={wrapper} style={{ position: 'relative', zIndex: 1 }}>
        <div id="smooth-content">
          <main className="relative">
            <Hero />
            <About />
            <ProfessionalWork />
            <Projects />
            <Contact />
          </main>

          {/* Bar bawah di HP menutupi bagian akhir halaman kalau tidak diberi ruang. */}
          <div className="h-16 lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  )
}
