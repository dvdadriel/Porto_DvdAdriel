import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'

export default function ProjectPanel({ project, index }) {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from(ref.current.querySelectorAll('[data-panel-item]'), {
      opacity: 0, y: 16, duration: 0.6, ease: EASE, stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
    })
  }), { scope: ref })

  return (
    <article ref={ref} className="py-16 md:py-20 grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-16">
      <div className="md:sticky md:top-24 md:self-start">
        <p data-panel-item className="font-pixel text-[16px] text-sand tracking-widest mb-5">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 data-panel-item className="font-pixel text-[24px] md:text-[32px] text-copper leading-[1.5]">
          {project.name.toUpperCase()}
        </h3>
        <p data-panel-item className="mt-4 text-sm text-sand">{project.kicker}</p>

        <div data-panel-item className="mt-8 flex flex-wrap gap-3">
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
             className="font-pixel text-[16px] border-2 border-copper bg-surface text-cream px-4 py-3 tracking-wider transition-transform hover:-translate-y-0.5"
             style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}>
            KODE ↗
          </a>
          {project.docs && (
            <a href={project.docs} target="_blank" rel="noopener noreferrer"
               className="font-pixel text-[16px] border-2 border-copper bg-surface text-cream px-4 py-3 tracking-wider transition-transform hover:-translate-y-0.5"
               style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}>
              DOKUMENTASI ↗
            </a>
          )}
        </div>
      </div>

      <div>
        <p data-panel-item className="text-cream/80 leading-relaxed">{project.summary}</p>

        {project.shot && (
          <img data-panel-item src={project.shot} alt={`Tangkapan layar ${project.name}`}
               loading="lazy" className="mt-8 w-full border-2 border-copper"
               style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }} />
        )}

        {/* Metrik bergaya HUD game: blok terisi, angka besar. */}
        <dl data-panel-item className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="border-2 border-copper bg-surface p-4">
              <dt className="font-pixel text-[16px] text-sand tracking-wider leading-relaxed">
                {m.label}
              </dt>
              <dd className="mt-3 font-pixel text-sm text-cream leading-relaxed">{m.value}</dd>
              <dd className="mt-2 text-xs text-cream/60 leading-snug">{m.note}</dd>
            </div>
          ))}
        </dl>

        <ul data-panel-item className="mt-8 space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm text-cream/80 leading-relaxed pl-5 relative">
              <span className="absolute left-0 text-copper" aria-hidden="true">▪</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Caveat diberi bobot visual setara metrik, tidak disembunyikan. */}
        {project.caveat && (
          <p data-panel-item className="mt-8 text-sm text-cream/80 border-2 border-copper/60 bg-surface/50 p-5 leading-relaxed">
            <span className="font-pixel text-[16px] text-sand block mb-3 tracking-wider">CATATAN</span>
            {project.caveat}
          </p>
        )}
      </div>
    </article>
  )
}
