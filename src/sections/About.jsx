import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import Accordion from '../components/Accordion.jsx'

/**
 * Tentang — section gelap full-bleed, potret membelah ke tepi kanan.
 *
 * Fotonya bukan ilustrasi di samping teks; ia bagian dari bidangnya. Tepi
 * kirinya dilarutkan dengan mask gradien supaya tidak ada garis potong yang
 * terlihat, dan seluruhnya dijadikan monokrom: potret berwarna di tengah palet
 * hijau-tinta akan membawa warnanya sendiri dan memecah section.
 *
 * Di bawah lg, foto pindah ke atas teks dengan tinggi tetap. Potret setinggi
 * layar di HP berarti orang harus men-scroll melewati wajah sebelum sampai ke
 * satu kata pun.
 */
export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="on-ink relative overflow-hidden">
      {/* Potret: menempel ke tepi kanan dan atas-bawah section di desktop. */}
      <div className="relative h-[42vh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        <img
          src="/portrait-david.jpg"
          width="533"
          height="800"
          alt={`${t.hero.name}, ${t.hero.role}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
          style={{
            filter: 'grayscale(1) contrast(1.12) brightness(0.52)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 22%), linear-gradient(to right, transparent, black 46%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to bottom, transparent, black 22%), linear-gradient(to right, transparent, black 46%)',
            maskComposite: 'intersect',
          }}
        />
      </div>

      {/* Garis tipis pemisah kolom teks dari foto. Bukan hiasan: ia yang
          memberi tahu mata di mana bidang teks berhenti, karena tepi fotonya
          sengaja dilarutkan dan tidak punya batas sendiri. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-24 hidden w-px lg:block"
        style={{ left: '52%', backgroundColor: 'var(--color-rule)' }}
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
        <div className="lg:max-w-[46%]">
          <p className="flex items-baseline gap-4 text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
            <span className="numeric">01</span>
            <span>{t.about.title}</span>
          </p>

          <h2 className="mt-5">{t.about.headline}</h2>

          <p className="prose-measure mt-8 text-[1.125rem]">{t.about.lead}</p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-2 text-[0.9375rem]">
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

          <div className="mt-12">
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
        </div>
      </div>
    </section>
  )
}
