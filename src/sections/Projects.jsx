import SectionHeading from '../components/SectionHeading.jsx'
import ProjectPanel from './ProjectPanel.jsx'
import PixelCharacter from '../components/PixelCharacter.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 max-w-6xl mx-auto py-24 md:py-36">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          index="02"
          title="PROJECT"
          sub="Empat project pribadi. Angka yang ditampilkan bisa ditelusuri ke hasil yang dipublikasikan — termasuk yang hasilnya kurang bagus."
          className="mb-0"
        />
        <div
          className="border-2 border-copper bg-surface p-3 flex items-center justify-center shrink-0 self-start md:self-end"
          style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
          title="Coding in progress"
        >
          <PixelCharacter action="coding" size={110} />
        </div>
      </div>
      <div className="divide-y-2 divide-copper/40">
        {projects.map((p, i) => <ProjectPanel key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  )
}
