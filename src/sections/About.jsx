import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Accordion from '../components/Accordion.jsx'

/**
 * Tentang — latar terang seperti section lain, potret membelah ke tepi kanan.
 *
 * Fotonya bukan ilustrasi di samping teks; ia bagian dari bidangnya. Tepi
 * kirinya dilarutkan dengan mask gradien supaya tidak ada garis potong yang
 * terlihat, dan seluruhnya dijadikan hitam putih: potret berwarna (kayu cokelat,
 * dedaunan hijau) di tengah palet hijau-tinta akan membawa warnanya sendiri dan
 * memecah halaman.
 *
 * Foto mulai di bawah garis kepala section, bukan dari tepi atas: hairline yang
 * memotong wajah terbaca sebagai kesalahan cetak.
 *
 * Di bawah lg, foto pindah ke atas teks dengan tinggi tetap. Potret setinggi
 * layar di HP berarti orang men-scroll melewati wajah sebelum sampai ke satu
 * kata pun.
 */
export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-20 sm:px-10 sm:pt-28 lg:px-14">
        <SectionHeader mark="01" title={t.about.title} />
      </div>

      {/* Potret: menempel ke tepi kanan dan bawah section di desktop. */}
      <div className="relative mt-10 h-[42vh] w-full lg:absolute lg:bottom-0 lg:right-0 lg:top-[13rem] lg:mt-0 lg:h-auto lg:w-[50%]">
        <img
          src="/portrait-david.jpg"
          width="533"
          height="800"
          alt={`${t.hero.name}, ${t.hero.role}`}
          loading="lazy"
          decoding="async"
          className="portrait-bleed h-full w-full object-cover object-top"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-12 sm:px-10 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="lg:max-w-[46%]">
          <h3>{t.about.headline}</h3>

          <p className="prose-measure mt-6 text-[1.125rem]">{t.about.lead}</p>

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
