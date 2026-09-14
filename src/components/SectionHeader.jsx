import React from 'react'

/**
 * Kepala section: garis penuh, nomor urut di kiri, judul besar di sebelahnya.
 *
 * Nomornya bukan eyebrow dekoratif. Halaman ini satu kolom panjang yang dibaca
 * berurutan, dan angka memberi orang tempat berpijak saat men-scroll jauh —
 * "tadi saya di 03" adalah informasi, "PROJECT" saja bukan.
 */
export default function SectionHeader({ mark, title, children }) {
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
