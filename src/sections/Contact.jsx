import React, { useState } from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import { MailIcon, LinkedinIcon, PhoneIcon, GithubIcon } from '../components/PixelIcons.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { profile } from '../data/profile.js'

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contacts = [
    {
      label: t.contact.emailLabel,
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: MailIcon,
      action: t.contact.sendEmail,
      extraBtn: {
        text: copied ? t.contact.copiedBtn : t.contact.copyBtn,
        onClick: handleCopyEmail,
      },
    },
    {
      label: t.contact.linkedinLabel,
      value: 'linkedin.com/in/david-adriel-alvyn/',
      href: profile.linkedin,
      icon: LinkedinIcon,
      action: t.contact.connectLinkedin,
    },
    {
      label: t.contact.phoneLabel,
      value: profile.phone,
      href: profile.whatsapp,
      icon: PhoneIcon,
      action: t.contact.chatWa,
    },
    {
      label: t.contact.githubLabel,
      value: 'github.com/dvdadriel',
      href: profile.github,
      icon: GithubIcon,
      action: t.contact.viewRepo,
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
            <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">{t.contact.sectionNum}</p>
            <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
              <ShuffleText text={t.contact.title} key={t.contact.title} />
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-cream/75 font-normal">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Dancing Pixel Character */}
          <div
            className="border-2 border-copper bg-surface p-2 sm:p-3 flex items-center justify-center shrink-0"
            style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
            title="Pixel character dancing"
          >
            <PixelCharacter action="dancing" size={72} />
          </div>
        </div>

        {/* Contact Grid with 8-bit Icons */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
          {contacts.map((c) => {
            const Icon = c.icon
            return (
              /* min-w-0 di kartu DAN di span nilainya, keduanya wajib.

                 Grid item default punya min-width:auto, jadi ia tidak boleh
                 menyusut di bawah lebar min-content-nya. Dan `truncate` memakai
                 white-space:nowrap, yang membuat min-content span tetap selebar
                 teks PENUH — jadi teksnya tidak pernah benar-benar terpotong, ia
                 justru mendorong kartunya melebihi sel grid dan keluar layar.
                 Di 375px kartunya jadi 379px sementara selnya 343px, dan tombol
                 aksinya terpotong di tepi kanan.

                 min-w-0 mengizinkan penyusutan, sehingga truncate baru bekerja
                 sebagaimana namanya. shrink-0 pada tombol menjaga aksinya utuh —
                 yang boleh menyusut adalah nilainya, bukan tombolnya. */
              <div
                key={c.label}
                className="min-w-0 border-2 border-copper bg-surface p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-copper"
                style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-copper/40 pb-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 text-copper shrink-0" />
                    <span className="font-pixel text-[10px] sm:text-[11px] text-sand tracking-wider truncate">
                      {c.label}
                    </span>
                  </div>
                  {c.extraBtn && (
                    <button
                      onClick={c.extraBtn.onClick}
                      className="shrink-0 font-pixel text-[9px] px-2 py-0.5 border border-copper bg-ink text-cream hover:bg-copper transition-colors cursor-pointer"
                    >
                      {c.extraBtn.text}
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="min-w-0 truncate text-xs sm:text-sm text-cream font-mono">
                    {c.value}
                  </span>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-pixel text-[10px] text-copper hover:text-cream transition-colors whitespace-nowrap"
                  >
                    {c.action}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Bottom Bar (Only Name and Year 2026 as requested in #11) */}
      <div className="border-t-2 border-copper/50 pt-4 mt-6 flex items-center justify-center font-pixel text-[11px] text-sand/80">
        <div className="flex items-center gap-2">
          <span className="text-copper">▮</span>
          <span>{profile.name.toUpperCase()} · 2026</span>
        </div>
      </div>
    </footer>
  )
}
