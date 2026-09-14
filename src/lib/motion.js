import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger menghitung posisi setiap trigger sekali, lalu memakai angka itu
 * sampai ada yang menyuruhnya menghitung ulang. Masalahnya halaman ini masih
 * bergerak sesudah itu: font display baru dipakai setelah woff2-nya turun, dan
 * Anton jauh lebih rapat daripada font pengganti sistem — tiap judul berubah
 * tinggi, dan semua section di bawahnya bergeser.
 *
 * Akibatnya terukur: sebelum ada refresh ini, ambang 68% menyala saat section
 * masih di 95% (Pengalaman, Project) dan 104% (Stack) — yaitu sebelum
 * section-nya kelihatan sama sekali.
 *
 * `document.fonts.ready` menunggu semua face selesai, lalu posisinya dihitung
 * ulang sekali. Ini bukan pengganti refresh bawaan pada event `load`; itu tetap
 * jalan dan menangani hal lain.
 */
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

export { gsap, ScrollTrigger }

/**
 * Menjalankan `build` hanya kalau pengguna TIDAK meminta reduced motion.
 * Semua animasi wajib lewat sini — bukan sekadar sopan santun: gerak yang
 * tidak diminta bisa memicu mual bagi sebagian orang.
 *
 * gsap.matchMedia() otomatis membersihkan animasinya saat query tidak lagi
 * cocok, jadi mengganti setelan sistem langsung berefek tanpa reload.
 */
export function onMotionOK(build) {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', build)
  return () => mm.revert()
}

/** Dipusatkan supaya ritme animasi konsisten di seluruh halaman. */
export const EASE = 'power2.out'
export const DUR = 0.7
