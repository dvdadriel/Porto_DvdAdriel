export default function SectionHeading({ index, title, sub }) {
  return (
    <div className="mb-14">
      <p className="font-mono text-xs text-accent mb-3">{index}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-fg-dim max-w-2xl leading-relaxed">{sub}</p>}
    </div>
  )
}
