import Reveal from '../components/Reveal.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  return (
    <footer id="contact" className="px-6 md:px-16 max-w-6xl mx-auto py-24 md:py-36 border-t-2 border-copper">
      <Reveal>
        <p className="font-pixel text-[16px] text-sand mb-4 tracking-widest">05</p>
        <h2 className="font-pixel text-[24px] md:text-[40px] text-copper leading-[1.5] tracking-wide">
          KONTAK
        </h2>
        <div className="mt-10 flex flex-col gap-4 items-start">
          <a href={`mailto:${profile.email}`}
             className="text-lg text-sand hover:text-cream transition-colors break-all">
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
             className="text-lg text-sand hover:text-cream transition-colors">
            github.com/dvdadriel ↗
          </a>
        </div>
        <div className="mt-16 flex items-center gap-5">
          <div
            className="border-2 border-copper bg-surface p-2 flex items-center justify-center shrink-0"
            style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
          >
            <PixelCharacter action="dancing" size={80} />
          </div>
          <p className="font-pixel text-[16px] text-cream/50 tracking-wider">
            {profile.name.toUpperCase()} · 2026
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
