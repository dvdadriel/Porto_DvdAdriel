import React, { useState } from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import { MailIcon, LinkedinIcon, PhoneIcon, GithubIcon, WhatsappIcon } from '../components/PixelIcons.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contacts = [
    {
      label: 'EMAIL',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: MailIcon,
      action: 'KIRIM EMAIL ↗',
      extraBtn: {
        text: copied ? 'TERCOPY! ✓' : 'COPY',
        onClick: handleCopyEmail,
      },
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/dvdadriel',
      href: profile.linkedin,
      icon: LinkedinIcon,
      action: 'CONNECT ↗',
    },
    {
      label: 'TELEPON / WA',
      value: profile.phone,
      href: profile.whatsapp,
      icon: PhoneIcon,
      action: 'CHAT WA ↗',
    },
    {
      label: 'GITHUB',
      value: 'github.com/dvdadriel',
      href: profile.github,
      icon: GithubIcon,
      action: 'LIHAT REPO ↗',
    },
  ]

  return (
    <footer
      id="contact"
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-between px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-20 pb-8 relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">05</p>
            <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
              <ShuffleText text="HUBUNGI SAYA" />
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-cream/75">
              Terbuka untuk peluang kerja full-time, diskusi arsitektur backend, dan proyek menarik.
            </p>
          </div>

          {/* Dancing Pixel Character */}
          <div
            className="border-2 border-copper bg-surface p-2 sm:p-3 flex items-center justify-center shrink-0"
            style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
            title="Pixel character dancing"
          >
            <PixelCharacter action="dancing" size={76} />
          </div>
        </div>

        {/* Contact Grid with 8-bit Icons */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
          {contacts.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.label}
                className="border-2 border-copper bg-surface p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-copper/100"
                style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
              >
                <div className="flex items-center justify-between border-b border-copper/40 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-copper" />
                    <span className="font-pixel text-[10px] sm:text-[11px] text-sand tracking-wider">
                      {c.label}
                    </span>
                  </div>
                  {c.extraBtn && (
                    <button
                      onClick={c.extraBtn.onClick}
                      className="font-pixel text-[9px] px-2 py-0.5 border border-copper bg-ink text-cream hover:bg-copper transition-colors cursor-pointer"
                    >
                      {c.extraBtn.text}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-xs sm:text-sm text-cream font-mono truncate">{c.value}</span>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-pixel text-[10px] text-copper hover:text-cream transition-colors whitespace-nowrap"
                  >
                    {c.action}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t-2 border-copper/50 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-pixel text-[10px] text-sand/80">
        <div className="flex items-center gap-2">
          <span className="text-copper">▮</span>
          <span>{profile.name.toUpperCase()} · 2026</span>
        </div>
        <div className="text-[9px] text-cream/50">
          VITE · REACT 19 · TAILWIND CSS · GSAP · 8-BIT SLATE & COPPER
        </div>
      </div>
    </footer>
  )
}
