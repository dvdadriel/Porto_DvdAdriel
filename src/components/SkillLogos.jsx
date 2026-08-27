import React from 'react'

export function RubyIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="Ruby on Rails">
      <path d="M4 8L12 2L20 8L12 22L4 8Z" fill="#CC0000" stroke="#FF4D4D" strokeWidth="1.5" />
      <path d="M8 8L12 2L16 8L12 22L8 8Z" fill="#E60000" />
      <path d="M4 8H20" stroke="#FFF" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

export function LaravelIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="Laravel">
      <rect x="3" y="10" width="8" height="10" fill="#FF2D20" stroke="#FFA29C" strokeWidth="1" />
      <rect x="11" y="4" width="10" height="16" fill="#E02216" stroke="#FFA29C" strokeWidth="1" />
      <path d="M7 10L15 4M11 20L19 14" stroke="#FFF" strokeWidth="1.5" />
    </svg>
  )
}

export function GoIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="Go Language">
      <rect x="2" y="5" width="20" height="14" rx="2" fill="#00ADD8" />
      <text x="12" y="16" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">GO</text>
    </svg>
  )
}

export function ReactIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="React">
      <circle cx="12" cy="12" r="3" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
    </svg>
  )
}

export function CIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="C Language">
      <rect x="3" y="3" width="18" height="18" fill="#00599C" stroke="#659AD2" strokeWidth="1.5" />
      <text x="12" y="17" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">C</text>
    </svg>
  )
}

export function OutsystemsIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="Outsystems">
      <circle cx="12" cy="12" r="9" fill="#E62325" />
      <circle cx="12" cy="12" r="4.5" fill="#2C3639" />
      <rect x="12" y="3" width="2" height="6" fill="#FFF" />
    </svg>
  )
}

export function PostgresIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="PostgreSQL">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="#336791" stroke="#5E8FB7" strokeWidth="1.5" />
      <text x="12" y="16" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SQL</text>
    </svg>
  )
}

export function DockerIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`pixelated ${className}`} aria-label="Docker">
      <rect x="3" y="11" width="18" height="8" rx="2" fill="#2496ED" />
      <rect x="5" y="7" width="3" height="3" fill="#2496ED" />
      <rect x="9" y="7" width="3" height="3" fill="#2496ED" />
      <rect x="13" y="7" width="3" height="3" fill="#2496ED" />
      <rect x="9" y="3" width="3" height="3" fill="#2496ED" />
    </svg>
  )
}
