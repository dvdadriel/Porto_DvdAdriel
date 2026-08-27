import React, { useState } from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const project = projects[selectedIdx]

  return (
    <section
      id="projects"
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-8 relative overflow-hidden"
    >
      {/* Header: Title + Coding GIF */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">02</p>
          <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
            <ShuffleText text="FEATURED PROJECTS" />
          </h2>
        </div>

        <div
          className="border-2 border-copper bg-surface p-2 flex items-center justify-center shrink-0"
          style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
          title="Pixel character coding"
        >
          <PixelCharacter action="coding" size={60} />
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {projects.map((p, idx) => {
          const isSelected = selectedIdx === idx
          return (
            <button
              key={p.slug}
              onClick={() => setSelectedIdx(idx)}
              className={`font-pixel text-[10px] sm:text-[12px] px-3 sm:px-4 py-2 border-2 transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'border-copper bg-copper text-cream -translate-y-0.5'
                  : 'border-copper/60 bg-surface text-sand hover:text-cream hover:border-copper'
              }`}
              style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}
            >
              <span className="opacity-70">0{idx + 1}.</span>
              <span>{p.name}</span>
            </button>
          )
        })}
      </div>

      {/* Active Project Card */}
      <div
        className="border-2 border-copper bg-surface p-4 sm:p-6 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8 items-start relative overflow-y-auto max-h-[58vh] lg:max-h-[64vh]"
        style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
      >
        {/* Left Column: Project Overview & Metrics */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-copper/40 pb-3">
            <h3 className="font-pixel text-[16px] sm:text-[22px] text-cream">
              <ShuffleText text={project.name} />
            </h3>
            <span className="text-xs sm:text-sm font-mono text-sand">{project.kicker}</span>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-cream/85 leading-relaxed">
            {project.summary}
          </p>

          {/* HUD Metrics */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {project.metrics.map((m) => (
              <div key={m.label} className="border border-copper/70 bg-ink/70 p-2.5">
                <dt className="font-pixel text-[9px] text-sand tracking-wider truncate">
                  {m.label}
                </dt>
                <dd className="mt-1 font-pixel text-xs sm:text-sm text-cream">{m.value}</dd>
                <dd className="text-[10px] text-cream/60 leading-tight mt-0.5 truncate">{m.note}</dd>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[11px] sm:text-[12px] border-2 border-copper bg-ink text-cream px-4 py-2 hover:bg-copper transition-colors flex items-center gap-1.5"
              style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
            >
              <span>SOURCE REPO</span>
              <span>↗</span>
            </a>
            {project.docs && (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-[11px] sm:text-[12px] border-2 border-copper/60 bg-ink/50 text-sand hover:text-cream px-4 py-2 transition-colors flex items-center gap-1.5"
              >
                <span>DOKUMENTASI</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Highlights & Caveat / Screenshot */}
        <div className="space-y-4">
          {project.shot && (
            <div className="border-2 border-copper/70 overflow-hidden" style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}>
              <img
                src={project.shot}
                alt={`Screenshot ${project.name}`}
                className="w-full h-36 sm:h-44 object-cover object-top pixelated"
                loading="lazy"
              />
            </div>
          )}

          <div>
            <p className="font-pixel text-[10px] sm:text-[11px] text-sand mb-2 tracking-wider">
              HIGHLIGHT ARSITEKTUR:
            </p>
            <ul className="space-y-1 text-xs sm:text-sm text-cream/75">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <span className="text-copper">▪</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.caveat && (
            <div className="border border-copper/50 bg-ink/60 p-3 text-[11px] sm:text-xs text-cream/70 leading-relaxed">
              <span className="font-pixel text-[9px] text-sand block mb-1">
                ⚠️ BATASAN / CAVEAT:
              </span>
              {project.caveat}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
