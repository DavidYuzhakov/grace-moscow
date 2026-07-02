'use client'

import { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypingText({
  text,
  speed = 80,
  className = '',
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1))
      index++

      if (index >= text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <div className={`items-center max-w-10 mb-4`}>
      <h1 className={`leading-none text-white text-9xl ${className}`}>
        {displayedText}
      </h1>
    </div>
  )
}
