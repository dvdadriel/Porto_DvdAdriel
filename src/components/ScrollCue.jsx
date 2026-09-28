import React from 'react'

/**
 * Penanda ke section berikutnya.
 *
 * Bentuknya tautan biasa ke `#id`, bukan tombol ber-onClick. Alasannya bukan
 * kerapian: penghalusan scroll dipasang sekali di App lewat satu handler yang
 * menangkap semua `a[href^="#"]`, jadi tautan biasa otomatis ikut dihaluskan —
 * sementara tombol ber-onClick harus memanggil smoother-nya sendiri dan akan
 * diam-diam melompat kasar kalau suatu saat handler itu diubah. Tautan juga
 * punya alamat yang bisa disalin dan dibuka di tab baru; tombol tidak.
 *
 * Labelnya menyebut NAMA section tujuan, bukan "scroll" atau panah sendirian.
 * Panah tanpa nama cuma memberi tahu bahwa halaman masih berlanjut — yang
 * sudah diketahui semua orang dari scrollbar.
 *
 * `up` membalik arahnya, dipakai sekali di penutup untuk kembali ke atas.
 */
export default function ScrollCue({ to, label, up = false, className = '' }) {
  return (
    <a href={`#${to}`} className={`group inline-flex items-center gap-4 ${className}`}>
      <span
        aria-hidden="true"
        className="scroll-cue-box flex h-12 w-12 items-center justify-center"
      >
        <svg
          viewBox="0 0 16 16"
          className={`h-4 w-4 ${up ? 'rotate-180' : 'scroll-cue-arrow'}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <path d="M8 2v12M2.5 8.5 8 14l5.5-5.5" />
        </svg>
      </span>

      <span className="text-[0.75rem] font-bold uppercase tracking-[0.18em]">
        <span className="reel">
          <span data-reel={label}>{label}</span>
        </span>
      </span>
    </a>
  )
}
