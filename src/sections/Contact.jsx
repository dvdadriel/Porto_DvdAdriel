import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { profile } from '../data/profile.js'
import SectionHeader from '../components/SectionHeader.jsx'
import SectionReveal from '../components/SectionReveal.jsx'
import ScrollCue from '../components/ScrollCue.jsx'

/** Panah "keluar situs" sebagai ikon, bukan karakter ↗ di dalam teks. */
function ExternalMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  )
}

/**
 * Penutup: blok hitam, alamat email sebesar judul, empat baris kontak.
 *
 * Emailnya ditulis sebesar judul karena itulah satu tindakan yang diharapkan
 * dari seluruh halaman ini. Tombol "Hubungi saya" yang membuka klien email
 * menyembunyikan alamatnya di balik satu klik yang sebagian orang tidak mau
 * ambil — alamat yang terlihat bisa dibaca, disalin manual, atau difoto.
 *
 * Nilai tiap baris ditulis lengkap dan bisa diseleksi: tombol salin memakai
 * clipboard API yang diblokir lebih sering daripada yang biasanya
 * diperhitungkan, dan kalau itu terjadi teksnya sudah ada di layar.
 *
 * Dirender sebagai <section> lewat SectionReveal, dengan <footer> di dalamnya
 * hanya untuk baris penutup: seluruh blok ini konten utama, dan <footer>
 * sepanjang layar membuat screen reader mengumumkannya sebagai pelengkap.
 */
export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

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
    { label: t.contact.phoneLabel, value: profile.phone, href: profile.whatsapp },
    { label: t.contact.linkedinLabel, value: 'david-adriel-alvyn', href: profile.linkedin },
    { label: t.contact.githubLabel, value: 'dvdadriel', href: profile.github },
  ]

  return (
    <SectionReveal id="contact" className="on-black">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <SectionHeader mark={t.contact.sectionNum} title={t.contact.title}>
          <p className="text-[1.0625rem]">{t.contact.subtitle}</p>
        </SectionHeader>

        <div className="mt-16 lg:mt-20" data-reveal>
          <p className="eyebrow">{t.contact.emailLabel}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="group break-all"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 4.6vw, 3.75rem)',
                letterSpacing: '-0.035em',
                lineHeight: 1.05,
                color: 'var(--color-amber)',
              }}
            >
              {profile.email}
            </a>

            <button type="button" onClick={copyEmail} className="btn">
              {copied ? t.contact.copiedBtn : t.contact.copyBtn}
            </button>
          </div>
        </div>

        <ul className="mt-16 lg:mt-20" data-reveal>
          {rows.map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="row-project rule-t flex flex-wrap items-center gap-x-8 gap-y-2 px-0 py-6 lg:px-6"
              >
                <span
                  className="w-28 shrink-0 text-[0.75rem] font-bold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--color-ink-soft)' }}
                >
                  {r.label}
                </span>
                <span className="min-w-0 flex-1 break-words text-[1.125rem] font-medium">
                  {r.value}
                </span>
                <ExternalMark />
              </a>
            </li>
          ))}
          <li className="rule-t" />
        </ul>

        {/* aria-live di luar tombol supaya pengumumannya tidak menimpa nama
            tombol saat sedang difokuskan. */}
        <p aria-live="polite" className="sr-only">
          {copied ? t.contact.copiedBtn : ''}
        </p>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-8 lg:mt-20">
          <ScrollCue to="hero" label={t.nav.top} up />
          <p className="numeric text-[0.75rem] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--color-ink-soft)' }}>
            {profile.location} · © {new Date().getFullYear()} {t.hero.name}
          </p>
        </footer>
      </div>
    </SectionReveal>
  )
}
