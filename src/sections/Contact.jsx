import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { profile } from '../data/profile.js'

/**
 * Penutup: empat baris kontak, disusun sama seperti dinding sembilan brand.
 *
 * Nilainya ditulis lengkap dan bisa diseleksi — email dan nomor yang terlihat
 * bisa disalin manual oleh orang yang clipboard API-nya diblokir, dan itu
 * terjadi lebih sering daripada yang biasanya diperhitungkan.
 */
export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  const root = useRef(null)

  // Kontak dianimasikan di sini, bukan lewat <SectionReveal>, karena elemennya
  // <footer> dan komponen itu merender <section>. Ritmenya sengaja disamakan
  // persis dengan section lain.
  useGSAP(
    () => {
      return onMotionOK(() => {
        gsap.from(root.current.querySelectorAll('[data-reveal]'), {
          y: 18,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.08,
          // Lihat catatan di SectionReveal: tanpa ini konten tersembunyi
          // sebelum ScrollTrigger menyala.
          immediateRender: false,
          scrollTrigger: { trigger: root.current, start: 'top 68%', once: true },
        })
      })
    },
    { scope: root }
  )

  // Timer dibersihkan saat unmount: setState pada komponen yang sudah hilang
  // adalah kebocoran yang baru terlihat saat orang berpindah bahasa cepat.
  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard ditolak (izin, konteks non-HTTPS, browser lawas). Emailnya
      // sudah tertulis di layar, jadi tidak ada yang perlu diberitahukan.
    }
  }

  const rows = [
    { label: t.contact.emailLabel, value: profile.email, href: `mailto:${profile.email}` },
    { label: t.contact.linkedinLabel, value: 'david-adriel-alvyn', href: profile.linkedin },
    { label: t.contact.phoneLabel, value: profile.phone, href: profile.whatsapp },
    { label: t.contact.githubLabel, value: 'dvdadriel', href: profile.github },
  ]

  return (
    <footer
      ref={root}
      id="contact"
      className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 data-reveal>{t.contact.title}</h2>
          <p
            className="prose-measure mt-4 text-[1.0625rem]"
            data-reveal
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {t.contact.subtitle}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul data-reveal>
            {rows.map((r) => (
              <li key={r.label} className="rule-t flex items-baseline gap-4 py-4">
                <span
                  className="w-24 shrink-0 text-[0.875rem]"
                  style={{ color: 'var(--color-ink-soft)' }}
                >
                  {r.label}
                </span>
                <a
                  href={r.href}
                  target={r.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 break-words underline decoration-1 underline-offset-4"
                  style={{ textDecorationColor: 'var(--color-rule)' }}
                >
                  {r.value}
                </a>
                {r.label === t.contact.emailLabel && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="shrink-0 px-3 py-1.5 text-[0.8125rem] transition-colors duration-200"
                    style={{ border: '1px solid var(--color-rule)' }}
                  >
                    {copied ? t.contact.copiedBtn : t.contact.copyBtn}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* aria-live di luar tombol supaya pengumumannya tidak menimpa nama
              tombol saat sedang difokuskan. */}
          <p aria-live="polite" className="sr-only">
            {copied ? t.contact.copiedBtn : ''}
          </p>

          <p
            className="rule-t mt-8 pt-4 text-[0.875rem]"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {profile.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
