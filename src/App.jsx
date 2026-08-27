import Hero from './sections/Hero.jsx'
import ProfessionalWork from './sections/ProfessionalWork.jsx'
import Projects from './sections/Projects.jsx'
import TechStack from './sections/TechStack.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ink-soft focus:px-4 focus:py-2 focus:rounded">
        Lewati ke konten
      </a>
      <main className="bg-ink text-fg">
        <Hero />
        <ProfessionalWork />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
    </>
  )
}
