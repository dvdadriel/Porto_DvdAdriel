import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { work } from '../data/work.js'
import SectionHeader from '../components/SectionHeader.jsx'
import Accordion from '../components/Accordion.jsx'
import SectionReveal from '../components/SectionReveal.jsx'

/** Panah "keluar situs" sebagai ikon, bukan karakter ↗ di dalam teks. */
function ExternalMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="ml-1.5 h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Pengalaman kerja, dan sembilan situs sebagai accordion.
 *
 * Versi sebelumnya memakai pratinjau yang muncul saat hover. Itu hanya bekerja
 * di perangkat yang punya kursor — separuh pengunjung situs ini tidak pernah
 * melihatnya. Accordion memberi isi yang sama kepada semua orang: satu ketukan
 * membuka nama, tangkapan layar, dan tautannya.
 *
 * Latarnya hijau polos, sama dengan Stack. Video hanya dipakai satu kali di
 * halaman ini; dua kali berarti dua kali biaya untuk efek yang sama.
 */
export default function ProfessionalWork() {
  const { t } = useLanguage()
  const clients = work[0].clients

  return (
    <SectionReveal id="work" className="on-ink">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
        <SectionHeader mark="02" title={t.work.title} />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            {/* Peran dan periode satu baris: keduanya fakta yang sama
                pentingnya, dan memisahnya jadi dua blok hanya menambah jarak. */}
            <div
              className="prose-measure flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
              data-reveal
            >
              <h3 style={{ fontSize: 'var(--text-h3)' }}>{t.work.role}</h3>
              <p className="numeric text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
                {t.work.period}
              </p>
            </div>
            <p className="mt-1 text-[1.0625rem]" data-reveal style={{ color: 'var(--color-ink-soft)' }}>
              {t.work.company}
            </p>

            <p className="prose-measure mt-6" data-reveal>
              {t.work.summary}
            </p>

            <h4
              className="mt-9 text-[0.9375rem] font-medium"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {t.work.focusTitle}
            </h4>
            <ul className="prose-measure mt-3 space-y-2" data-reveal>
              {t.work.duties.map((d) => (
                <li key={d} className="flex text-[1rem]">
                  <span aria-hidden="true" className="mr-3" style={{ color: 'var(--color-ink-soft)' }}>
                    —
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h4 className="text-[0.9375rem] font-medium" style={{ color: 'var(--color-ink-soft)' }}>
              {t.work.sitesTitle}
            </h4>

            <div className="mt-4" data-reveal>
              {clients.map((c) => (
                <Accordion
                  key={c.slug}
                  name="brand"
                  summary={c.brand}
                  meta={c.url.replace('https://', '')}
                >
                  <img
                    src={`/brands/${c.slug}.webp`}
                    width="640"
                    height="400"
                    alt={`Halaman depan situs ${c.brand}.`}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                    style={{ border: '1.5px solid var(--color-rule)' }}
                  />
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline mt-5"
                  >
                    {c.url.replace('https://', '')}
                    <ExternalMark />
                  </a>
                </Accordion>
              ))}
              <div className="rule-t" />
            </div>

            <p
              className="mt-6 text-[0.9375rem] leading-relaxed"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {t.work.note}
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
