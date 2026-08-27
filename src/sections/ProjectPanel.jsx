import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE } from '../lib/motion.js'

export default function ProjectPanel({ project, index }) {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    gsap.from(ref.current.querySelectorAll('[data-panel-item]'), {
      opacity: 0, y: 24, duration: 0.7, ease: EASE, stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
    })
  }), { scope: ref })

  return (
    <article
      ref={ref}
      className="border-t border-line py-20 md:py-28 grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16"
    >
      <div className="md:sticky md:top-24 md:self-start">
        <p data-panel-item className="font-mono text-xs text-accent mb-4">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 data-panel-item className="text-3xl md:text-4xl font-bold tracking-tight">
          {project.name}
        </h3>
        <p data-panel-item className="mt-3 font-mono text-sm text-fg-dim">{project.kicker}</p>

        <div data-panel-item className="mt-8 flex flex-wrap gap-3">
          <a href={project.repo} target="_blank" rel="noopener noreferrer"
             className="text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition-colors">
            Kode ↗
          </a>
          {project.docs && (
            <a href={project.docs} target="_blank" rel="noopener noreferrer"
               className="text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition-colors">
              Dokumentasi ↗
            </a>
          )}
        </div>
      </div>

      <div>
        <p data-panel-item className="text-lg text-fg-dim leading-relaxed">{project.summary}</p>

        {project.shot && (
          <img
            data-panel-item
            src={project.shot}
            alt={`Tangkapan layar ${project.name}`}
            loading="lazy"
            className="mt-10 w-full rounded-xl border border-line"
          />
        )}

        <dl data-panel-item className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="border border-line rounded-xl p-4">
              <dt className="font-mono text-[11px] uppercase tracking-wide text-fg-dim">{m.label}</dt>
              <dd className="mt-2 text-2xl font-bold">{m.value}</dd>
              <dd className="mt-1 text-xs text-fg-dim leading-snug">{m.note}</dd>
            </div>
          ))}
        </dl>

        <ul data-panel-item className="mt-10 space-y-3">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm text-fg-dim leading-relaxed pl-5 relative">
              <span className="absolute left-0 text-accent" aria-hidden="true">·</span>
              {h}
            </li>
          ))}
        </ul>

        {project.caveat && (
          <p data-panel-item className="mt-10 text-sm text-fg-dim border-l-2 border-line pl-5 leading-relaxed">
            {project.caveat}
          </p>
        )}
      </div>
    </article>
  )
}
