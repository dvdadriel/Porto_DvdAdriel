import React from 'react'
import Record from '../components/Record.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { projects } from '../data/projects.js'
import SectionHeader from '../components/SectionHeader.jsx'

/**
 * Lima record nanti, empat sekarang.
 *
 * URL diambil dari data/projects.js, teksnya dari translations.js. Pemisahan itu
 * disengaja: URL bukan konten terjemahan, dan menyimpannya per-bahasa berarti
 * dua salinan yang bisa berbeda diam-diam — lalu satu bahasa menunjuk domain
 * yang sudah mati tanpa ada yang sadar.
 *
 * Screenshot hanya ada untuk project yang punya tampilan. Go-Courier dan
 * Go-FoodStore murni API: memotret terminal cuma menghasilkan gambar dari teks,
 * yang kalah di segala sisi — buram saat di-zoom, tidak bisa diseleksi, tidak
 * terbaca screen reader, dan pecah di layar sempit. Record-nya tampil tanpa
 * gambar, dan itu bukan kekurangan yang perlu ditutupi.
 */
const shots = {
  'idx-screener': {
    src: '/shots/idx-screener.png',
    width: 1918,
    height: 963,
    alt:
      'Dashboard IdxScreener menampilkan hasil backtest dengan alpha +24,65% terhadap IHSG dan profit factor 0,784.',
  },
  'news-update': {
    src: '/shots/news-update-1472.webp',
    srcSet: '/shots/news-update-736.webp 736w, /shots/news-update-1472.webp 1472w',
    width: 1472,
    height: 920,
    alt:
      'Dashboard News Update menampilkan jadwal transmisi 06.00, 12.00, dan 18.00 WIB, riwayat tujuh hari, dan 21 berita pada digest terakhir.',
  },
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
      <SectionHeader mark="03" title={t.projects.title}>
        <p>{t.projects.subtitle}</p>
      </SectionHeader>

      <div className="mt-16">
        {t.projects.items.map((item, i) => {
          const urls = projects.find((p) => p.slug === item.slug) || {}

          // Tautan disusun di sini, bukan di data: hanya yang benar-benar punya
          // URL yang muncul. Tombol menuju domain mati lebih buruk daripada
          // tidak ada tombol.
          const links = [
            urls.repo && { href: urls.repo, label: t.projects.sourceRepo },
            urls.live && { href: urls.live, label: t.projects.liveDemo },
            item.demoUrl && { href: item.demoUrl, label: item.demoLabel },
          ].filter(Boolean)

          return (
            <Record
              key={item.slug}
              name={item.name}
              kicker={item.kicker}
              summary={item.summary}
              highlights={item.highlights}
              highlightsTitle={t.projects.highlightsTitle}
              metrics={item.metrics}
              caveat={item.caveat}
              caveatTitle={t.projects.caveatTitle}
              links={links}
              shot={shots[item.slug]}
              priority={i === 0}
            />
          )
        })}
      </div>
    </section>
  )
}
