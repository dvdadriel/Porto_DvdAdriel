import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import { work } from '../data/work.js'

export default function ProfessionalWork() {
  return (
    <section id="work" className="px-6 md:px-16 max-w-6xl mx-auto py-24 md:py-36">
      <SectionHeading
        index="01"
        title="PENGALAMAN"
        sub="Pekerjaan berbayar di lingkungan produksi yang sedang dipakai orang."
      />

      {work.map((w) => (
        <div key={w.company}>
          {/* Bingkai bergaya dialog box game */}
          <Reveal
            className="border-2 border-copper bg-surface p-6 md:p-8"
            /* boxShadow lewat style karena Tailwind tidak punya utility
               hard-offset tanpa blur */
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h3 className="font-pixel text-[16px] md:text-[24px] text-cream leading-[1.5]">{w.role}</h3>
              <span className="text-sand">· {w.company}</span>
              <span className="font-pixel text-[16px] text-sand ml-auto tracking-wider">
                {w.period.toUpperCase()}
              </span>
            </div>
            <p className="mt-6 text-cream/80 leading-relaxed max-w-3xl">{w.summary}</p>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {w.doing.map((d) => (
                <li key={d} className="text-sm text-cream/80 border-2 border-copper/50 p-4 leading-relaxed">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Grid sembilan situs. Karakter berjalan di atasnya sebagai penanda
              "ini yang saya kerjakan" — inilah gerak yang membuat halaman hidup. */}
          <div className="mt-16">
            <div className="flex items-end gap-4 mb-6">
              <PixelCharacter action="walking" size={64} />
              <p className="font-pixel text-[16px] text-sand tracking-widest pb-2">
                SEMBILAN SITUS
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {w.clients.map((c) => (
                <li key={c.brand}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block border-2 border-copper bg-surface p-5 transition-transform hover:-translate-y-1 hover:translate-x-1"
                    style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
                  >
                    <span className="block font-pixel text-[16px] text-cream leading-relaxed">
                      {c.brand}
                    </span>
                    <span className="block mt-3 text-sm text-sand break-all">
                      {c.url.replace('https://', '')} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-cream/60 max-w-2xl leading-relaxed">{w.note}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
