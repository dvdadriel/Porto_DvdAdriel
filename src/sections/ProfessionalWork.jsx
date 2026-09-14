import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { work } from '../data/work.js'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

/**
 * Pengalaman kerja, dan sembilan situs sebagai satu dinding.
 *
 * Sembilan kartu logo akan jadi tambal sulam sembilan identitas yang saling
 * berebut; sembilan baris berhairline terbaca sebagai satu daftar milik satu
 * orang. Yang penting di sini bukan brand-nya — tapi bahwa kesembilannya hidup
 * dan bisa diklik sekarang juga.
 *
 * Domainnya ditulis lengkap, bukan disembunyikan di balik kata "kunjungi":
 * domain yang terlihat bisa diperiksa orang tanpa harus mengkliknya dulu.
 */
export default function ProfessionalWork() {
  const { t } = useLanguage()
  const clients = work[0].clients
  const [hovered, setHovered] = useState(null)

  // Pratinjau hanya dirender di layar lebar, dan ini bukan sekadar
  // menyembunyikan lewat CSS: diukur, sembilan gambar (216 KB) tetap terunduh di
  // HP walau kotaknya display:none. Perangkat sentuh tidak punya hover, jadi
  // itu 216 KB untuk sesuatu yang tidak mungkin dipicu.
  const [showPreview, setShowPreview] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const hover = window.matchMedia('(hover: hover)')
    const decide = () => setShowPreview(wide.matches && hover.matches)
    decide()
    wide.addEventListener('change', decide)
    hover.addEventListener('change', decide)
    return () => {
      wide.removeEventListener('change', decide)
      hover.removeEventListener('change', decide)
    }
  }, [])

  return (
    <section id="work" className="on-ink relative overflow-hidden">
      <AmbientBackdrop video="/media/bg-fibers.webm" poster="/media/bg-fibers-poster.webp" />
      <div className="relative mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
      <SectionHeader mark="02" title={t.work.title} />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          {/* Peran dan periode satu baris: keduanya adalah fakta yang sama
              pentingnya, dan memisahnya jadi dua blok hanya menambah jarak. */}
          <div className="prose-measure flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 style={{ fontSize: 'var(--text-h3)' }}>{t.work.role}</h3>
            <p className="numeric text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
              {t.work.period}
            </p>
          </div>
          <p className="mt-1 text-[1.0625rem]" style={{ color: 'var(--color-ink-soft)' }}>
            {t.work.company}
          </p>

          <p className="prose-measure mt-6">{t.work.summary}</p>

          <h4 className="mt-9 text-[0.875rem] font-medium" style={{ color: 'var(--color-ink-soft)' }}>
            {t.work.focusTitle}
          </h4>
          <ul className="prose-measure mt-3 space-y-2">
            {t.work.duties.map((d) => (
              <li key={d} className="flex text-[0.9375rem]">
                {/* Penanda daftar dipakai --color-ink-soft, bukan --color-rule:
                    diukur, versi hairline-nya cuma 1,44:1 dan praktis hilang di
                    layar terang. Hairline benar untuk garis, salah untuk tanda. */}
                <span aria-hidden="true" className="mr-3" style={{ color: 'var(--color-ink-soft)' }}>
                  —
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h4 className="text-[0.875rem] font-medium" style={{ color: 'var(--color-ink-soft)' }}>
            {t.work.sitesTitle}
          </h4>

          {/* Pratinjau muncul di satu slot tetap di atas daftar, bukan melayang
              mengikuti kursor: posisi tetap bisa dibaca mata tanpa mengejar, dan
              tidak pernah keluar layar. */}
          {showPreview && (
          <div
            className="relative mt-4 w-full"
            style={{ aspectRatio: '16 / 10', border: '1.5px solid var(--color-rule)' }}
            aria-hidden="true"
          >
            {clients.map((c) => (
              <img
                key={c.slug}
                src={`/brands/${c.slug}.webp`}
                width="640"
                height="400"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
                style={{
                  opacity: hovered === c.slug ? 1 : 0,
                  transform: hovered === c.slug ? 'scale(1)' : 'scale(1.04)',
                  transition:
                    'opacity 420ms var(--ease-out-quart), transform 700ms var(--ease-out-expo)',
                }}
              />
            ))}
            {!hovered && (
              <p
                className="absolute inset-0 flex items-center justify-center text-[0.9375rem]"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                {t.work.previewHint}
              </p>
            )}
          </div>
          )}

          <ul className="mt-6">
            {clients.map((c) => (
              <li key={c.brand}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(c.slug)}
                  onFocus={() => setHovered(c.slug)}
                  onMouseLeave={() => setHovered(null)}
                  onBlur={() => setHovered(null)}
                  className="group rule-t flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="text-[1rem]">{c.brand}</span>
                  {/* Domain bergeser saat hover — gerak yang menjawab aksi,
                      bukan menyambut scroll. */}
                  <span
                    className="text-[0.875rem] transition-transform duration-200 ease-out group-hover:translate-x-1"
                    style={{ color: 'var(--color-ink-soft)' }}
                  >
                    {c.url.replace('https://', '')}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p
            className="rule-t mt-6 pt-4 text-[0.875rem] leading-relaxed"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {t.work.note}
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}
