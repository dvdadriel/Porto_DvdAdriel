import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText)

/**
 * ScrollTrigger menghitung posisi setiap trigger sekali, lalu memakai angka itu
 * sampai ada yang menyuruhnya menghitung ulang. Masalahnya halaman ini masih
 * bergerak sesudah itu: font display baru dipakai setelah woff2-nya turun, dan
 * Bodoni punya metrik yang jauh berbeda dari serif pengganti sistem — tiap judul
 * berubah tinggi, dan semua section di bawahnya bergeser.
 *
 * Akibatnya terukur pada versi sebelum refresh ini ada: ambang 68% menyala saat
 * section masih di 95% dan 104% — yaitu sebelum section-nya kelihatan sama
 * sekali.
 *
 * `document.fonts.ready` menunggu semua face selesai, lalu posisinya dihitung
 * ulang sekali. Ini bukan pengganti refresh bawaan pada event `load`; itu tetap
 * jalan dan menangani hal lain.
 */
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText }

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
