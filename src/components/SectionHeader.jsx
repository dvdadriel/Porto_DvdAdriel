import React from 'react'

/**
 * Kepala section: nomor, judul besar, deskripsi.
 *
 * Nomornya bukan hiasan. Halaman ini dibaca berurutan dari atas ke bawah, dan
 * angka memberi orang tempat berpijak saat men-scroll jauh — "tadi saya di 03"
 * adalah informasi, "PROJECT" saja bukan.
 *
 * Judul dibungkus dua lapis span: yang luar memotong (overflow-hidden), yang
 * dalam yang digeser SectionReveal. Kalau elemen yang sama dipakai untuk
 * keduanya, ia memotong dirinya sendiri dan tidak ada yang terlihat bergerak.
 *
 * pb-[0.1em] mencegah ekor huruf turun ikut terpangkas: line-height judul di
 * bawah 1, jadi kotak barisnya lebih pendek daripada glyph-nya.
 */
export default function SectionHeader({ mark, title, children, className = '' }) {
  return (
    <header className={`rule-t pt-8 ${className}`}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow" data-reveal>
            {mark}
          </p>
          <h2 className="mt-6">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block" data-reveal-mask>
                {title}
              </span>
            </span>
          </h2>
        </div>

        {children && (
          <div
            className="self-end lg:col-span-5"
            data-reveal
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
