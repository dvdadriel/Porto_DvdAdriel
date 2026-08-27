export default function SectionHeading({ index, title, sub }) {
  return (
    <div className="mb-12">
      <p className="font-pixel text-[16px] text-sand mb-4 tracking-widest">{index}</p>
      <h2 className="font-pixel text-[24px] md:text-[40px] text-copper leading-[1.5] tracking-wide">
        {title}
      </h2>
      {sub && <p className="mt-6 text-cream/80 max-w-2xl leading-relaxed">{sub}</p>}
    </div>
  )
}
