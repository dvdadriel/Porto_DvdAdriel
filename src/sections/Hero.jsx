import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { gsap, onMotionOK } from '../lib/motion.js'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

/**
 * Hero sebagai satu entri buku besar.
 *
 * Urutannya adalah argumennya: angka, lalu garis, lalu apa yang salah dengan
 * angka itu, baru siapa yang menulisnya. Nama raksasa di tengah layar adalah
 * pembuka default portofolio — dan di situs yang seluruh premisnya adalah
 * bukti, bukti yang harus bicara duluan.
 *
 * Metrik lebih besar dari <h1>. Itu disengaja dan bukan kesalahan hierarki:
 * h1 tetap nama (itu yang dicari mesin dan screen reader), sementara ukuran
 * visual mengikuti apa yang paling ingin dibaca manusia lebih dulu.
 */
export default function Hero() {
  const { t } = useLanguage()
  const root = useRef(null)

  // Satu momen orkestrasi, sekali saat halaman dibuka. Selebihnya di situs ini
  // motion hanya menjawab aksi.
  //
  // Semua memakai gsap.from(), BUKAN .to() dari keadaan tersembunyi: kontennya
  // harus sudah terlihat di HTML. Transisi berhenti di tab background dan di
  // renderer headless — kalau visibilitas digantungkan padanya, hero terkirim
  // kosong ke orang yang tidak akan pernah tahu kenapa.
  useGSAP(
    () => {
      return onMotionOK(() => {
        const q = gsap.utils.selector(root)
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

        tl.from(q('[data-anim="metric"]'), { yPercent: 12, opacity: 0, duration: 0.9 })
          .from(
            q('[data-anim="rule"]'),
            { scaleX: 0, transformOrigin: 'left center', duration: 0.7 },
            '-=0.45'
          )
          .from(q('[data-anim="caveat"]'), { y: 10, opacity: 0, duration: 0.6 }, '-=0.35')
          .from(
            q('[data-anim="identity"] > *'),
            { y: 12, opacity: 0, duration: 0.55, stagger: 0.07 },
            '-=0.3'
          )
      })
    },
    { scope: root }
  )

  return (
    <section
      id="hero"
      ref={root}
      className="on-ink relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <AmbientBackdrop />

      <div className="relative mx-auto w-full max-w-[1360px] px-6 py-24 sm:px-10 lg:px-16">
        <div className="max-w-[46rem]">
          <p className="text-[0.875rem]" style={{ color: 'var(--color-on-ink-soft)' }}>
            {t.hero.source}
          </p>

          <p
            data-anim="metric"
            className="numeric mt-3 leading-[0.95]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.03em' }}
          >
            {t.hero.metric}
          </p>

          <p className="mt-1 text-[1.0625rem]" style={{ color: 'var(--color-on-ink-soft)' }}>
            {t.hero.metricLabel}
          </p>

          <div
            data-anim="rule"
            className="my-7 h-px w-full"
            style={{ backgroundColor: 'var(--color-rule-on-ink)' }}
          />

          <p data-anim="caveat" className="text-signal max-w-[52ch] text-[1.0625rem]">
            {t.hero.caveat}
          </p>

          <div data-anim="identity" className="mt-14">
            <h1 style={{ fontSize: 'var(--text-h2)' }}>{t.hero.name}</h1>

            <p className="mt-2 text-[1.0625rem]" style={{ color: 'var(--color-on-ink-soft)' }}>
              {t.hero.role}
            </p>

            <p className="prose-measure mt-5 text-[1.0625rem]">{t.hero.thesis}</p>

            {/* Tombol dibungkus flex-wrap, bukan grid: di 320px keduanya turun
                jadi dua baris penuh tanpa satu pun aturan breakpoint. */}
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 text-[0.9375rem] font-medium transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--color-on-ink)',
                  color: 'var(--color-ink)',
                }}
              >
                {t.hero.projectsBtn}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 text-[0.9375rem] font-medium transition-colors duration-200 hover:bg-white/10"
                /* Border-nya pakai on-ink-soft, bukan rule-on-ink: hairline yang
                   pas sebagai pemisah antar-baris terlalu lirih untuk menandai
                   sesuatu yang bisa diklik, apalagi di atas latar bergambar. */
                style={{
                  border: '1px solid var(--color-on-ink-soft)',
                  color: 'var(--color-on-ink)',
                }}
              >
                {t.hero.contactBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
