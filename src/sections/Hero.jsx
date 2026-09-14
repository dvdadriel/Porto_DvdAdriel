import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Hero: satu pernyataan sebesar mungkin, lalu buktinya.
 *
 * Versi sebelumnya membuka dengan angka berukuran sedang di tengah bidang
 * gelap dan hasilnya kosong, bukan tenang. Yang diperbaiki di sini bukan
 * konsepnya — klaim tetap harus dibayar bukti — tapi skalanya: headline
 * mengisi lebar penuh, dan angka turun jadi catatan kaki yang mendukungnya.
 */
export default function Hero() {
  const { t } = useLanguage()
  const root = useRef(null)

  // Satu momen orkestrasi saat load. gsap.from(), bukan .to() dari keadaan
  // tersembunyi: transisi berhenti di tab background dan renderer headless,
  // jadi visibilitas konten tidak boleh bergantung padanya.
  useGSAP(
    () => {
      return onMotionOK(() => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from(q('[data-anim="line"]'), { yPercent: 105, duration: 1, stagger: 0.08 })
          .from(q('[data-anim="below"] > *'), { y: 16, opacity: 0, duration: 0.6, stagger: 0.07 }, '-=0.5')
      })
    },
    { scope: root }
  )

  return (
    <section
      id="hero"
      ref={root}
      className="mx-auto w-full max-w-[1600px] px-6 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20 lg:px-14 lg:pt-10"
    >
      {/* overflow-hidden per baris supaya animasi masuknya terpotong rapi di
          batas baris, bukan melayang dari luar layar. */}
      <h1>
        {t.hero.headline.map((line) => (
          <span key={line} className="block overflow-hidden">
            <span data-anim="line" className="block">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div data-anim="below" className="lg:col-span-5">
          <p className="prose-measure">{t.hero.thesis}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-solid">
              {t.hero.projectsBtn}
            </a>
            <a href="#contact" className="btn btn-outline">
              {t.hero.contactBtn}
            </a>
          </div>

          {/* Angka turun ke sini: ia sekarang bukti yang mendukung klaim di
              atas, bukan pembuka yang harus ditebak maksudnya. */}
          <dl className="rule-t mt-12 pt-5">
            <dt className="text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
              {t.hero.source}
            </dt>
            <dd
              className="numeric mt-2 leading-none"
              style={{ fontSize: 'var(--text-metric)', fontFamily: 'var(--font-display)' }}
            >
              {t.hero.metric}
            </dd>
            <dd className="mt-1 text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
              {t.hero.metricLabel}
            </dd>
            <dd className="mt-4 text-[0.9375rem] leading-relaxed" style={{ color: 'var(--color-signal)' }}>
              {t.hero.caveat}
            </dd>
          </dl>
        </div>

        {/* Bukti visual: dua aplikasi yang benar-benar jalan, ditumpuk
            bertingkat. Bukan mockup laptop — hanya layarnya. */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <img
              src="/shots/idx-screener.png"
              width="1918"
              height="963"
              alt="Dashboard IdxScreener: hasil backtest 730 hari, alpha +24,65% terhadap IHSG, profit factor 0,784."
              loading="eager"
              decoding="async"
              className="w-full sm:w-[62%]"
              style={{ border: '1.5px solid var(--color-ink)' }}
            />
            <img
              src="/shots/news-update-1472.webp"
              srcSet="/shots/news-update-736.webp 736w, /shots/news-update-1472.webp 1472w"
              sizes="(max-width: 640px) 100vw, 38vw"
              width="1472"
              height="920"
              alt="Dashboard News Update: jadwal transmisi 06.00, 12.00, dan 18.00 WIB dengan riwayat tujuh hari."
              loading="lazy"
              decoding="async"
              className="w-full sm:mt-16 sm:w-[38%]"
              style={{ border: '1.5px solid var(--color-ink)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
