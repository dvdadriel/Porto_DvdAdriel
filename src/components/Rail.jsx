import React, { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Navigasi: rail permanen di desktop, sheet dari bawah di HP.
 *
 * Rail-nya berlatar --color-surface dan memotong hero yang gelap. Itu disengaja
 * — dia jadi punggung buku besarnya, bukan bilah yang mengambang di atas
 * konten.
 *
 * Di HP dia turun ke bar bawah, di zona ibu jari. Index dibuka dengan <dialog>
 * native, BUKAN div absolute: dialog punya ::backdrop, menutup dengan Escape,
 * mengunci fokus, dan hidup di top layer — jadi dia tidak bisa terpotong oleh
 * overflow:hidden milik container mana pun, yang merupakan cara paling umum
 * menu mobile rusak tanpa ketahuan.
 */

const ITEMS = [
  { id: 'about', key: 'about' },
  { id: 'work', key: 'work' },
  { id: 'projects', key: 'projects' },
  { id: 'stack', key: 'stack' },
  { id: 'contact', key: 'contact' },
]

export default function Rail({ activeSection }) {
  const { t, lang, toggleLang } = useLanguage()
  const sheet = useRef(null)

  const nextLang = lang === 'id' ? 'English' : 'Bahasa Indonesia'

  const IndexList = ({ onNavigate, big = false }) => (
    <ul className={big ? 'space-y-1' : 'space-y-2'}>
      {ITEMS.map((item) => {
        const active = activeSection === item.id
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={active ? 'true' : undefined}
              className={`flex items-center py-1 transition-colors duration-200 ${
                big ? 'text-[1.25rem]' : 'text-[0.9375rem]'
              }`}
              style={{ color: active ? 'var(--color-ink)' : 'var(--color-ink-soft)' }}
            >
              {/* Penanda aktif berupa garis pendek, bukan titik berwarna:
                  posisinya sejajar teks dan tidak menambah kosakata bentuk baru. */}
              <span
                aria-hidden="true"
                className="mr-3 h-px transition-all duration-200"
                style={{
                  width: active ? '1.25rem' : '0.5rem',
                  backgroundColor: active ? 'var(--color-ink)' : 'var(--color-rule)',
                }}
              />
              {t.nav[item.key]}
            </a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {/* ── Desktop ────────────────────────────────────────────────────── */}
      <nav
        aria-label={lang === 'id' ? 'Navigasi halaman' : 'Page navigation'}
        className="fixed inset-y-0 left-0 hidden w-[200px] flex-col justify-between px-6 py-8 lg:flex"
        style={{
          zIndex: 'var(--z-rail)',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-rule)',
        }}
      >
        <a href="#hero" className="text-[0.9375rem] font-medium">
          {t.hero.name}
        </a>

        <IndexList />

        <div>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={nextLang}
            className="text-[0.875rem] underline decoration-1 underline-offset-4"
            style={{ color: 'var(--color-ink-soft)', textDecorationColor: 'var(--color-rule)' }}
          >
            {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
          </button>
          <p className="numeric mt-3 text-[0.8125rem]" style={{ color: 'var(--color-ink-soft)' }}>
            2026
          </p>
        </div>
      </nav>

      {/* ── Mobile ─────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-x-0 bottom-0 flex items-stretch lg:hidden"
        style={{
          zIndex: 'var(--z-sticky)',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-rule)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <button
          type="button"
          onClick={() => sheet.current?.showModal()}
          className="flex flex-1 items-center justify-center px-5 py-4 text-[0.9375rem] font-medium"
        >
          Index
        </button>
        <button
          type="button"
          onClick={toggleLang}
          aria-label={nextLang}
          className="px-5 py-4 text-[0.9375rem]"
          style={{ borderLeft: '1px solid var(--color-rule)', color: 'var(--color-ink-soft)' }}
        >
          {lang === 'id' ? 'EN' : 'ID'}
        </button>
      </div>

      <dialog
        ref={sheet}
        className="m-0 mt-auto w-full max-w-none p-0 backdrop:bg-black/40"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-ink)' }}
        onClick={(e) => {
          // Klik di area backdrop menutup sheet. Perbandingannya ke elemen
          // <dialog> itu sendiri, jadi klik pada isi tidak ikut menutup.
          if (e.target === sheet.current) sheet.current.close()
        }}
      >
        <div className="px-6 pb-10 pt-8" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}>
          <IndexList big onNavigate={() => sheet.current?.close()} />
          <button
            type="button"
            onClick={() => sheet.current?.close()}
            className="rule-t mt-6 w-full py-4 text-left text-[0.9375rem]"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </dialog>
    </>
  )
}
