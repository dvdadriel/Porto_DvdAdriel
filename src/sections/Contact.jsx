import Reveal from '../components/Reveal.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  return (
    <footer id="contact" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40 border-t border-line">
      <Reveal>
        <p className="font-mono text-xs text-accent mb-3">05</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Kontak</h2>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <a href={`mailto:${profile.email}`} className="text-lg hover:text-accent transition-colors">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
             className="text-lg hover:text-accent transition-colors">
            github.com/dvdadriel ↗
          </a>
        </div>
        <p className="mt-16 font-mono text-xs text-fg-dim">
          {profile.name} · {new Date().getFullYear()}
        </p>
      </Reveal>
    </footer>
  )
}
