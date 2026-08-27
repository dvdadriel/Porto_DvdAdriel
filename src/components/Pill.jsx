export default function Pill({ children }) {
  return (
    <span className="inline-block font-mono text-xs border border-line rounded-full px-3 py-1 text-fg-dim">
      {children}
    </span>
  )
}
