import React, { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Navigasi atas: kelompok pill bergaris, bukan rail samping.
 *
 * Rail 200px sebelumnya memakan seperlima lebar layar sepanjang halaman dan
 * membuat konten terdorong ke kanan tanpa pernah mengisi bidangnya. Nav di atas
 * mengembalikan lebar penuh ke tipografi — yang di desain ini adalah subjeknya,
 * bukan pelengkap.
 *
 * Di HP: bar bawah di zona ibu jari, index dibuka dengan <dialog> native.
 * Dialog punya ::backdrop, tutup dengan Escape, kunci fokus, dan hidup di top
 * layer — jadi tidak bisa terpotong overflow:hidden container mana pun, yang
 * adalah cara paling umum menu mobile rusak tanpa ketahuan.
 */

const ITEMS = [
  { id: 'about', key: 'about' },
  { id: 'work', key: 'work' },
  { id: 'projects', key: 'projects' },
  { id: 'stack', key: 'stack' },
]

export default function TopNav({ activeSection }) {
  const { t, lang, toggleLang } = useLanguage()
  const sheet = useRef(null)

  const nextLang = lang === 'id' ? 'English' : 'Bahasa Indonesia'

  return (
    <>
      {/* Statis, bukan fixed. Halaman ini berganti-ganti terang dan gelap;
          nav yang melayang di atasnya akan jadi blok gelap di atas section
          gelap, dan tidak ada satu warna chrome pun yang benar di keduanya.
          Yang ikut menggulung tidak punya masalah itu. */}
      <header className="mx-auto hidden w-full max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10 lg:flex lg:px-14">
        <a
          href="#hero"
          className="btn"
          style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-ink)' }}
        >
          DA
        </a>

        <nav
          aria-label={lang === 'id' ? 'Navigasi halaman' : 'Page navigation'}
          className="flex"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          {ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'true' : undefined}
              className="btn"
              style={{
                marginLeft: i === 0 ? 0 : '-1.5px',
                backgroundColor:
                  activeSection === item.id ? 'var(--color-ink)' : 'var(--color-surface)',
                color: activeSection === item.id ? 'var(--color-surface)' : 'var(--color-ink)',
                borderColor: 'var(--color-ink)',
              }}
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={nextLang}
            className="btn btn-outline"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <a href="#contact" className="btn btn-solid" style={{ marginLeft: '-1.5px' }}>
            {t.nav.contact}
          </a>
        </div>
      </header>

      {/* ── Mobile ─────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-x-0 bottom-0 flex items-stretch lg:hidden"
        style={{
          zIndex: 'var(--z-sticky)',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1.5px solid var(--color-ink)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <button
          type="button"
          onClick={() => sheet.current?.showModal()}
          className="flex flex-1 items-center justify-center px-5 py-4 text-[1rem] uppercase"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Index
        </button>
        <a
          href="#contact"
          className="flex items-center px-5 py-4 text-[1rem] uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            borderLeft: '1.5px solid var(--color-ink)',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-surface)',
          }}
        >
          {t.nav.contact}
        </a>
        <button
          type="button"
          onClick={toggleLang}
          aria-label={nextLang}
          className="px-5 py-4 text-[1rem] uppercase"
          style={{ fontFamily: 'var(--font-display)', borderLeft: '1.5px solid var(--color-ink)' }}
        >
          {lang === 'id' ? 'EN' : 'ID'}
        </button>
      </div>

      <dialog
        ref={sheet}
        className="m-0 mt-auto w-full max-w-none p-0 backdrop:bg-black/50"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-ink)',
          borderTop: '1.5px solid var(--color-ink)',
        }}
        onClick={(e) => {
          // Dibandingkan ke elemen <dialog> sendiri, jadi klik pada isi tidak
          // ikut menutup — hanya klik di area backdrop.
          if (e.target === sheet.current) sheet.current.close()
        }}
      >
        <div
          className="px-6 pt-8"
          style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))' }}
        >
          <ul>
            {[...ITEMS, { id: 'contact', key: 'contact' }].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => sheet.current?.close()}
                  className="rule-t block py-4 uppercase"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem' }}
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => sheet.current?.close()}
            className="rule-t mt-4 w-full py-4 text-left text-[0.9375rem]"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </dialog>
    </>
  )
}
