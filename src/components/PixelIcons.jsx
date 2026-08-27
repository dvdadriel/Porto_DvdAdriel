import React from 'react'

export function MailIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className={`pixelated inline-block ${className}`} aria-hidden="true">
      {/* 8-bit pixel envelope */}
      <rect x="1" y="3" width="14" height="2" fill={color} />
      <rect x="1" y="5" width="2" height="7" fill={color} />
      <rect x="13" y="5" width="2" height="7" fill={color} />
      <rect x="1" y="11" width="14" height="2" fill={color} />
      {/* fold */}
      <rect x="3" y="5" width="2" height="2" fill={color} />
      <rect x="11" y="5" width="2" height="2" fill={color} />
      <rect x="5" y="7" width="2" height="2" fill={color} />
      <rect x="9" y="7" width="2" height="2" fill={color} />
      <rect x="7" y="8" width="2" height="2" fill={color} />
    </svg>
  )
}

export function LinkedinIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className={`pixelated inline-block ${className}`} aria-hidden="true">
      {/* 8-bit pixel LinkedIn 'in' */}
      <rect x="2" y="2" width="3" height="3" fill={color} />
      <rect x="2" y="6" width="3" height="8" fill={color} />
      <rect x="7" y="6" width="3" height="8" fill={color} />
      <rect x="9" y="6" width="4" height="2" fill={color} />
      <rect x="12" y="8" width="2" height="6" fill={color} />
    </svg>
  )
}

export function PhoneIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className={`pixelated inline-block ${className}`} aria-hidden="true">
      {/* 8-bit pixel handset */}
      <rect x="3" y="2" width="4" height="3" fill={color} />
      <rect x="9" y="11" width="4" height="3" fill={color} />
      <rect x="4" y="5" width="2" height="3" fill={color} />
      <rect x="6" y="8" width="3" height="2" fill={color} />
      <rect x="9" y="10" width="2" height="2" fill={color} />
    </svg>
  )
}

export function GithubIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className={`pixelated inline-block ${className}`} aria-hidden="true">
      {/* 8-bit pixel Octocat */}
      <rect x="5" y="1" width="6" height="2" fill={color} />
      <rect x="3" y="3" width="10" height="2" fill={color} />
      <rect x="2" y="5" width="12" height="5" fill={color} />
      {/* ears */}
      <rect x="2" y="2" width="2" height="2" fill={color} />
      <rect x="12" y="2" width="2" height="2" fill={color} />
      {/* body / tentacles */}
      <rect x="3" y="10" width="10" height="3" fill={color} />
      <rect x="4" y="13" width="2" height="2" fill={color} />
      <rect x="10" y="13" width="2" height="2" fill={color} />
      <rect x="7" y="12" width="2" height="3" fill={color} />
      {/* cutouts for face */}
      <rect x="5" y="7" width="2" height="2" fill="#2C3639" />
      <rect x="9" y="7" width="2" height="2" fill="#2C3639" />
    </svg>
  )
}

export function WhatsappIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className={`pixelated inline-block ${className}`} aria-hidden="true">
      {/* 8-bit chat bubble */}
      <rect x="3" y="1" width="10" height="2" fill={color} />
      <rect x="1" y="3" width="14" height="8" fill={color} />
      <rect x="3" y="11" width="9" height="2" fill={color} />
      <rect x="1" y="13" width="3" height="2" fill={color} />
      <rect x="2" y="11" width="2" height="2" fill={color} />
      {/* inner phone dot */}
      <rect x="5" y="5" width="2" height="2" fill="#2C3639" />
      <rect x="9" y="7" width="2" height="2" fill="#2C3639" />
    </svg>
  )
}

export function CoinIcon({ className = "w-4 h-4", color = "#D4AF37" }) {
  return (
    <svg viewBox="0 0 16 16" fill={color} className={`pixelated inline-block animate-pulse ${className}`} aria-hidden="true">
      {/* Mario 8-bit coin */}
      <rect x="5" y="1" width="6" height="2" fill={color} />
      <rect x="3" y="3" width="10" height="10" fill={color} />
      <rect x="5" y="13" width="6" height="2" fill={color} />
      {/* inner reflection */}
      <rect x="7" y="4" width="2" height="8" fill="#FFF385" />
    </svg>
  )
}
