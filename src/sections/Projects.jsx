import React, { useState } from 'react'
import PixelCharacter from '../components/PixelCharacter.jsx'
import ShuffleText from '../components/ShuffleText.jsx'
import SectionDownArrow from '../components/SectionDownArrow.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  const { t } = useLanguage()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const projectList = t.projects.items
  const project = projectList[selectedIdx] || projectList[0]
  const staticProjectData = projects[selectedIdx] || projects[0]

  return (
    <section
      id="projects"
      className="min-h-screen lg:h-screen snap-start snap-always flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto pt-16 pb-12 relative overflow-hidden"
    >
      {/* Header: Title + Coding GIF */}
      <div className="flex items-center justify-between gap-4 mb-3 sm:mb-5">
        <div>
          <p className="font-pixel text-[12px] sm:text-[14px] text-sand tracking-widest">{t.projects.sectionNum}</p>
          <h2 className="font-pixel text-[20px] sm:text-[30px] md:text-[36px] text-copper leading-[1.3] tracking-wide">
            <ShuffleText text={t.projects.title} key={t.projects.title} />
          </h2>
        </div>

        <div
          className="border-2 border-copper bg-surface p-2 flex items-center justify-center shrink-0"
          style={{ boxShadow: '4px 4px 0 var(--color-shadow)' }}
          title="Pixel character coding"
        >
          <PixelCharacter action="coding" size={56} />
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {projectList.map((p, idx) => {
          const isSelected = selectedIdx === idx
          return (
            <button
              key={p.slug}
              onClick={() => setSelectedIdx(idx)}
              className={`font-pixel text-[10px] sm:text-[11px] px-3 sm:px-3.5 py-1.5 border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
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
        key={project.slug}
        className="border-2 border-copper bg-surface p-4 sm:p-5 grid lg:grid-cols-[1.1fr_1fr] gap-5 lg:gap-7 items-start relative overflow-y-auto max-h-[56vh] lg:max-h-[62vh]"
        style={{ boxShadow: '6px 6px 0 var(--color-shadow)' }}
      >
        {/* Left Column: Project Overview & Metrics */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-copper/40 pb-2.5">
            <h3 className="font-pixel text-[15px] sm:text-[20px] text-cream">
              <ShuffleText text={project.name} key={project.name} />
            </h3>
            <span className="text-xs sm:text-sm font-mono text-sand">{project.kicker}</span>
          </div>

          <p className="mt-2.5 text-xs sm:text-sm text-cream/90 leading-relaxed font-normal">
            {project.summary}
          </p>

          {/* HUD Metrics */}
          <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {project.metrics.map((m) => (
              <div key={m.label} className="border border-copper/70 bg-ink/80 p-2">
                <dt className="font-pixel text-[8px] sm:text-[9px] text-sand tracking-wider truncate">
                  {m.label}
                </dt>
                <dd className="mt-1 font-pixel text-[11px] sm:text-xs text-cream">{m.value}</dd>
                <dd className="text-[10px] text-cream/60 leading-tight mt-0.5 truncate">{m.note}</dd>
              </div>
            ))}
          </div>

          {/* Action Links & Live Access */}
          <div className="mt-4 flex flex-wrap gap-2.5">
            <a
              href={staticProjectData.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel text-[10px] sm:text-[11px] border-2 border-copper bg-ink text-cream px-3.5 py-2 hover:bg-copper transition-colors flex items-center gap-1.5"
              style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
            >
              <span>{t.projects.sourceRepo}</span>
              <span>↗</span>
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-[10px] sm:text-[11px] border-2 border-copper bg-surface text-sand hover:text-cream px-3.5 py-2 hover:border-cream transition-colors flex items-center gap-1.5"
                style={{ boxShadow: '2px 2px 0 var(--color-shadow)' }}
              >
                <span>{project.demoLabel}</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Highlights & Screenshot / Caveat */}
        <div className="space-y-3">
          {staticProjectData.shot && (
            <div className="border-2 border-copper/70 overflow-hidden" style={{ boxShadow: '3px 3px 0 var(--color-shadow)' }}>
              <img
                src={staticProjectData.shot}
                alt={`Screenshot ${project.name}`}
                className="w-full h-32 sm:h-40 object-cover object-top pixelated"
                loading="lazy"
              />
            </div>
          )}

          <div>
            <p className="font-pixel text-[9px] sm:text-[10px] text-sand mb-1.5 tracking-wider">
              {t.projects.highlightsTitle}
            </p>
            <ul className="space-y-1 text-xs sm:text-sm text-cream/80">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-1.5 font-normal">
                  <span className="text-copper">▪</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.caveat && (
            <div className="border border-copper/50 bg-ink/70 p-2.5 text-[11px] sm:text-xs text-cream/75 leading-relaxed">
              <span className="font-pixel text-[8px] sm:text-[9px] text-sand block mb-1">
                ⚠️ {t.projects.caveatTitle}
              </span>
              <p className="font-normal">{project.caveat}</p>
            </div>
          )}
        </div>
      </div>

      {/* Down Arrow Indicator to Stack */}
      <SectionDownArrow targetId="stack" label="STACK" />
    </section>
  )
}
