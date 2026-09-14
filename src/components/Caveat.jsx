import React from 'react'

/**
 * Batasan sebuah project, dinaikkan derajatnya jadi setara metrik.
 *
 * Di kebanyakan portofolio, hal seperti ini ditaruh kecil di bawah kalau ada
 * sama sekali. Di situs ini dia punya warnanya sendiri dan tempat yang sama
 * dengan angka — karena itulah satu-satunya hal yang membedakan catatan yang
 * diaudit dari brosur.
 *
 * Border penuh, bukan garis tebal di satu sisi: aksen samping adalah dekorasi
 * yang menyamar sebagai struktur.
 */
export default function Caveat({ title, children }) {
  return (
    <div
      className="mt-6 p-4"
      style={{ border: '1px solid var(--color-signal)' }}
    >
      <p className="text-[0.8125rem] font-medium" style={{ color: 'var(--color-signal)' }}>
        {title}
      </p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed">{children}</p>
    </div>
  )
}
