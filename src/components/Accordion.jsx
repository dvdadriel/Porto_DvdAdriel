import React, { useRef } from 'react'
import { gsap } from '../lib/motion.js'

/**
 * Accordion di atas <details>/<summary> native, dengan animasi GSAP.
 *
 * Tetap <details>, bukan tombol + state React: elemen native sudah membawa
 * keyboard, ARIA, Ctrl+F yang bisa membuka panel tertutup, dan yang terpenting —
 * isinya tetap ada di HTML walau JavaScript tidak pernah jalan. Versi buatan
 * sendiri harus mengulang semuanya, dan biasanya melewatkan satu.
 *
 * Yang diambil alih hanya waktunya:
 *
 * - MEMBUKA dibiarkan native (browser memasang `open`, lalu kita animasikan
 *   tingginya dari nol). Ini juga yang membuat atribut `name` tetap bekerja:
 *   browser menutup saudara sekelompok sendiri.
 * - MENUTUP harus dicegat. Tanpa itu browser langsung menghapus isinya dan
 *   tidak ada yang tersisa untuk dianimasikan; panel akan hilang begitu saja.
 *
 * `height: auto` tidak bisa di-tween, jadi GSAP mengukur tinggi sebenarnya
 * dulu, menganimasikan ke angka itu, lalu melepasnya kembali ke auto — kalau
 * tidak, isi yang berubah (gambar selesai dimuat) akan terpotong.
 */
export default function Accordion({ name, summary, meta, children, defaultOpen = false }) {
  const root = useRef(null)
  const body = useRef(null)
  const tween = useRef(null)

  const still = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const animateOpen = () => {
    if (still()) return
    tween.current?.kill()
    const el = body.current
    tween.current = gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height: () => el.scrollHeight,
        opacity: 1,
        duration: 0.55,
        ease: 'expo.out',
        onComplete: () => gsap.set(el, { height: 'auto' }),
      }
    )
    gsap.fromTo(
      el.children,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.08 }
    )
  }

  const handleSummaryClick = (e) => {
    const el = root.current
    if (!el.open) return // biarkan browser yang membuka; animasinya di onToggle

    if (still()) return // reduced-motion: tutup seketika, tanpa dicegat

    e.preventDefault()
    tween.current?.kill()
    tween.current = gsap.to(body.current, {
      height: 0,
      opacity: 0,
      duration: 0.38,
      ease: 'power2.inOut',
      onComplete: () => {
        el.open = false
        gsap.set(body.current, { height: 'auto', opacity: 1 })
      },
    })
  }

  return (
    <details
      ref={root}
      name={name}
      open={defaultOpen}
      className="group rule-t"
      onToggle={(e) => e.currentTarget.open && animateOpen()}
    >
      <summary
        onClick={handleSummaryClick}
        className="flex cursor-pointer list-none items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden"
      >
        <span className="min-w-0 flex-1">
          <span
            className="block"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h3)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
            }}
          >
            {summary}
          </span>
          {meta && (
            <span className="mt-2 block text-[0.9375rem]" style={{ color: 'var(--color-ink-soft)' }}>
              {meta}
            </span>
          )}
        </span>

        {/* Tanda buka/tutup: garis vertikal yang menyusut, jadi plus berubah
            jadi minus. Dua garis, bukan chevron yang berputar — putaran
            menambah gerak tanpa menambah informasi. */}
        <span aria-hidden="true" className="relative mt-2 h-4 w-4 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-4" style={{ backgroundColor: 'currentColor' }} />
          <span
            className="absolute left-1/2 top-0 h-4 w-px transition-transform duration-500 ease-out group-open:scale-y-0"
            style={{ backgroundColor: 'currentColor', transformOrigin: 'center' }}
          />
        </span>
      </summary>

      <div ref={body} className="overflow-hidden">
        <div className="pb-8">{children}</div>
      </div>
    </details>
  )
}
