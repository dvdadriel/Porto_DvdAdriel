import SectionHeading from '../components/SectionHeading.jsx'
import ProjectPanel from './ProjectPanel.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 max-w-5xl mx-auto py-28 md:py-40">
      <SectionHeading
        index="02"
        title="Project"
        sub="Empat project pribadi. Angka yang ditampilkan bisa ditelusuri ke hasil yang dipublikasikan di repo masing-masing — termasuk yang hasilnya kurang bagus."
      />
      {projects.map((p, i) => <ProjectPanel key={p.slug} project={p} index={i} />)}
    </section>
  )
}
