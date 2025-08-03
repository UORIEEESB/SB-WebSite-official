'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const sections = [
  { id: 'welcome', preview: '/images/welcome.jpg' },
  { id: 'about', preview: '/images/about.jpg' },
  { id: 'events', preview: '/images/events.jpg' },
  { id: 'sb-timeline', preview: '/images/welcome.jpg' },
  { id: 'team', preview: '/images/team.jpg' },
]

export default function FloatingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [beamOffset, setBeamOffset] = useState(0)

  const circumference = 1 * Math.PI * 230 // for r=230
  const arcLength = 50 // beam length

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = scrollPosition / totalHeight

      // beam offset based on scroll percentage
      const offset = (1 - scrollPercent) * circumference
      setBeamOffset(offset)

      // Section detection
      const visibleSectionIndex = sections.findIndex((section) => {
        const element = document.getElementById(section.id)
        if (!element) return false

        const { top, height } = element.getBoundingClientRect()
        const offsetTop = top + window.scrollY
        return scrollPosition >= offsetTop && scrollPosition < offsetTop + height
      })

      if (visibleSectionIndex !== -1 && visibleSectionIndex !== activeIndex) {
        setActiveIndex(visibleSectionIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeIndex, circumference])

  return (
    <div className="fixed right-[-200px] top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <div className="relative w-[520px] h-[520px] rounded-full border-[6px] border-blue-600 shadow-[0_0_50px_#3b82f6] bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center">

        {/* Glowing beam arc around the perimeter */}
        <svg viewBox="0 0 500 500" className="absolute w-full h-full pointer-events-none">
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={beamOffset}
            className="animate-glow"
          />
        </svg>

        {/* Section Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sections[activeIndex].preview}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.6 }}
            className="relative w-[480px] h-[480px] rounded-full overflow-hidden"
          >
            <Image
              src={sections[activeIndex].preview}
              alt="Section image"
              fill
              className="object-cover rounded-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glow animation style */}
      <style jsx>{`
        .animate-glow {
          filter: drop-shadow(0 0 8px #3b82f6);
          transition: stroke-dashoffset 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
