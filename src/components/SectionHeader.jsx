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

/**
 * Pembungkus untuk efek naik-dari-balik-garis, sama dengan headline hero.
 *
 * Dua lapis span memang perlu: yang luar memotong (`overflow-hidden`), yang
 * dalam yang digeser. Kalau elemen yang sama dipakai untuk keduanya, ia akan
 * memotong dirinya sendiri dan tidak ada yang terlihat bergerak.
 *
 * `pb-[0.12em]` mencegah bagian bawah huruf ikut terpotong: Anton ber-line-height
 * 0.88, jadi kotak barisnya lebih pendek daripada glyph-nya.
 */
function Mask({ children, className }) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] ${className || ''}`}>
      <span className="block" data-reveal-mask>
        {children}
      </span>
    </span>
  )
}

export default function SectionHeader({ mark, title, align = 'left', children }) {
  if (align === 'center') {
    return (
      <header className="rule-t pt-6 text-center" data-section-rule>
        <p className="section-mark" aria-hidden="true">
          <Mask>{mark}</Mask>
        </p>
        <h2 className="mt-3">
          <Mask>{title}</Mask>
        </h2>
        {children && (
          <div
            className="prose-measure mx-auto mt-6"
            data-reveal
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {children}
          </div>
        )}
      </header>
    )
  }

  return (
    <header className="rule-t pt-6" data-section-rule>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
        <p className="section-mark sm:col-span-2" aria-hidden="true">
          <Mask>{mark}</Mask>
        </p>
        <div className="sm:col-span-10">
          <h2>
            <Mask>{title}</Mask>
          </h2>
          {children && (
            <div className="prose-measure mt-6" data-reveal style={{ color: 'var(--color-ink-soft)' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
