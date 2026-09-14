import React from 'react'
import Metric from './Metric.jsx'
import Caveat from './Caveat.jsx'

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
 * Satu entri buku besar.
 *
 * Klaim di kiri, bukti di kanan, dan kolomnya tidak pernah bercampur — pemisahan
 * itu sendiri yang mengatakan "yang ini pendapat saya, yang itu angkanya".
 *
 * Dipisah hairline, bukan dikemas jadi kartu. Ada alasan praktis di luar
 * estetika: daftar berhairline tidak peduli isinya empat atau tujuh, sementara
 * grid 2x2 pecah begitu jumlahnya ganjil — dan project kelima sudah di jalan.
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
  priority = false,
}) {
  const stack = kicker.split('·').map((s) => s.trim())

  return (
    <article className="rule-t py-14 sm:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Klaim */}
        <div className="lg:col-span-7">
          <h3 style={{ fontSize: 'var(--text-h2)' }}>{name}</h3>

          {/* Stack dirender sebagai item terpisah, bukan satu string yang
              disambung titik tengah: yang ini bisa dibaca sebagai daftar. */}
          <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            {stack.map((item, i) => (
              <li
                key={item}
                className="text-[0.875rem]"
                style={{
                  color: 'var(--color-ink-soft)',
                  paddingLeft: i === 0 ? 0 : '0.75rem',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--color-rule)',
                }}
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="prose-measure mt-6">{summary}</p>

          <h4 className="mt-9 text-[0.875rem] font-medium" style={{ color: 'var(--color-ink-soft)' }}>
            {highlightsTitle}
          </h4>
          <ul className="prose-measure mt-3 space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex text-[0.9375rem]">
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

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[0.9375rem] font-medium underline decoration-1 underline-offset-4 transition-colors duration-200"
                style={{ textDecorationColor: 'var(--color-rule)' }}
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
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="mt-12 w-full"
          style={{ border: '1px solid var(--color-rule)' }}
        />
      )}
    </article>
  )
}
