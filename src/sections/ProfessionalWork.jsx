import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { work } from '../data/work.js'

export default function ProfessionalWork() {
  return (
    <section id="work" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading
        index="01"
        title="Pengalaman Profesional"
        sub="Pekerjaan berbayar di lingkungan produksi yang sedang dipakai orang."
      />

      {work.map((w) => (
        <Reveal key={w.company} className="border-t border-line pt-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-xl md:text-2xl font-semibold">{w.role}</h3>
            <span className="text-fg-dim">· {w.company}</span>
            <span className="font-mono text-sm text-fg-dim ml-auto">{w.period}</span>
          </div>

          <p className="mt-5 text-fg-dim leading-relaxed max-w-3xl">{w.summary}</p>

          <ul className="mt-7 grid gap-2 md:grid-cols-3">
            {w.doing.map((d) => (
              <li key={d} className="text-sm text-fg-dim border border-line rounded-lg p-4 leading-relaxed">
                {d}
              </li>
            ))}
          </ul>

          {w.clients.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {w.clients.map((c) => (
                <li key={c.brand}>
                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                     className="inline-block text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition-colors">
                    {c.brand} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}

          {w.note && <p className="mt-7 text-sm text-fg-dim/80 italic max-w-2xl">{w.note}</p>}
        </Reveal>
      ))}
    </section>
  )
}
