import React from 'react'
import Record from '../components/Record.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { projects } from '../data/projects.js'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionReveal from '../components/SectionReveal.jsx'

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
    src: '/shots/live-idx.webp',
    srcSet: '/shots/live-idx-720.webp 720w, /shots/live-idx.webp 1440w',
    width: 1440,
    height: 900,
    alt: 'Dashboard IdxScreener: status regime, ringkasan momentum, dan panel paper trading.',
  },
  'news-update': {
    src: '/shots/live-news.webp',
    srcSet: '/shots/live-news-720.webp 720w, /shots/live-news.webp 1440w',
    width: 1440,
    height: 900,
    alt: 'Dashboard News Update: jadwal transmisi Telegram dan digest berita terakhir.',
  },
  // Satu-satunya record yang memakai video, karena yang dibuktikan di sini
  // adalah alurnya: tambah situs → scan → buka temuan → unduh Excel. Gambar
  // diam hanya bisa menunjukkan salah satu dari empat. Poster-nya frame asli
  // dari video yang sama, bukan tangkapan terpisah yang bisa berbeda.
  weblyzer: {
    src: '/shots/live-weblyzer.webp',
    video: '/media/weblyzer-tutorial.mp4',
    width: 1280,
    height: 800,
    alt: 'Rekaman layar Weblyzer: daftar temuan SEO dengan severity, nama aturan, halaman, dan jumlah run — satu temuan terbuka menampilkan detailnya.',
  },
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <SectionReveal id="projects" className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
      <SectionHeader mark="03" title={t.projects.title}>
        <p>{t.projects.subtitle}</p>
      </SectionHeader>

      <div className="mt-16" data-reveal>
        {t.projects.items.map((item, i) => {
          const urls = projects.find((p) => p.slug === item.slug) || {}

          // Tautan disusun di sini, bukan di data: hanya yang benar-benar punya
          // URL yang muncul. Tombol menuju domain mati lebih buruk daripada
          // tidak ada tombol.
          const links = [
            urls.repo && { href: urls.repo, label: t.projects.sourceRepo },
            // "Live" untuk aplikasi yang punya domain; project tanpa tampilan
            // memberi labelnya sendiri, karena tombol bertuliskan "Live" yang
            // membuka halaman CI adalah janji yang tidak ditepati.
            urls.live && { href: urls.live, label: item.liveLabel || t.projects.liveDemo },
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
              // Keterangan gambar adalah teks yang terlihat, jadi ia ikut
              // bahasa — beda dengan src dan ukuran, yang tidak.
              shot={shots[item.slug] && { ...shots[item.slug], caption: item.demoCaption }}
              defaultOpen={i === 0}
            />
          )
        })}
        <div className="rule-t" />
      </div>
    </SectionReveal>
  )
}
