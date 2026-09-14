import React from 'react'

/**
 * Kepala section: garis penuh, nomor urut, judul besar.
 *
 * Nomornya bukan eyebrow dekoratif. Halaman ini satu kolom panjang yang dibaca
 * berurutan, dan angka memberi orang tempat berpijak saat men-scroll jauh —
 * "tadi saya di 03" adalah informasi, "PROJECT" saja bukan.
 *
 * `align="center"` menumpuk nomor di atas judul dan memusatkan keduanya, dipakai
 * di section yang isinya juga berporos tengah. Varian ini ada supaya kepala
 * section tidak bertabrakan dengan isinya sendiri; bukan pilihan gaya yang bisa
 * dipakai bergantian.
 */
export default function SectionHeader({ mark, title, align = 'left', children }) {
  if (align === 'center') {
    return (
      <header className="rule-t pt-6 text-center">
        <p className="section-mark" aria-hidden="true">
          {mark}
        </p>
        <h2 className="mt-3">{title}</h2>
        {children && (
          <div
            className="prose-measure mx-auto mt-6"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {children}
          </div>
        )}
      </header>
    )
  }

  return (
    <header className="rule-t pt-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
        <p className="section-mark sm:col-span-2" aria-hidden="true">
          {mark}
        </p>
        <div className="sm:col-span-10">
          <h2>{title}</h2>
          {children && (
            <div className="prose-measure mt-6" style={{ color: 'var(--color-ink-soft)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
