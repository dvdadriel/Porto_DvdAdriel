/**
 * Hero terrain geometry — pure math, no DOM, no React.
 *
 * Everything lives in a fixed viewBox coordinate space. The <svg> is rendered with
 * preserveAspectRatio="none", so these numbers never change on resize and nothing
 * ever needs re-sampling.
 *
 * The curve is the single source of truth: ground, character, and skill boxes are
 * all derived from the same sampled path.
 */

export const VIEW = { w: 1000, h: 240 }

/** How far above its hilltop a skill box floats, in viewBox units. */
export const BOX_LIFT = 46
/** How far above the box its skill label sits. Hill heights are bounded so that a
 *  box plus its label always clears the top of the viewBox. */
export const LABEL_LIFT = 34

// Non-uniform hill spacing and heights, as fractions/units of the base gap.
// Deterministic tables rather than Math.random so the layout is stable across
// reloads and the self-check can assert against it.
const SPACING_JITTER = [0, 0.62, -0.41, 0.88, -0.70, 0.33, -0.55, 0.79]
// Relative hill heights, 0 = lowest, 1 = highest. Adjacent values stay within ~0.7 of
// each other: a table that swings between the extremes on neighbouring hills makes a
// sawtooth, and the height difference alone eats the whole slope budget.
const PEAK_LEVEL = [0.9, 0.4, 0.8, 0.1, 0.6, 0.2, 0.7, 0.35]

const BASE_Y = 130 // height of the lowest hilltop
const MARGIN = 90 // keeps the first/last hill off the screen edge
const STEPS_PER_SEGMENT = 24 // arc-length sampling resolution

// Slope budget. Hill amplitude and valley depth are both derived from the horizontal
// gap they have to span, so the terrain stays walkable at any hill count. Fixed
// heights don't survive: jitter can pull two hills 30% closer than the base spacing,
// and at 8 hills that turns a constant-depth valley into a ~47° wall.
const RISE_PER_RUN = 0.62 // target rise:run before the curve's own overshoot
const AMPLITUDE_RATIO = 0.24 // hill height as a fraction of the base gap
const AMPLITUDE_MAX = 30
const VALLEY_MIN_DROP = 8
const VALLEY_MAX_DROP = 46
const EDGE_DROP = 34 // how far below its neighbouring hill the screen edge sits

const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi)

/**
 * Hilltops, left to right. One per skill.
 * @returns {{x: number, y: number}[]}
 */
export function makePeaks(count = 8) {
  const span = VIEW.w - MARGIN * 2
  const gap = span / Math.max(1, count - 1)
  const amplitude = Math.min(AMPLITUDE_MAX, gap * AMPLITUDE_RATIO)
  return Array.from({ length: count }, (_, i) => ({
    x: MARGIN + gap * i + SPACING_JITTER[i % SPACING_JITTER.length] * gap * 0.18,
    y: BASE_Y - amplitude * PEAK_LEVEL[i % PEAK_LEVEL.length],
  }))
}

/** Peaks plus the valleys between them plus the two screen-edge anchors. */
function makeNodes(peaks) {
  const nodes = [{ x: 0, y: peaks[0].y + EDGE_DROP }]
  peaks.forEach((peak, i) => {
    nodes.push(peak)
    const next = peaks[i + 1]
    if (!next) return
    // The steeper flank of a valley climbs its own depth plus the height difference
    // between the two hills, over half the gap. Spend what's left of the budget.
    const halfRun = (next.x - peak.x) / 2
    const heightDiff = Math.abs(next.y - peak.y)
    nodes.push({
      x: (peak.x + next.x) / 2,
      y:
        Math.max(peak.y, next.y) +
        clamp(RISE_PER_RUN * halfRun - heightDiff, VALLEY_MIN_DROP, VALLEY_MAX_DROP),
    })
  })
  nodes.push({ x: VIEW.w, y: peaks[peaks.length - 1].y + EDGE_DROP })
  return nodes
}

/**
 * Cardinal spline through p1→p2 expressed as a cubic Bezier.
 *
 * TENSION 0.5 is plain Catmull-Rom, which overshoots each node by ~40% and turns a
 * 37° valley flank into a 52° one. 0.35 keeps the curve smooth but hugs the nodes,
 * so the slope budget above actually means something.
 */
