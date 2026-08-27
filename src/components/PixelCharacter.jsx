import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, onMotionOK } from '../lib/motion.js'

/**
 * Karakter piksel animasi berbasis GIF resolusi tinggi (640x640)
 * dengan image-rendering: pixelated untuk ketajaman 8-bit.
 *
 * Mendukung aksi:
 * - 'waving'  : untuk samping profil / hero
 * - 'coding'  : untuk area project
 * - 'dancing' : untuk area kontak
 * - 'walking' : untuk track scroll-driven walking buddy
 */

const ACTION_GIFS = {
  waving: '/sprites/waving.gif',
  coding: '/sprites/coding.gif',
  dancing: '/sprites/dancing.gif',
  walking: '/sprites/walking.gif',
}

const DEFAULT_SIZES = {
  waving: 190,
  coding: 110,
  dancing: 80,
  walking: 80,
}

export default function PixelCharacter({
  action = 'waving', // 'waving' | 'coding' | 'dancing' | 'walking'
  size,
  scale = 3,
  flip = false,
  className = '',
  alt,
  bob = false,
}) {
  const wrap = useRef(null)

  useGSAP(() => onMotionOK(() => {
    if (!bob || !wrap.current) return
    const tween = gsap.to(wrap.current, {
      y: -3,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    })
    return () => tween.kill()
  }), { dependencies: [bob], scope: wrap })

  const gifSrc = ACTION_GIFS[action] || `/sprites/${action}.gif`
  const computedSize = size || DEFAULT_SIZES[action] || (40 * scale)
  const defaultAlt = `Karakter piksel ${action}`

  return (
    <div
      ref={wrap}
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: computedSize,
        height: computedSize,
      }}
    >
      <img
        src={gifSrc}
        alt={alt || defaultAlt}
        className="w-full h-full object-contain pixelated pointer-events-none select-none"
        style={{
          imageRendering: 'pixelated',
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
        loading="eager"
      />
    </div>
  )
}
