'use client'

import { useEffect, useState } from 'react'

type CounterProps = {
  target: number
  duration?: number
}

export function Counter({ target, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const end = start + duration
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    step()
  }, [target, duration])

  return <span>{count}</span>
}
