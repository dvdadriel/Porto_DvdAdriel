import React, { useEffect, useRef, useState } from 'react'

/**
 * Carousel yang berjalan sendiri untuk tangkapan layar aplikasi yang hidup.
 *
 * Transisinya crossfade + skala halus, bukan geser: semua slide berukuran sama
 * dan berisi antarmuka gelap yang mirip, jadi gerakan menyamping hanya membuat
 * mata mengejar sesuatu yang ternyata tidak berubah. Pudar-dan-mendekat membaca
 * sebagai "layar berikutnya", bukan "kereta bergerak".
 *
 * Ukuran slot dikunci lewat aspect-ratio, jadi tidak ada pergeseran layout saat
 * gambar berikutnya belum selesai dimuat.
 */

const INTERVAL = 4200

export default function ShowcaseCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    // Hormati reduced-motion: yang tersisa satu gambar diam, bukan carousel
    // yang berjalan lebih lambat. Rotasi otomatis adalah gerak yang tidak
    // diminta siapa pun, dan itu persis yang dimatikan setelan tersebut.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (still.matches || paused) return

    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, INTERVAL)
    return () => clearInterval(timer.current)
  }, [items.length, paused])

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: '16 / 10' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {items.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          srcSet={item.srcSet}
          sizes="(max-width: 1024px) 100vw, 48vw"
          width="1440"
          height="900"
          alt={item.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden={i !== index}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            border: '1.5px solid var(--color-ink)',
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 900ms var(--ease-out-expo), transform 1400ms var(--ease-out-expo)',
          }}
        />
      ))}

      {/* Penanda posisi merangkap kontrol. Dibuat sebagai tombol sungguhan,
          bukan titik dekoratif: carousel yang berjalan sendiri tanpa cara
          menghentikannya adalah jebakan bagi orang yang membaca lambat. */}
      <div className="absolute -bottom-8 left-0 flex gap-2">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={item.alt}
            aria-current={i === index ? 'true' : undefined}
            className="h-8 py-3.5"
            style={{ width: i === index ? '2.5rem' : '1.25rem' }}
          >
            <span
              className="block h-px w-full transition-all duration-500"
              style={{
                backgroundColor: i === index ? 'var(--color-ink)' : 'var(--color-rule)',
                height: i === index ? '2px' : '1px',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
