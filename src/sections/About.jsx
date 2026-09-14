import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

/**
 * Tentang — prosa di kiri, fakta yang bisa diperiksa di kanan.
 *
 * Pembagian kolomnya sama dengan record project, dan itu disengaja: begitu
 * seseorang belajar "kiri itu cerita, kanan itu data" di section project, dia
 * tidak perlu belajar ulang di sini.
 *
 * Bio dipecah jadi tiga paragraf pendek. Versi sebelumnya satu blok ~150 kata,
 * yang di layar 390px jadi dinding teks tanpa tempat mata beristirahat.
 */
export default function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <SectionHeader mark="01" title={t.about.title} />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 className="text-[0.875rem] font-medium" style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}>
            {t.about.philosophyTitle}
          </h3>
          <div className="prose-measure mt-3 space-y-4">
            {t.about.bioParagraph.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <h3
            className="mt-12 text-[0.875rem] font-medium"
            style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}
          >
            {t.about.philosophyTitle2}
          </h3>
          <div className="prose-measure mt-3 space-y-4">
            <p>{t.about.philosophy1}</p>
            <p>{t.about.philosophy2}</p>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          {/* Rasio mengikuti ukuran asli file (533x800), bukan 4:5 yang
              "seharusnya": memaksa rasio lain berarti object-cover memotong
              atas dan bawah — dan yang dipotong di foto portrait adalah kepala. */}
          <img
            src="/portrait-david.jpg"
            width="533"
            height="800"
            alt={`${t.hero.name}, ${t.hero.role}`}
            loading="lazy"
            decoding="async"
            className="w-full"
            style={{ border: '1px solid var(--color-rule)' }}
          />

          <dl className="mt-8">
            <div className="rule-t py-4">
              <dt className="text-[0.875rem]" style={{ color: 'var(--color-ink-soft)' }}>
                {t.about.educationTitle}
              </dt>
              <dd className="mt-1">{t.about.school}</dd>
              <dd className="text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
                {t.about.major}
              </dd>
              <dd className="numeric text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
                {t.about.period}
              </dd>
            </div>

            <div className="rule-t py-4">
              <dt className="text-[0.875rem]" style={{ color: 'var(--color-ink-soft)' }}>
                {t.about.locationTitle}
              </dt>
              <dd className="mt-1">{t.about.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
