import React, { useState, useEffect, useRef } from 'react'

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/~■▲▼◀▶█▒░'

export default function ShuffleText({
  text = '',
  speed = 25,
  maxIterations = 8,
  sequential = true,
  characters = DEFAULT_CHARS,
  className = '',
  as: Component = 'span',
  triggerOnHover = true,
  triggerInView = true,
}) {
  const [displayText, setDisplayText] = useState(text)
  const isScramblingRef = useRef(false)
  const intervalRef = useRef(null)
  const elementRef = useRef(null)

  const scramble = (targetText = text) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    isScramblingRef.current = true
    let iteration = 0
    const length = targetText.length

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char
            if (sequential) {
              if (index < iteration) {
                return targetText[index]
              }
            } else {
              if (iteration >= maxIterations) {
                return targetText[index]
              }
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      })

      if (sequential) {
        iteration += 1 / (maxIterations / 3 || 1)
        if (iteration >= length) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setDisplayText(targetText)
          isScramblingRef.current = false
        }
      } else {
        iteration += 1
        if (iteration >= maxIterations) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setDisplayText(targetText)
          isScramblingRef.current = false
        }
      }
    }, speed)
  }

  useEffect(() => {
    setDisplayText(text)
    scramble(text)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text])

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScramblingRef.current) {
      scramble(text)
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
