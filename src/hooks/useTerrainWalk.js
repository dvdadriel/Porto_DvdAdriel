import { useEffect, useMemo, useRef, useState } from 'react'
import { buildTerrain } from '../lib/terrain.js'

/**
 * Drives the character walking the terrain. Logic only — this hook renders nothing
 * and touches no DOM.
 *
 * Split by update frequency, because that is what keeps the hero cheap:
 *   - continuous values (position, angle, jump arc) go to `onFrame`, once per rAF.
 *     The caller writes them straight to a ref'd element's transform. No re-render.
 *   - discrete events (which box was hit, which label is showing) come back as
 *     React state, and change at most a couple of times per second.
 *
 * The walk ping-pongs across the terrain and dwells on each hilltop, so every skill
 * gets its own beat instead of all of them firing in a rush.
 */

const DEFAULTS = {
  count: 8,
  traverseMs: 31000, // one full crossing — slow on purpose
  dwellMs: 600, // pause on each hilltop after landing
  jumpMs: 380, // length of the hop that pops the box
  labelMs: 1500, // how long the skill name stays up above the box
}

export function useTerrainWalk(options = {}) {
  const { count, traverseMs, dwellMs, jumpMs, labelMs } = { ...DEFAULTS, ...options }
  const onFrame = options.onFrame

  const terrain = useMemo(() => buildTerrain(count), [count])

  const [hitIdx, setHitIdx] = useState(null) // box currently popped / label showing
  const [activeIdx, setActiveIdx] = useState(0) // last skill collected, sticky

  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  useEffect(() => {
    const reduced =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reduced motion: park the character on the first hilltop and never animate.
    if (reduced) {
      const box = terrain.boxes[0]
      const at = terrain.pointAt(box.p)
      setActiveIdx(0)
      onFrameRef.current?.({ ...at, p: box.p, dir: 1, jump: 0, dwelling: true })
      return
    }

    const speed = terrain.totalLength / traverseMs // viewBox units per ms
    const peakLens = terrain.boxes.map((b) => b.len)

    let dist = 0
    let dir = 1
    let dwellLeft = 0
    let jumpLeft = 0
    let labelTimer = null
    let raf = 0
    let last = performance.now()

    const collect = (idx) => {
      jumpLeft = jumpMs
      setHitIdx(idx)
      setActiveIdx(idx)
      clearTimeout(labelTimer)
      labelTimer = setTimeout(() => setHitIdx(null), labelMs)
    }

    const tick = (now) => {
      const dt = Math.min(now - last, 50) // clamp so a backgrounded tab can't teleport
      last = now

      if (jumpLeft > 0) jumpLeft = Math.max(0, jumpLeft - dt)

      if (dwellLeft > 0) {
        dwellLeft -= dt
      } else {
        let next = dist + dir * speed * dt

        // Hilltop crossing: compare the sign of (position - peak) before and after.
        // O(8) per frame, and correct no matter which way we are travelling.
        for (let i = 0; i < peakLens.length; i++) {
          const before = dist - peakLens[i]
          const after = next - peakLens[i]
          if (before !== 0 && Math.sign(before) !== Math.sign(after)) {
            next = peakLens[i]
            dwellLeft = dwellMs
            collect(i)
            break
          }
        }

        if (next >= terrain.totalLength) {
          next = terrain.totalLength
          dir = -1
        } else if (next <= 0) {
          next = 0
          dir = 1
        }
        dist = next
      }

      const p = dist / terrain.totalLength
      const at = terrain.pointAt(p)
      onFrameRef.current?.({
        ...at,
        p,
        dir,
        // 0 -> 1 -> 0 arc. The view decides how many pixels high that is.
        jump: jumpLeft > 0 ? Math.sin((1 - jumpLeft / jumpMs) * Math.PI) : 0,
        dwelling: dwellLeft > 0,
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(labelTimer)
    }
  }, [terrain, traverseMs, dwellMs, jumpMs, labelMs])

  return { terrain, hitIdx, activeIdx }
}
