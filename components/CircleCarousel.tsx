'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const sections = [
  { id: 'welcome' },
  { id: 'about' },
  { id: 'events' },
  { id: 'sb-timeline' },
  { id: 'team' },
]

export default function CircleCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animationImages, setAnimationImages] = useState<string[]>([])

  useEffect(() => {
    async function fetchAnimationImages() {
      try {
        const res = await fetch('/api/HomePageContent')
        const data = await res.json()
        const content = data.homepageData

        const fallback = '/images/welcome.jpg'
        const images: string[] = [
          content.Animation_img_1,
          content.Animation_img_2,
          content.Animation_img_3,
          content.Animation_img_4,
          content.Animation_img_5,
        ].map((img) => img || fallback)

        setAnimationImages(images)
      } catch (err) {
        console.error('Error fetching animation images:', err)
        setAnimationImages([
          '/images/welcome.jpg',
          '/images/presence.jpg',
          '/images/projects.jpg',
          '/images/team.jpg',
          '/images/default.jpg',
        ])
      }
    }

    fetchAnimationImages()
  }, [])

  // 🔹 Update activeIndex when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.6 } // section must be ~60% visible to count
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string, index: number) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveIndex(index)
    }
  }

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center">
      <div className="relative w-56 h-56 rounded-full border-8 border-orange-800 shadow-lg overflow-hidden bg-white">
        {/* Preview Image */}
        {animationImages.length > 0 && (
          <Image
            src={animationImages[activeIndex]}
            alt="preview"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}

        {/* Outer Dots */}
        {sections.map((section, i) => {
          const angle = (360 / sections.length) * i
          const radius = 120

          const x = radius * Math.cos((angle * Math.PI) / 180)
          const y = radius * Math.sin((angle * Math.PI) / 180)

          return (
            <motion.button
              key={i}
              className={`absolute w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'bg-white border-2 border-orange-600 scale-125'
                  : 'bg-orange-400'
              }`}
              style={{
                top: `calc(50% + ${y}px - 0.5rem)`,
                left: `calc(50% + ${x}px - 0.5rem)`,
              }}
              onClick={() => scrollToSection(section.id, i)}
              whileHover={{ scale: 1.2 }}
            />
          )
        })}
      </div>
    </div>
  )
}