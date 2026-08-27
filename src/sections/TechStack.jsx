import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Pill from '../components/Pill.jsx'
import { profile } from '../data/profile.js'

export default function TechStack() {
  return (
    <section id="stack" className="px-6 md:px-16 max-w-6xl mx-auto py-24 md:py-36">
      <SectionHeading index="03" title="STACK" />
      <Reveal className="flex flex-wrap gap-3" stagger={0.04}>
        {profile.stack.map((s) => <Pill key={s}>{s}</Pill>)}
      </Reveal>
    </section>
  )
}
