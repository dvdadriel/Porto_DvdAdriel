// Self-check for the terrain math. Run: node src/lib/terrain.test.mjs
// The one thing that must hold: a skill box sits directly above the point on the
// curve the character walks over. If the path math drifts, this fails before the eye does.
import assert from 'node:assert/strict'
import { buildTerrain, BOX_LIFT, LABEL_LIFT, VIEW } from './terrain.js'

for (const count of [5, 8]) {
  const { boxes, peaks, totalLength, pointAt, strokeD } = buildTerrain(count)

  assert.equal(boxes.length, count)
  assert.ok(totalLength > VIEW.w, 'a curved path is longer than the viewBox is wide')
  assert.ok(strokeD.startsWith('M 0 '), 'ground starts at the left screen edge')

  boxes.forEach((box, i) => {
    const ground = pointAt(box.p)
    // The box is directly above the hilltop the character walks over.
    assert.ok(
      Math.abs(ground.x - box.x) < 2,
      `count=${count} box ${i}: x off by ${Math.abs(ground.x - box.x).toFixed(2)}`
    )
    assert.ok(
      Math.abs(ground.y - BOX_LIFT - box.y) < 2,
      `count=${count} box ${i}: y off by ${Math.abs(ground.y - BOX_LIFT - box.y).toFixed(2)}`
    )
    // A box plus its label always clears the top of the viewBox.
    assert.ok(box.y - LABEL_LIFT > 0, `count=${count} box ${i}: label clipped off the top`)
    assert.ok(peaks[i].y + BOX_LIFT < VIEW.h, `count=${count} box ${i}: hill below the ground`)
    if (i > 0) assert.ok(peaks[i - 1].x < peaks[i].x, 'peaks stay ordered left to right')
  })

  // Progress is monotonic in x, which is what lets nearest-x find nearest-peak.
  let prevX = -Infinity
  for (let p = 0; p <= 1; p += 0.01) {
    const { x } = pointAt(p)
    assert.ok(x >= prevX - 0.5, `x must not go backwards at p=${p.toFixed(2)}`)
    prevX = x
  }

  // Tangent angles stay walkable — no cliffs. Measured in viewBox space, which the
  // non-uniform stretch makes shallower on screen, so this is the conservative bound.
  for (let p = 0; p <= 1; p += 0.005) {
    const { angle } = pointAt(p)
    assert.ok(Math.abs(angle) < 45, `slope too steep (${angle.toFixed(1)}°) at p=${p.toFixed(3)}`)
  }
}

console.log('terrain: ok')