const TENSION = 0.35
const K = TENSION / 3

function toBezier(p0, p1, p2, p3) {
  return [
    { x: p1.x + (p2.x - p0.x) * K, y: p1.y + (p2.y - p0.y) * K },
    { x: p2.x - (p3.x - p1.x) * K, y: p2.y - (p3.y - p1.y) * K },
  ]
}

function bezierSegments(nodes) {
  const segs = []
  for (let i = 0; i < nodes.length - 1; i++) {
    const p0 = nodes[i - 1] ?? nodes[i]
    const p1 = nodes[i]
    const p2 = nodes[i + 1]
    const p3 = nodes[i + 2] ?? nodes[i + 1]
    const [c1, c2] = toBezier(p0, p1, p2, p3)
    segs.push({ p1, c1, c2, p2 })
  }
  return segs
}

function bezierAt({ p1, c1, c2, p2 }, t) {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return {
    x: a * p1.x + b * c1.x + c * c2.x + d * p2.x,
    y: a * p1.y + b * c1.y + c * c2.y + d * p2.y,
  }
}

const round = (n) => Math.round(n * 100) / 100

/**
 * Build the terrain.
 *
 * @param {number} count number of hills / skill boxes
 * @returns {{
 *   peaks: {x:number,y:number}[],
 *   boxes: {x:number,y:number,p:number,len:number}[],
 *   strokeD: string,
 *   fillD: string,
 *   totalLength: number,
 *   pointAt: (p:number) => {x:number,y:number,angle:number},
 * }}
 *   `strokeD` is the bare ground line; `fillD` is the same line closed along the
 *   bottom of the viewBox for the earth silhouette. `pointAt` takes progress
 *   0..1 along the walk and returns a position plus the tangent angle in degrees.
 */
export function buildTerrain(count = 8) {
  const peaks = makePeaks(count)
  const segs = bezierSegments(makeNodes(peaks))

  // Arc-length table: cumulative distance -> point.
  const samples = []
  let total = 0
  let prev = bezierAt(segs[0], 0)
  samples.push({ ...prev, len: 0 })
  for (const seg of segs) {
    for (let k = 1; k <= STEPS_PER_SEGMENT; k++) {
      const pt = bezierAt(seg, k / STEPS_PER_SEGMENT)
      total += Math.hypot(pt.x - prev.x, pt.y - prev.y)
      samples.push({ ...pt, len: total })
      prev = pt
    }
  }

  const pointAt = (p) => {
    const target = Math.min(Math.max(p, 0), 1) * total
    // Binary search the arc-length table.
    let lo = 0
    let hi = samples.length - 1
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (samples[mid].len <= target) lo = mid
      else hi = mid
    }
    const a = samples[lo]
    const b = samples[hi]
    const span = b.len - a.len
    const t = span > 0 ? (target - a.len) / span : 0
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
    }
  }

  // Each box owns the progress value of its hilltop. The curve is monotonic in x,
  // so nearest-x is an exact match for nearest-peak.
  const boxes = peaks.map((peak) => {
    let best = samples[0]
    for (const s of samples) {
      if (Math.abs(s.x - peak.x) < Math.abs(best.x - peak.x)) best = s
    }
    return {
      x: round(peak.x),
      y: round(peak.y - BOX_LIFT),
      p: best.len / total,
      len: best.len,
    }
  })

  const strokeD =
    `M ${round(segs[0].p1.x)} ${round(segs[0].p1.y)} ` +
    segs
      .map(
        (s) =>
          `C ${round(s.c1.x)} ${round(s.c1.y)}, ${round(s.c2.x)} ${round(s.c2.y)}, ` +
          `${round(s.p2.x)} ${round(s.p2.y)}`
      )
      .join(' ')

  return {
    peaks,
    boxes,
    strokeD,
    fillD: `${strokeD} L ${VIEW.w} ${VIEW.h} L 0 ${VIEW.h} Z`,
    totalLength: total,
    pointAt,
  }
}
