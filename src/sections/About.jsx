import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Accordion from '../components/Accordion.jsx'

/**
 * Tentang — foto di tengah, dua panel yang bisa dibuka di bawahnya.
 *
 * Kolom kiri/kanan seperti section lain tidak dipakai di sini: isinya cuma satu
 * foto dan dua blok prosa, dan membaginya jadi dua kolom hanya menghasilkan
 * satu sisi yang kosong. Satu poros tengah membuat section ini terasa berbeda
 * dari yang lain, yang justru diinginkan — halaman ini butuh tempat bernapas.
 */
export default function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <SectionHeader mark="01" title={t.about.title} />

      <div className="mx-auto mt-16 max-w-[52rem] text-center">
        {/* Rasio mengikuti ukuran asli file (533x800): memaksa rasio lain
            berarti object-cover memotong atas dan bawah, dan yang dipotong di
            foto portrait adalah kepala. */}
        <img
          src="/portrait-david.jpg"
          width="533"
          height="800"
          alt={`${t.hero.name}, ${t.hero.role}`}
          loading="lazy"
          decoding="async"
          className="mx-auto w-full max-w-[22rem]"
          style={{ border: '1.5px solid var(--color-ink)' }}
        />

        <h3 className="mt-10" style={{ fontSize: 'var(--text-h3)' }}>
          {t.hero.name}
        </h3>
        <p className="mt-1 text-[1rem]" style={{ color: 'var(--color-ink-soft)' }}>
          {t.hero.role}
        </p>

        <dl className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[0.9375rem]">
          <div className="flex gap-2">
            <dt style={{ color: 'var(--color-ink-soft)' }}>{t.about.educationTitle}</dt>
            <dd>
              {t.about.school}
              <span className="numeric"> ({t.about.period})</span>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt style={{ color: 'var(--color-ink-soft)' }}>{t.about.locationTitle}</dt>
            <dd>{t.about.location}</dd>
          </div>
        </dl>
      </div>

      {/* Accordion kembali ke rata kiri: prosa yang rata tengah melewati tiga
          baris jadi sulit dibaca, karena awal tiap baris berpindah-pindah. */}
      <div className="mx-auto mt-16 max-w-[52rem] text-left">
        <Accordion name="about" summary={t.about.philosophyTitle} defaultOpen>
          <div className="prose-measure space-y-4">
            {t.about.bioParagraph.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </Accordion>

        <Accordion name="about" summary={t.about.philosophyTitle2}>
          <div className="prose-measure space-y-4">
            <p>{t.about.philosophy1}</p>
            <p>{t.about.philosophy2}</p>
          </div>
        </Accordion>
        <div className="rule-t" />
      </div>
    </section>
  )
}
