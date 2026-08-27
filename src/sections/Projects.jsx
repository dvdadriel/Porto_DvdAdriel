import SectionHeading from '../components/SectionHeading.jsx'
import ProjectPanel from './ProjectPanel.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 max-w-6xl mx-auto py-24 md:py-36">
      <SectionHeading
        index="02"
        title="PROJECT"
        sub="Empat project pribadi. Angka yang ditampilkan bisa ditelusuri ke hasil yang dipublikasikan — termasuk yang hasilnya kurang bagus."
      />
      <div className="divide-y-2 divide-copper/40">
        {projects.map((p, i) => <ProjectPanel key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  )
}
