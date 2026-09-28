import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { work } from '../data/work.js'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import ScrollCue from '../components/ScrollCue.jsx'

/** Panah "keluar situs" sebagai ikon, bukan karakter ↗ di dalam teks. */
function ExternalMark({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`h-3.5 w-3.5 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  )
}

/**
 * Pekerjaan: dua peran sebagai accordion, Massindo terbuka lebih dulu.
 *
 * Dipakai <details>/<summary> native, bukan state React. Bukan kemalasan —
 * elemen ini sudah membawa peran ARIA yang benar, dukungan keyboard, "cari di
 * halaman" yang bisa membuka panel tertutup, dan ia tetap bisa dibuka kalau
 * JavaScript gagal dimuat. Accordion buatan sendiri harus mengejar keempatnya
 * dan biasanya kehilangan dua di antaranya.
 *
 * `name="role"` membuat keduanya saling menutup — satu terbuka pada satu waktu,
 * tanpa satu baris JavaScript pun. Di browser yang belum mendukung atribut itu,
 * keduanya bisa terbuka bersamaan; itu derajat kegagalan yang benar.
 *
 * Sembilan situs hidup DI DALAM panel Massindo, bukan sebagai kolom terpisah
 * di sebelahnya. Itu yang membuat urutannya benar di layar sempit: daftar situs
 * jatuh tepat di bawah Massindo, bukan terdorong ke bawah Evotech seperti yang
 * terjadi pada tata letak dua kolom.
 */
export default function ProfessionalWork() {
  const { t } = useLanguage()
  const clients = work[0].clients

  return (
    <SectionReveal id="work">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <SectionHeader mark={t.work.sectionNum} title={t.work.title} />

        <div className="mt-14 lg:mt-16" data-reveal>
          {t.work.roles.map((r, i) => (
            <details key={r.company} name="role" open={i === 0} className="acc rule-t">
              <summary className="acc-head">
                <span className="min-w-0">
                  <span className="block text-[0.75rem] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--color-ink-soft)' }}>
                    {r.period}
                  </span>
                  <h3 className="mt-2">{r.role}</h3>
                  <span className="mt-1 block text-[1.0625rem] font-bold" style={{ color: 'var(--color-ink)' }}>
                    {r.company}
                  </span>
                </span>

                {/* Penanda buka/tutup digambar sebagai dua garis, dan yang
                    vertikal menghilang saat panel terbuka. Ikon +/− sebagai
                    teks akan ikut berubah lebar antar-font dan membuat tepi
                    kanan bergoyang. */}
                <span aria-hidden="true" className="acc-mark">
                  <i />
                  <i />
                </span>
              </summary>

              <div className="acc-body">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="eyebrow">{t.work.focusTitle}</p>
                    <ul className="mt-5 space-y-3">
                      {r.duties.map((d) => (
                        <li
                          key={d}
                          className="rule-t pt-3 text-[0.9375rem]"
                          style={{ color: 'var(--color-ink-soft)' }}
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {i === 0 && (
                    <div className="lg:col-span-7 lg:col-start-6">
                      <p className="eyebrow">{t.work.sitesTitle}</p>

                      <ul
                        className="mt-5 grid grid-cols-2 gap-px sm:grid-cols-3"
                        style={{ background: 'var(--color-line)' }}
                      >
                        {clients.map((c) => (
                          <li key={c.slug} style={{ background: 'var(--color-surface)' }}>
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block"
                              aria-label={`${c.brand} — ${c.url.replace('https://', '')}`}
                            >
                              <img
                                src={`/brands/${c.slug}.webp`}
                                width="640"
                                height="400"
                                alt={`Halaman depan situs ${c.brand}.`}
                                loading="lazy"
                                decoding="async"
                                /* aspect-[16/10] dikunci supaya sembilan ubin
                                   sejajar walaupun tangkapan layarnya tidak
                                   persis seukuran. */
                                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                              <span className="flex items-center justify-between gap-2 px-4 py-4">
                                <span className="min-w-0">
                                  <span className="block truncate text-[0.9375rem] font-bold">{c.brand}</span>
                                  <span className="block truncate text-[0.75rem]" style={{ color: 'var(--color-ink-soft)' }}>
                                    {c.url.replace('https://', '')}
                                  </span>
                                </span>
                                <ExternalMark />
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-6 text-[0.8125rem] leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
                        {t.work.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </details>
          ))}
          <div className="rule-t" />
        </div>

        <div className="mt-16 flex justify-center lg:mt-20" data-reveal>
          <ScrollCue to="projects" label={t.nav.projects} />
        </div>
      </div>
    </SectionReveal>
  )
}
