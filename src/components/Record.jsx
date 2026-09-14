import React from 'react'
import Metric from './Metric.jsx'
import Caveat from './Caveat.jsx'
import Accordion from './Accordion.jsx'

/** Panah "keluar situs" sebagai ikon, bukan karakter ↗ yang ditempel di teks.
    Ditempel di teks, ia ikut terbaca screen reader dan ikut ter-copy. */
function ExternalMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="ml-1.5 h-3 w-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Satu entri buku besar, terlipat.
 *
 * Empat project terbuka sekaligus berarti empat dinding teks yang harus
 * di-scroll sebelum sampai ke yang dicari. Terlipat, judul dan stack-nya cukup
 * untuk memilih, lalu isinya dibuka kalau memang mau dibaca.
 *
 * Di dalam panel: klaim di kiri, bukti di kanan, dan kolomnya tidak pernah
 * bercampur — pemisahan itu sendiri yang mengatakan "yang ini pendapat saya,
 * yang itu angkanya".
 */
export default function Record({
  name,
  kicker,
  summary,
  highlights,
  highlightsTitle,
  metrics,
  caveat,
  caveatTitle,
  links,
  shot,
  defaultOpen = false,
}) {
  const stack = kicker.split('·').map((s) => s.trim())

  return (
    <Accordion name="project" summary={name} meta={stack.join('  ·  ')} defaultOpen={defaultOpen}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Klaim */}
        <div className="lg:col-span-7">
          <p className="prose-measure">{summary}</p>

          <h4 className="mt-8 text-[0.9375rem] font-medium" style={{ color: 'var(--color-ink-soft)' }}>
            {highlightsTitle}
          </h4>
          <ul className="prose-measure mt-3 space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex text-[1rem]">
                {/* Penanda daftar dipakai --color-ink-soft, bukan --color-rule:
                    diukur, versi hairline-nya cuma 1,44:1 dan praktis hilang di
                    layar terang. Hairline benar untuk garis, salah untuk tanda. */}
                <span aria-hidden="true" className="mr-3" style={{ color: 'var(--color-ink-soft)' }}>
                  —
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={i === 0 ? 'btn btn-solid' : 'btn btn-outline'}
              >
                {l.label}
                <ExternalMark />
              </a>
            ))}
          </div>
        </div>

        {/* Bukti */}
        <div className="lg:col-span-4 lg:col-start-9">
          {/* Dua kolom di HP supaya angka tetap bisa dibandingkan tanpa
              scroll menyamping, satu kolom begitu ada ruang vertikal. */}
          <dl className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((m) => (
              <Metric key={m.label} label={m.label} value={m.value} note={m.note} />
            ))}
          </dl>

          {caveat && <Caveat title={caveatTitle}>{caveat}</Caveat>}
        </div>
      </div>

      {shot && (
        <img
          src={shot.src}
          srcSet={shot.srcSet}
          sizes="(max-width: 1024px) 100vw, 1160px"
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          loading="lazy"
          decoding="async"
          className="mt-10 w-full"
          style={{ border: '1.5px solid var(--color-ink)' }}
        />
      )}
    </Accordion>
  )
}
