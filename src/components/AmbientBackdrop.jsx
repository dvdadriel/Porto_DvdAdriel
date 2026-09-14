import React, { useEffect, useState } from 'react'

/**
 * Latar ambient untuk section gelap.
 *
 * Poster SELALU dipasang sebagai background CSS, dan video hanya menumpuk di
 * atasnya. Artinya section ini tidak pernah tampil kosong — kalau video gagal
 * dimuat, di-block, atau formatnya tidak didukung, yang terlihat tetap gambar
 * yang benar, bukan lubang hitam.
 *
 * Video sengaja tidak dirender sama sekali (bukan sekadar di-pause) pada tiga
 * kondisi: layar kecil, reduced-motion, dan Save-Data. Elemen <video> dengan
 * autoplay tetap mengunduh isinya walau tidak terlihat — jadi menyembunyikannya
 * lewat CSS akan tetap menagih 79 KB ke orang yang justru sedang menghemat.
 */
export default function AmbientBackdrop() {
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = navigator.connection?.saveData === true

    const decide = () => setPlayVideo(wide.matches && !still.matches && !saveData)
    decide()

    wide.addEventListener('change', decide)
    still.addEventListener('change', decide)
    return () => {
      wide.removeEventListener('change', decide)
      still.removeEventListener('change', decide)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/media/bg-ledger-poster.webp)' }}
    >
      {playVideo && (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/bg-ledger-poster.webp"
        >
          <source src="/media/bg-ledger.webm" type="video/webm" />
        </video>
      )}

      {/* Lapisan tinta di atas video. Dua tugas sekaligus, dan keduanya nyata:
          videonya lebih terang dan lebih olive daripada latar section, jadi
          tanpa ini section keluar dari palet DAN kontras teks ikut turun
          mengikuti frame paling terang. Opacity 0.62 dipilih setelah mengukur
          teks yang benar-benar ter-render, bukan dikira dari nilai token.

          Memakai --color-night, BUKAN --color-ink: di dalam .on-ink token itu
          sudah ditukar jadi warna terang, jadi overlay-nya justru akan mengecat
          video dengan warna terang dan seluruh section memudar. */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--color-night)', opacity: 0.62 }}
      />
    </div>
  )
}
