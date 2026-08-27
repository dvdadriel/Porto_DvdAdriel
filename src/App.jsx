import Hero from './sections/Hero.jsx'
import ProfessionalWork from './sections/ProfessionalWork.jsx'
import Projects from './sections/Projects.jsx'
import TechStack from './sections/TechStack.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import WalkingBuddy from './components/WalkingBuddy.jsx'

export default function App() {
  return (
    <>
      <a href="#work"
         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:border-2 focus:border-copper focus:bg-surface focus:px-4 focus:py-3 focus:font-pixel focus:text-[16px]">
        LEWATI KE KONTEN
      </a>
      {/* scanlines: overlay tetap, opacity sangat rendah, mati saat reduced-motion */}
      <main className="scanlines bg-ink text-cream">
        <Hero />
        <ProfessionalWork />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
      <WalkingBuddy size={84} />
    </>
  )
}
