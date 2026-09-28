import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { gsap, SplitText, onMotionOK } from '../lib/motion.js'
import ScrollCue from '../components/ScrollCue.jsx'

/**
 * Hero: satu layar, satu pernyataan, satu ajakan.
 *
 * Latarnya adalah tempat kata "chromatic" dikerjakan harfiah. Tiga bidang
 * warna dari palet melayang dengan mix-blend-mode: multiply, jadi di tempat
 * amber melewati navy muncul warna keempat yang tidak ada di palet — dan
 * warna itu berubah terus selama keduanya bergerak. Di atasnya ada kisi diam;
 * tanpa raster yang diam, bidang yang melayang di latar polos tidak terbaca
 * bergerak sama sekali.
 *
 * Judulnya punya dua salinan hantu berwarna amber dan navy yang mengendap ke
 * nol saat halaman dibuka — aberasi kromatik yang berhenti, bukan yang
 * berdenyut terus. Aberasi yang tidak pernah selesai terbaca sebagai layar
 * rusak, bukan sebagai efek.
 */
export default function Hero() {
  const { t } = useLanguage()
  const root = useRef(null)

  useGSAP(
    () => {
      return onMotionOK(() => {
        const q = gsap.utils.selector(root)
        let split = null
        const tweens = []

        // ── Latar ────────────────────────────────────────────────────────
        // Durasi 19 / 26 / 31 detik, sengaja tidak kelipatan satu sama lain.
        // Kalau seirama, ketiganya bertemu di posisi yang sama tiap siklus dan
        // polanya terbaca sebagai pengulangan — justru hal yang paling merusak
        // kesan "bergerak sendiri".
        //
        // Hanya x/y/scale yang dianimasikan: ketiganya properti compositing,
        // jadi tidak ada layout atau paint per frame walaupun bidangnya besar
        // dan di-blur 60px.
        q('[data-aura] > i').forEach((blob, i) => {
          tweens.push(
            gsap.to(blob, {
              xPercent: 'random(-38, 38)',
              yPercent: 'random(-30, 30)',
              scale: 'random(0.75, 1.4)',
              // 9 / 13 / 17 detik, sengaja bukan kelipatan satu sama lain.
              // Kalau seirama, ketiganya bertemu di posisi yang sama tiap
              // siklus dan polanya terbaca sebagai pengulangan.
              duration: [9, 13, 17][i],
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              repeatRefresh: true,
            })
          )
        })

        // ── Pembuka ──────────────────────────────────────────────────────
        // Pemecahan huruf DITUNDA sampai font display selesai diunduh.
        // SplitText membekukan posisi tiap glyph pada saat ia dipanggil; kalau
        // dipanggil selagi font pengganti masih dipakai, huruf-hurufnya dikunci
        // pada metrik yang salah dan judulnya tetap renggang setelah Nunito
        // masuk. Ini mode kegagalan SplitText yang paling sering dilaporkan.
        document.fonts.ready.then(() => {
          if (!root.current) return

          // HANYA baris pertama yang dipecah. Baris kedua membawa hantu
          // kromatiknya, dan SplitText membungkus tiap huruf dalam
          // display:inline-block — itu mematikan kerning antar-huruf, jadi
          // lebarnya melenceng beberapa piksel dari salinan hantu yang tidak
          // dipecah. Selisih itu menumpuk sepanjang baris dan yang terlihat
          // bukan aberasi yang mengendap, melainkan teks yang meleset.
          //
          // Jadi baris kedua naik utuh. Kontrasnya justru disengaja: satu baris
          // datang huruf demi huruf, satunya datang sekaligus lalu warnanya
          // mengendap.
          split = new SplitText(q('[data-anim="line"]'), { type: 'chars' })

          tweens.push(
            gsap
              .timeline({ defaults: { ease: 'expo.out' } })
              .fromTo(q('[data-anim="eyebrow"]'), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
              // stagger 0.016 dipilih terhadap panjang headline sebenarnya: di
              // bawah itu kaskadenya tidak terbaca, di atasnya huruf terakhir
              // sampai terlambat dan kalimatnya terasa dieja.
              .fromTo(split.chars, { yPercent: 118 }, { yPercent: 0, duration: 1, stagger: 0.016 }, '-=0.3')
              .fromTo(q('[data-anim="whole"]'), { yPercent: 112 }, { yPercent: 0, duration: 1.1 }, '-=0.75')
              // Dua hantu berangkat dari geseran berlawanan dan berhenti tepat
              // menumpuk. Keduanya di-tween di timeline yang sama supaya
              // pengendapannya selesai bersamaan dengan huruf terakhir naik.
              .fromTo(
                q('[data-ghost="a"]'),
                { xPercent: -2.4, yPercent: 0 },
                { xPercent: 0, duration: 1.5 },
                '-=0.85'
              )
              .fromTo(
                q('[data-ghost="b"]'),
                { xPercent: 2.4, yPercent: 0 },
                { xPercent: 0, duration: 1.5 },
                '<'
              )
              .fromTo(
                q('[data-anim="below"] > *'),
                { y: 16, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08 },
                '-=1.2'
              )
              .fromTo(q('[data-anim="cue"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.4')
          )
        })

        // Dibersihkan manual: timeline pembukanya lahir di dalam promise, jadi
        // setelah gsap.context milik useGSAP selesai merekam.
        return () => {
          tweens.forEach((tw) => tw.kill())
          split?.revert()
        }
      })
    },
    { scope: root }
  )

  const [lineA, lineB] = t.hero.headline

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Tiga bidang diberi warna dan posisi lewat inline style karena nilainya
          unik per bidang; yang berulang — blur, radius, blend mode — hidup di
          .aura > i di index.css. */}
      <div className="aura" data-aura aria-hidden="true">
        <i style={{ top: '-14%', left: '-10%', width: '46%', height: '64%', background: 'var(--color-amber)' }} />
        <i style={{ top: '14%', left: '52%', width: '44%', height: '62%', background: 'var(--color-navy)' }} />
        <i style={{ top: '44%', left: '18%', width: '40%', height: '56%', background: 'var(--color-amber)' }} />
      </div>
      <div className="grid-rule" aria-hidden="true">
        <i />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-6 pb-28 pt-24 sm:px-10 lg:px-14 lg:pb-8 lg:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <p className="eyebrow" data-anim="eyebrow">
            {t.hero.name} — {t.hero.role}
          </p>

          {/* overflow-hidden per baris supaya huruf yang naik terpotong rapi di
              batas baris, bukan melayang dari luar layar. Margin negatif +
              padding memberi ruang bagi glyph yang menjorok keluar kotaknya. */}
          <h1 className="mt-9 lg:mt-12">
            <span className="-mx-[0.05em] block overflow-hidden px-[0.05em] pb-[0.08em]">
              <span data-anim="line" className="block">
                {lineA}
              </span>
            </span>

            {/* Baris kedua membawa hantunya: tiga salinan teks yang sama —
                satu asli, dua hantu berwarna yang digeser ke arah berlawanan
                lalu mengendap. Ketiganya harus punya kerning yang identik,
                karena itu baris ini tidak pernah dipecah SplitText. */}
            <span className="-mx-[0.05em] block overflow-hidden px-[0.05em] pb-[0.08em]">
              <span className="chroma block" data-anim="whole">
                <span
                  className="chroma-ghost block"
                  data-ghost="a"
                  aria-hidden="true"
                  style={{ color: 'var(--color-amber)' }}
                >
                  {lineB}
                </span>
                <span
                  className="chroma-ghost block"
                  data-ghost="b"
                  aria-hidden="true"
                  style={{ color: 'var(--color-navy)' }}
                >
                  {lineB}
                </span>
                <span className="relative block">{lineB}</span>
              </span>
            </span>
          </h1>

          <div data-anim="below" className="mt-12">
            <a href="#projects" className="btn btn-solid w-full sm:w-auto">
              {t.hero.projectsBtn}
            </a>
          </div>
        </div>

        <div data-anim="cue" className="rule-t mt-14 flex justify-between gap-6 pt-6">
          <ScrollCue to="about" label={t.nav.about} />
          <p
            className="hidden self-end text-[0.75rem] font-bold uppercase tracking-[0.18em] sm:block"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {t.about.location}
          </p>
        </div>
      </div>
    </section>
  )
}
