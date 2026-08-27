import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import { profile } from '../data/profile.js'

export default function About() {
  const { school, major, period } = profile.education
  return (
    <section id="about" className="px-6 md:px-16 max-w-6xl mx-auto py-24 md:py-36">
      <SectionHeading index="04" title="TENTANG" />
      <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
        <Reveal>
          <p className="text-cream/80 leading-relaxed max-w-2xl">
            Saya lebih tertarik pada apakah sesuatu benar-benar bekerja daripada apakah
            ia terlihat bekerja. Karena itu project saya biasanya punya bagian
            &ldquo;batasan yang diketahui&rdquo; — termasuk hal-hal yang belum berhasil.
          </p>
          <div className="mt-10 border-2 border-copper bg-surface p-6"
               style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}>
            <p className="font-pixel text-[16px] text-sand mb-4 tracking-wider">PENDIDIKAN</p>
            <p className="text-cream">{school}</p>
            <p className="mt-1 text-sm text-sand">{major} · {period}</p>
          </div>
        </Reveal>
        {/* Karakter tampak belakang — ia "menghadap" ke isi halaman. */}
        <div className="hidden md:block">
          <PixelCharacter dir="back" scale={3} />
        </div>
      </div>
    </section>
  )
}
