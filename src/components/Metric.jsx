import React from 'react'

/**
 * Satu angka dengan label dan sumbernya.
 *
 * `note` bukan hiasan: itu yang membedakan angka yang bisa diperiksa dari angka
 * yang cuma diklaim. "+24,65%" sendirian tidak berarti apa-apa; "+24,65% alpha
 * vs IHSG, jendela 730d" bisa dibantah orang.
 *
 * Angkanya dirender <dd> dan labelnya <dt> di dalam <dl> milik pemanggil —
 * strukturnya memang daftar istilah-dan-definisi, dan menuliskannya begitu
 * membuat screen reader membacakan pasangannya, bukan dua teks yang kebetulan
 * berdekatan.
 */
export default function Metric({ label, value, note }) {
  return (
    <div className="rule-t pt-3">
      <dt className="text-[0.8125rem]" style={{ color: 'var(--color-ink-soft)' }}>
        {label}
      </dt>
      <dd className="numeric mt-1 text-[1.5rem] leading-tight">{value}</dd>
      {note && (
        <dd className="mt-0.5 text-[0.8125rem]" style={{ color: 'var(--color-ink-soft)' }}>
          {note}
        </dd>
      )}
    </div>
  )
}
