import React, { useState, useEffect, useRef } from 'react'

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/~■▲▼◀▶█▒░'

export default function ShuffleText({
  text = '',
  speed = 30,
  maxIterations = 10,
  sequential = true,
  characters = DEFAULT_CHARS,
  className = '',
  as: Component = 'span',
  triggerOnHover = true,
  triggerInView = true,
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const elementRef = useRef(null)
  const hasTriggeredRef = useRef(false)

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)
    let iteration = 0
    const length = text.length

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char
            if (sequential) {
              if (index < iteration) {
                return text[index]
              }
            } else {
              if (iteration >= maxIterations) {
                return text[index]
              }
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      })

      if (sequential) {
        iteration += 1 / (maxIterations / 3 || 1)
        if (iteration >= length) {
          clearInterval(interval)
          setDisplayText(text)
          setIsScrambling(false)
        }
      } else {
        iteration += 1
        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          setIsScrambling(false)
        }
      }
    }, speed)
  }

  useEffect(() => {
    if (!triggerInView) {
      scramble()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true
            scramble()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [text])

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble()
    }
  }

  return (
    <Component
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block ${className}`}
    >
      {displayText}
    </Component>
  )
}
