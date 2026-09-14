import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { work } from '../data/work.js'

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

  return (
    <section
      id="work"
      className="mx-auto w-full max-w-[1360px] px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <h2>{t.work.title}</h2>

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
                <span aria-hidden="true" className="mr-3" style={{ color: 'var(--color-rule)' }}>
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

          <ul className="mt-4">
            {clients.map((c) => (
              <li key={c.brand}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rule-t flex items-baseline justify-between gap-4 py-3 transition-colors duration-200"
                >
                  <span className="text-[1rem]">{c.brand}</span>
                  {/* Domain bergeser saat hover — satu-satunya gerak di daftar
                      ini, dan dia menjawab aksi, bukan menyambut scroll. */}
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
    </section>
  )
}
