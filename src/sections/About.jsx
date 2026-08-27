import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { profile } from '../data/profile.js'

export default function About() {
  const { school, major, period } = profile.education
  return (
    <section id="about" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading index="04" title="Tentang" />
      <Reveal>
        <p className="text-lg text-fg-dim leading-relaxed max-w-2xl">
          Saya lebih tertarik pada apakah sesuatu benar-benar bekerja daripada apakah
          ia terlihat bekerja. Karena itu project saya biasanya punya bagian
          &ldquo;batasan yang diketahui&rdquo; — termasuk hal-hal yang belum berhasil.
        </p>
        <div className="mt-12 border-t border-line pt-8">
          <p className="font-mono text-xs text-fg-dim mb-2">Pendidikan</p>
          <p className="text-lg">{school}</p>
          <p className="text-fg-dim">{major} · {period}</p>
        </div>
      </Reveal>
    </section>
  )
}
