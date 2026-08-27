import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
