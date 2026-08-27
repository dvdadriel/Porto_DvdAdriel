import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK, EASE, DUR } from '../lib/motion.js'

/**
 * Memunculkan anak-anaknya saat masuk viewport.
 *
 * Memakai gsap.from(), BUKAN opacity:0 di CSS. Kalau JavaScript gagal atau
 * belum termuat, konten tetap terlihat — reveal-nya peningkatan, bukan syarat.
 */
export default function Reveal({ children, y = 24, stagger = 0.08, className = '' }) {
  const ref = useRef(null)

  useGSAP(() => onMotionOK(() => {
    const targets = ref.current?.children
    if (!targets?.length) return
    gsap.from(targets, {
      opacity: 0,
      y,
      duration: DUR,
      ease: EASE,
      stagger,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
    })
  }), { scope: ref })

  return <div ref={ref} className={className}>{children}</div>
}
