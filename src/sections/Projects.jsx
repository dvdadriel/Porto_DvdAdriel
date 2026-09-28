import React, { useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { projects } from '../data/projects.js'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import ScrollCue from '../components/ScrollCue.jsx'

/**
 * Project sebagai tab: lima nama di atas, satu project terbuka di bawahnya.
 *
 * Bentuk ini menukar satu hal dengan satu hal lain, dan pertukarannya
 * disengaja: daftar panjang bisa dipindai seluruhnya sekaligus, tab tidak —
 * tapi tab memberi tiap project seluruh lebar halaman, jadi angka, batasan,
 * dan tangkapan layarnya muat berdampingan tanpa satu pun dipotong.
 *
 * Polanya mengikuti pola tab WAI-ARIA, termasuk navigasi panah kiri/kanan dan
 * Home/End. Itu bukan tambahan opsional: begitu sebuah elemen diberi
 * role="tab", pembaca layar mengumumkannya sebagai tab dan penggunanya akan
 * menekan panah. Tab tanpa dukungan panah adalah janji yang tidak ditepati.
 *
 * URL diambil dari data/projects.js, teksnya dari translations.js. Pemisahan
 * itu disengaja: URL bukan konten terjemahan, dan menyimpannya per-bahasa
 * berarti dua salinan yang bisa berbeda diam-diam — lalu satu bahasa menunjuk
 * domain yang sudah mati tanpa ada yang sadar.
 *
 * Screenshot hanya ada untuk project yang punya tampilan. Go-Courier dan
 * Go-FoodStore murni API: memotret terminal cuma menghasilkan gambar dari
 * teks, yang kalah di segala sisi — buram saat di-zoom, tidak bisa diseleksi,
 * tidak terbaca screen reader, dan pecah di layar sempit.
 */
const shots = {
  // Diambil dari instance yang berjalan dengan library KOSONG, bukan dari
  // library pribadi. Bukan sekadar soal privasi: dengan nol berkas di disk,
  // yang tampil justru jalur fallback-nya — chart ListenBrainz — dan itu
  // menunjukkan satu hal yang tidak terlihat sama sekali pada library terisi,
  // yaitu bahwa halaman depannya tetap punya isi sebelum ada satu lagu pun.
  plectra: {
    src: '/shots/live-plectra.webp',
    srcSet: '/shots/live-plectra-720.webp 720w, /shots/live-plectra.webp 1440w',
    alt: 'Halaman depan Plectra dengan library kosong: dua baris chart dari ListenBrainz — rilis dua minggu terakhir dan yang paling diputar pekan ini — masing-masing dengan sampul album.',
  },
  'idx-screener': {
    src: '/shots/live-idx.webp',
    srcSet: '/shots/live-idx-720.webp 720w, /shots/live-idx.webp 1440w',
    alt: 'Dashboard IdxScreener: status regime, ringkasan momentum, dan panel paper trading.',
  },
  'news-update': {
    src: '/shots/live-news.webp',
    srcSet: '/shots/live-news-720.webp 720w, /shots/live-news.webp 1440w',
    alt: 'Dashboard News Update: jadwal kirim, riwayat 7 hari, dan berita utama digest terakhir.',
  },
  // Satu-satunya yang memakai video, karena yang dibuktikan di sini adalah
  // alurnya: tambah situs → scan → buka temuan → unduh Excel. Gambar diam
  // hanya bisa menunjukkan salah satu dari empat. Poster-nya frame asli dari
  // video yang sama, bukan tangkapan terpisah yang bisa berbeda.
  weblyzer: {
    src: '/shots/live-weblyzer.webp',
    srcSet: '/shots/live-weblyzer-720.webp 720w, /shots/live-weblyzer.webp 1280w',
    video: '/media/weblyzer-tutorial.mp4',
    alt: 'Weblyzer: daftar temuan SEO dengan severity, nama aturan, halaman, dan jumlah run.',
  },
}

export default function Projects() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const tabs = useRef([])

  const items = t.projects.items

  // Panah kiri/kanan berputar di ujung, Home/End melompat ke tepi. Fokus
  // dipindahkan bersama seleksinya (pola "automatic activation"), yang cocok
  // di sini karena membuka panel tidak menunggu apa pun — tidak ada permintaan
  // jaringan yang akan terbuang kalau orang melewatinya cepat-cepat.
  const onKey = (e) => {
    const last = items.length - 1
    let next = null
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  const item = items[active]
  const urls = projects.find((p) => p.slug === item.slug) || {}
  const s = shots[item.slug]

  // Tautan disusun di sini, bukan di data: hanya yang benar-benar punya URL
  // yang muncul. Tombol menuju domain mati lebih buruk daripada tidak ada
  // tombol.
  const links = [
    urls.repo && { href: urls.repo, label: t.projects.sourceRepo },
    // "Live" untuk aplikasi yang punya domain; project tanpa tampilan memberi
    // labelnya sendiri, karena tombol bertuliskan "Live" yang membuka halaman
    // CI adalah janji yang tidak ditepati.
    urls.live && { href: urls.live, label: item.liveLabel || t.projects.liveDemo },
    item.demoUrl && { href: item.demoUrl, label: item.demoLabel },
  ].filter(Boolean)

  return (
    <SectionReveal id="projects" className="on-mist">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <SectionHeader mark={t.projects.sectionNum} title={t.projects.title} />

        <div
          role="tablist"
          aria-label={t.projects.title}
          onKeyDown={onKey}
          className="tabs mt-14 lg:mt-16"
          data-reveal
        >
          {items.map((p, i) => (
            <button
              key={p.slug}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${p.slug}`}
              aria-selected={i === active}
              aria-controls={`panel-${p.slug}`}
              // Hanya tab yang aktif yang berada di urutan Tab. Itu memang
              // pola yang benar: Tab masuk dan keluar dari kelompoknya, panah
              // bergerak di dalamnya.
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="tab"
            >
              <span className="tab-num">{String(i + 1).padStart(2, '0')}</span>
              {p.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${item.slug}`}
          aria-labelledby={`tab-${item.slug}`}
          // key memaksa React membuang panel lama dan memasang yang baru saat
          // tab berganti. Tanpa itu, <video> Weblyzer akan dipakai ulang oleh
          // project berikutnya dan tetap memutar audio dari project yang sudah
          // tidak terlihat.
          key={item.slug}
          tabIndex={-1}
          className="rule-t mt-8 grid grid-cols-1 gap-10 pt-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-6">
            <h3>{item.name}</h3>

            <ul className="mt-5 flex flex-wrap gap-2">
              {item.kicker.split(' · ').map((k) => (
                <li key={k} className="chip">
                  {k}
                </li>
              ))}
            </ul>

            <p className="prose-measure mt-6" style={{ color: 'var(--color-ink-soft)' }}>
              {item.summary}
            </p>

            <p className="eyebrow mt-9">{t.projects.highlightsTitle}</p>
            <ul className="mt-4 space-y-3">
              {item.highlights.map((h) => (
                <li key={h} className="rule-t flex gap-3 pt-3 text-[0.9375rem]">
                  <span aria-hidden="true" style={{ color: 'var(--color-amber)' }}>
                    —
                  </span>
                  <span style={{ color: 'var(--color-ink-soft)' }}>{h}</span>
                </li>
              ))}
            </ul>

            {links.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-3">
                {links.map((l, j) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={j === 0 ? 'btn btn-solid' : 'btn'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <dl className="grid grid-cols-1 gap-px sm:grid-cols-3" style={{ background: 'var(--color-line)' }}>
              {item.metrics.map((m) => (
                <div key={m.label} className="p-5" style={{ background: 'var(--color-surface-alt)' }}>
                  <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--color-ink-soft)' }}>
                    {m.label}
                  </dt>
                  <dd
                    className="numeric mt-2 leading-none"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.625rem' }}
                  >
                    {m.value}
                  </dd>
                  <dd className="mt-1.5 text-[0.75rem]" style={{ color: 'var(--color-ink-soft)' }}>
                    {m.note}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Batasan project DISEMBUNYIKAN atas permintaan, tapi datanya
                sengaja TIDAK dihapus dari translations.js. Dua alasan: teksnya
                sudah ditulis dan diperiksa, jadi membuangnya berarti menulis
                ulang kalau suatu saat mau ditampilkan lagi; dan `caveat` masih
                dipakai sebagai catatan yang terbaca saat orang membuka data
                project-nya. Untuk mengembalikannya, render kembali blok ini. */}

            {s && (
              <figure className="mt-5">
                {s.video ? (
                  <video
                    src={s.video}
                    poster={s.src}
                    width="1280"
                    height="800"
                    controls
                    playsInline
                    preload="none"
                    aria-label={s.alt}
                    className="w-full"
                    style={{ border: '2px solid var(--color-navy)' }}
                  />
                ) : (
                  <img
                    src={s.src}
                    srcSet={s.srcSet}
                    sizes="(max-width: 1024px) 100vw, 620px"
                    width="1440"
                    height="900"
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                    style={{ border: '2px solid var(--color-navy)' }}
                  />
                )}
                {s.video && item.demoCaption && (
                  <figcaption className="mt-3 text-[0.8125rem]" style={{ color: 'var(--color-ink-soft)' }}>
                    {item.demoCaption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20" data-reveal>
          <ScrollCue to="contact" label={t.nav.contact} />
        </div>
      </div>
    </SectionReveal>
  )
}
