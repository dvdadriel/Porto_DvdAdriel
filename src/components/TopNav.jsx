import React, { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Navigasi: tiga kelompok kapsul terpisah — monogram, tautan, aksi.
 *
 * Dipisah karena ketiganya memang tiga hal berbeda: identitas, navigasi, dan
 * tindakan. Versi sebelumnya menyatukan semuanya dalam satu bar bersudut siku,
 * dan akibatnya monogram terbaca sebagai item nav keempat.
 *
 * Nav HARUS fixed, bukan pilihan gaya: isinya hidup di luar #smooth-content.
 * Elemen fixed di dalam kontainer ber-transform jadi relatif terhadap
 * kontainer itu dan ikut menggulung — jadi apa pun yang harus tinggal di layar
 * harus berada di luar, dan apa pun di luar tidak bisa lagi ikut mengalir
 * bersama halaman.
 *
 * Warnanya dikunci putih-dan-navy, tidak mengikuti blok di bawahnya. Halaman
 * ini melewati putih, navy, mist, dan hitam; chrome yang mencoba menyesuaikan
 * diri ke keempatnya akan berkedip di tiap batas blok, dan bidang putih pekat
 * justru terbaca jelas di atas keempatnya.
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
]

function Monogram() {
  return (
    <svg viewBox="78 -1760 2726 1760" className="h-3.5 w-auto" fill="currentColor" aria-hidden="true">
      <path d="M78 0V-1760H562Q752 -1760 848.0 -1654.5Q944 -1549 944 -1346V-522Q944 -272 856.5 -136.0Q769 0 550 0ZM432 -311H493Q590 -311 590 -405V-1313Q590 -1401 566.5 -1426.5Q543 -1452 471 -1452H432Z M958.08 0 1128.08 -1760H1725.08L1892.08 0H1559.08L1534.08 -284H1322.08L1300.08 0ZM1347.08 -565H1507.08L1430.08 -1460H1414.08Z M1870.16 0 2040.16 -1760H2637.16L2804.16 0H2471.16L2446.16 -284H2234.16L2212.16 0ZM2259.16 -565H2419.16L2342.16 -1460H2326.16Z" />
    </svg>
  )
}

export default function TopNav({ activeSection }) {
  const { t, lang, toggleLang } = useLanguage()
  const sheet = useRef(null)

  const nextLang = lang === 'id' ? 'English' : 'Bahasa Indonesia'

  return (
    <>
      {/* Tiga kelompok direntangkan selebar konten, bukan dikumpulkan di
          tengah: monogram sejajar dengan tepi kiri tipografi halaman, dan
          aksinya sejajar dengan tepi kanan. Nav yang mengambang di tengah tidak
          punya hubungan dengan apa pun di bawahnya. */}
      <header
        className="fixed inset-x-0 top-0 hidden px-6 pt-5 sm:px-10 lg:block lg:px-14"
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4">
          <a href="#hero" aria-label={t.hero.name} className="nav-group px-5 py-3">
            <Monogram />
          </a>

          <nav
            aria-label={lang === 'id' ? 'Navigasi halaman' : 'Page navigation'}
            className="nav-group p-1"
          >
            {ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className="nav-link"
              >
                <span className="reel">
                  <span data-reel={t.nav[item.key]}>{t.nav[item.key]}</span>
                </span>
              </a>
            ))}
          </nav>

          <div className="nav-group p-1">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={nextLang}
              className="nav-link px-4 uppercase tracking-[0.14em]"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <a
              href="#contact"
              aria-current={activeSection === 'contact' ? 'true' : undefined}
              className="nav-link"
              style={{ background: 'var(--color-navy)', color: 'var(--color-white)' }}
            >
              <span className="reel">
                <span data-reel={t.nav.contact}>{t.nav.contact}</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Mobile ─────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-x-3 bottom-3 flex items-stretch lg:hidden"
        style={{
          zIndex: 'var(--z-sticky)',
          marginBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="nav-group flex-1 p-1">
          <button
            type="button"
            onClick={() => sheet.current?.showModal()}
            className="nav-link flex-1 justify-center"
          >
            Index
          </button>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={nextLang}
            className="nav-link px-4 uppercase tracking-[0.14em]"
          >
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <a
            href="#contact"
            className="nav-link"
            style={{ background: 'var(--color-amber)', color: 'var(--color-navy)' }}
          >
            {t.nav.contact}
          </a>
        </div>
      </div>

      <dialog
        ref={sheet}
        className="m-0 mt-auto w-full max-w-none bg-transparent p-3 backdrop:bg-black/60"
        onClick={(e) => {
          // Dibandingkan ke elemen <dialog> sendiri, jadi klik pada isi tidak
          // ikut menutup — hanya klik di area backdrop.
          if (e.target === sheet.current) sheet.current.close()
        }}
      >
        <div
          className="px-6 pb-6 pt-8"
          style={{
            background: 'var(--color-white)',
            color: 'var(--color-navy)',
            border: '2px solid var(--color-navy)',
            borderRadius: '1.5rem',
            marginBottom: 'calc(3.75rem + env(safe-area-inset-bottom))',
          }}
        >
          <ul>
            {[...ITEMS, { id: 'contact', key: 'contact' }].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => sheet.current?.close()}
                  className="block py-4"
                  style={{
                    borderTop: '1px solid color-mix(in srgb, #14213D 16%, #FFFFFF)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '2rem',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {t.nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => sheet.current?.close()}
            className="mt-4 w-full py-4 text-left text-[0.75rem] font-bold uppercase tracking-[0.18em]"
            style={{ borderTop: '1px solid color-mix(in srgb, #14213D 16%, #FFFFFF)', opacity: 0.6 }}
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </dialog>
    </>
  )
}
