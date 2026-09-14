import React from 'react'

/**
 * Accordion di atas <details>/<summary> native.
 *
 * Bukan tombol + state React: elemen native sudah membawa keyboard, ARIA,
 * Ctrl+F yang bisa membuka panel tertutup, dan yang terpenting — isinya tetap
 * ada di HTML walau JavaScript tidak pernah jalan. Versi buatan sendiri harus
 * mengulang semuanya, dan biasanya melewatkan satu.
 *
 * `name` membuat satu grup saling menutup (accordion sungguhan). Browser yang
 * belum mendukungnya cuma kehilangan sifat itu — semua panel bisa terbuka
 * bersamaan, dan tidak ada yang rusak.
 */
export default function Accordion({ name, summary, meta, children, defaultOpen = false }) {
  return (
    <details name={name} open={defaultOpen} className="group rule-t">
      <summary
        className="flex cursor-pointer list-none items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden"
      >
        <span className="min-w-0 flex-1">
          <span className="block" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)', textTransform: 'uppercase', lineHeight: 0.95 }}>
            {summary}
          </span>
          {meta && (
            <span className="mt-2 block text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
              {meta}
            </span>
          )}
        </span>

        {/* Tanda buka/tutup: garis vertikal yang hilang saat terbuka, jadi plus
            berubah jadi minus. Dua garis, bukan ikon chevron yang berputar —
            putaran menambah gerak tanpa menambah informasi. */}
        <span aria-hidden="true" className="relative mt-2 h-4 w-4 shrink-0">
          <span
            className="absolute left-0 top-1/2 h-px w-4"
            style={{ backgroundColor: 'currentColor' }}
          />
          <span
            className="absolute left-1/2 top-0 h-4 w-px transition-transform duration-300 group-open:scale-y-0"
            style={{ backgroundColor: 'currentColor', transformOrigin: 'center' }}
          />
        </span>
      </summary>

      <div className="pb-8">{children}</div>
    </details>
  )
}
