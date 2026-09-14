import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

/**
 * Stack sebagai inventaris berbaris, bukan koleksi badge.
 *
 * Grid pill memberi setiap teknologi bobot visual yang sama dan mengubah daftar
 * kemampuan jadi dinding stiker. Empat baris berlabel membuat strukturnya
 * terbaca: kategori di kiri, isinya mengalir di kanan, dipisah hairline.
 */
export default function TechStack() {
  const { t } = useLanguage()

  return (
    <section id="stack" className="on-ink">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
      <SectionHeader mark="04" title={t.stack.title}>
        <p>{t.stack.subtitle}</p>
      </SectionHeader>

      <dl className="mt-14">
        {t.stack.categories.map((cat) => (
          <div
            key={cat.category}
            className="rule-t grid grid-cols-1 gap-x-8 gap-y-3 py-6 sm:grid-cols-12"
          >
            <dt
              className="text-[0.875rem] font-medium sm:col-span-2"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              {cat.category}
            </dt>
            <dd className="sm:col-span-10">
              {/* flex-wrap, bukan grid: jumlah item tiap kategori berbeda dan
                  tidak ada alasan memaksanya jadi kolom yang rapi. */}
              <ul className="flex flex-wrap gap-x-3 gap-y-2">
                {cat.items.map((item, i) => (
                  <li
                    key={item}
                    className="text-[1rem]"
                    style={{
                      paddingLeft: i === 0 ? 0 : '0.75rem',
                      borderLeft: i === 0 ? 'none' : '1px solid var(--color-rule)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
        <div className="rule-t" />
      </div>
    </section>
  )
}
