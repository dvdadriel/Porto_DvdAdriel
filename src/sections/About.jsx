import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import ScrollCue from '../components/ScrollCue.jsx'

/**
 * Tentang Saya — blok navy penuh, ditutup pita amber berisi stack.
 *
 * Isinya diambil dari resume, bukan ditulis ulang bebas. Halaman ini dan
 * resume harus mengatakan hal yang sama kalau keduanya dibaca berdampingan,
 * dan itu memang yang terjadi di ruang wawancara — versi sebelumnya punya
 * kalimat pembuka dan "filosofi kerja" yang tidak ada padanannya di resume
 * sama sekali.
 *
 * Fotonya berwarna asli. Yang mengikatnya ke palet halaman bukan filter,
 * melainkan bingkai amber pekat di sekelilingnya.
 */

/** Blok kecil berlabel. Dipakai dua kali di section ini, jadi dijadikan satu
 *  bentuk — dua blok yang gayanya beda-beda terbaca sebagai dua hal yang tidak
 *  berhubungan. */
function Block({ title, children, className = '' }) {
  return (
    <div className={`rule-t pt-5 ${className}`}>
      <p className="eyebrow">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const tools = t.stack.categories.flatMap((c) => c.items)

  return (
    <SectionReveal id="about" className="on-navy">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <SectionHeader mark={t.about.sectionNum} title={t.about.title} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <img
              src="/portrait-david.jpg"
              width="533"
              height="800"
              alt={`${t.hero.name}, ${t.hero.role}`}
              loading="lazy"
              decoding="async"
              className="portrait aspect-[4/5] w-full object-cover"
              style={{ border: '3px solid var(--color-amber)' }}
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="prose-measure space-y-5 text-[1.0625rem]" data-reveal>
              {t.about.profile.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2" data-reveal>
              <Block title={t.about.educationTitle}>
                <p className="font-bold">{t.about.school}</p>
                <p className="text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
                  {t.about.major}
                </p>
                <p className="numeric mt-1 text-[0.9375rem]" style={{ color: 'var(--color-amber)' }}>
                  {t.about.gpa} · {t.about.period}
                </p>
              </Block>

              <Block title={t.about.locationTitle}>
                <p className="font-bold">{t.about.location}</p>
              </Block>

            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20" data-reveal>
          <ScrollCue to="work" label={t.nav.work} />
        </div>
      </div>

      {/* Pita stack. Isinya dirender DUA KALI dan tiap salinan digeser -100%:
          itulah yang membuat perulangannya tidak punya sambungan. Satu salinan
          akan menyisakan bidang kosong selebar layar di tiap putaran.

          Salinan kedua aria-hidden supaya screen reader tidak membacakan
          daftar yang sama dua kali. */}
      <div className="on-amber marquee py-5" aria-label={t.about.stackTitle}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {tools.map((tool) => (
              <span
                key={`${copy}-${tool}`}
                className="flex shrink-0 items-center gap-5 whitespace-nowrap pr-5 text-[0.875rem] font-bold uppercase tracking-[0.16em]"
              >
                {tool}
                <i
                  aria-hidden="true"
                  className="block h-1.5 w-1.5 shrink-0"
                  style={{ background: 'var(--color-navy)' }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </SectionReveal>
  )
}
