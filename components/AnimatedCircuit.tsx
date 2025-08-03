import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function AnimatedCircuit() {
  const pathRefs = useRef<SVGPathElement[]>([])
  const containerRef = useRef<HTMLDivElement>(null) // ← add this
  const [paths, setPaths] = useState<string[]>([])
  const [pageHeight, setPageHeight] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)

  useEffect(() => {
    function updateSize() {
      setPageHeight(document.documentElement.scrollHeight)
      setPageWidth(window.innerWidth)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (containerRef.current && pageWidth && pageHeight) {
      containerRef.current.style.height = `${pageHeight}px`
      containerRef.current.style.width = `${pageWidth}px`
    }
  }, [pageHeight, pageWidth])

  useEffect(() => {
    if (!pageHeight || !pageWidth) return

    const directions = [
      { dx: 1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: -1 },
    ]

    const generatePath = () => {
      const segments = 6 + Math.floor(Math.random() * 5)

      let x = Math.random() * pageWidth
      let y = Math.random() * pageHeight
      let path = `M${x.toFixed(2)} ${y.toFixed(2)}`

      for (let i = 0; i < segments; i++) {
        const dir = directions[Math.floor(Math.random() * directions.length)]
        const step = 50 + Math.random() * 70

        let newX = x + dir.dx * step
        let newY = y + dir.dy * step

        newX = Math.min(Math.max(newX, 0), pageWidth)
        newY = Math.min(Math.max(newY, 0), pageHeight)

        if (dir.dx !== 0) {
          path += ` H${newX.toFixed(2)}`
          x = newX
        } else {
          path += ` V${newY.toFixed(2)}`
          y = newY
        }
      }

      return path
    }

    const numPaths = 400
    const generatedPaths = Array.from({ length: numPaths }, generatePath)
    setPaths(generatedPaths)
  }, [pageHeight, pageWidth])

  useEffect(() => {
    if (!paths.length) return
    pathRefs.current.forEach((path, i) => {
      gsap.fromTo(
        path,
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 5 + (i % 4),
          repeat: -1,
          ease: 'power1.inOut',
          delay: i * 0.25,
        }
      )
    })
  }, [paths])

  if (!pageHeight || !pageWidth) return null

  return (
    <div
      ref={containerRef}
      className="animated-circuit fixed top-0 left-0 z-0 pointer-events-none overflow-hidden"
    >
      <svg
        width={pageWidth}
        height={pageHeight}
        viewBox={`0 0 ${pageWidth} ${pageHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathRefs.current[i] = el
            }}
            d={d}
            stroke="#0ff"
            strokeWidth="1"
            opacity="0.15"
            className="drop-shadow-[0_0_4px_#0ff]"
            fill="none"
          />
        ))}
      </svg>
    </div>
  )
}
