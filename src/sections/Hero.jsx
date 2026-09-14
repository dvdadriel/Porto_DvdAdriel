import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { gsap, onMotionOK } from '../lib/motion.js'
import ShowcaseCarousel from '../components/ShowcaseCarousel.jsx'

/**
 * Hero: satu pernyataan sebesar mungkin, dan aplikasi yang sedang berjalan.
 *
 * Tangkapan layarnya diambil dari domain yang hidup, bukan dari arsip lama —
 * itu sebabnya isinya bisa berubah dari waktu ke waktu, dan memang harus.
 */

const SHOTS = [
  {
    src: '/shots/live-idx.webp',
    srcSet: '/shots/live-idx-720.webp 720w, /shots/live-idx.webp 1440w',
    alt: 'Dashboard IdxScreener menampilkan status regime, ringkasan momentum, dan paper trading.',
  },
  {
    src: '/shots/live-news.webp',
    srcSet: '/shots/live-news-720.webp 720w, /shots/live-news.webp 1440w',
    alt: 'Dashboard News Update menampilkan jadwal transmisi Telegram dan digest terakhir.',
  },
  {
    src: '/shots/live-idx2.webp',
    srcSet: '/shots/live-idx2-720.webp 720w, /shots/live-idx2.webp 1440w',
    alt: 'IdxScreener: panel paper trading dengan win rate, profit factor, dan max drawdown.',
  },
  {
    src: '/shots/live-news2.webp',
    srcSet: '/shots/live-news2-720.webp 720w, /shots/live-news2.webp 1440w',
    alt: 'News Update: daftar berita per kategori hasil ringkasan model AI.',
  },
]

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
          .from(
            q('[data-anim="below"] > *'),
            { y: 16, opacity: 0, duration: 0.6, stagger: 0.07 },
            '-=0.5'
          )
          .from(q('[data-anim="shots"]'), { opacity: 0, y: 24, duration: 0.9 }, '-=0.6')
      })
    },
    { scope: root }
  )

  return (
    <section
      id="hero"
      ref={root}
      className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-16 sm:px-10 sm:pb-28 sm:pt-20 lg:px-14 lg:pt-10"
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

      <div className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
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
        </div>

        {/* Kolom kanan sengaja lebih rendah dari kolom kiri di desktop:
            carousel duduk di kanan bawah, bukan sejajar teks. */}
        <div data-anim="shots" className="lg:col-span-6 lg:col-start-7 lg:mt-10">
          <ShowcaseCarousel items={SHOTS} />
        </div>
      </div>
    </section>
  )
}
