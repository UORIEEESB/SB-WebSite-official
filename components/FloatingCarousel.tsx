'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Section {
  id: string
  preview: string
}

const sectionIds = ['welcome', 'about', 'events', 'sb-timeline', 'team']

export default function FloatingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [beamOffset, setBeamOffset] = useState(0)
  const [sections, setSections] = useState<Section[]>([])

  const circumference = 1 * Math.PI * 230 // for r=230
  const arcLength = 50 // beam length

  useEffect(() => {
    async function fetchAnimationImages() {
      try {
        const res = await fetch('/api/HomePageContent')
        const data = await res.json()
        const content = data.homepageData

        const fallback = '/images/welcome.jpg'

        const images = [
          content.Animation_img_1,
          content.Animation_img_2,
          content.Animation_img_3,
          content.Animation_img_4,
          content.Animation_img_5,
        ].map((img) => img || fallback)

        const populatedSections = sectionIds.map((id, index) => ({
          id,
          preview: images[index] || fallback,
        }))

        setSections(populatedSections)
      } catch (error) {
        console.error('Failed to fetch animation images:', error)
        setSections(sectionIds.map((id, i) => ({
          id,
          preview: `/images/fallback${i + 1}.jpg`,
        })))
      }
    }

    fetchAnimationImages()
  }, [])

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
      <div className="relative w-[520px] h-[520px] rounded-full border-[6px] border-green-600 shadow-[0_0_50px_#00843D] bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center">

        {/* Glowing beam arc around the perimeter */}
        <svg viewBox="0 0 500 500" className="absolute w-full h-full pointer-events-none">
          <circle
            cx="250"
            cy="250"
            r="243"
            fill="none"
            stroke="#00843D"
            strokeWidth="5"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={beamOffset}
            className="animate-glow"
          />
        </svg>

        {/* Section Image */}
<AnimatePresence mode="wait">
  {sections[activeIndex] && (
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
  )}
</AnimatePresence>
      </div>

      {/* Glow animation style */}
      <style jsx>{`
        .animate-glow {
          filter: drop-shadow(0 0 8px #00843D);
          transition: stroke-dashoffset 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
