'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface AwardBadgeProps {
  onLoad?: () => void
}

export default function AwardBadge({ onLoad }: AwardBadgeProps) {
  const [visible, setVisible] = useState(true)
  const [awardImage, setAwardImage] = useState<string | null>(null)

  // Hide after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 12000)
    return () => clearTimeout(timer)
  }, [])

  // Fetch award image
  useEffect(() => {
    const fetchAward = async () => {
      try {
        const res = await fetch('/api/HomePageContent')
        const { homepageData } = await res.json()
        setAwardImage(homepageData?.Award_Image)
        onLoad?.()
      } catch (err) {
        console.error('Failed to fetch award image:', err)
        setAwardImage(null)
        onLoad?.()
      }
    }
    fetchAward()
  }, [onLoad]) // add onLoad to dependencies

  return (
    <AnimatePresence>
      {visible && awardImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="fixed bottom-4 left-4 z-50 w-64 h-40 md:w-80 md:h-52"
        >
          <Image
            src={awardImage}
            alt="Award"
            fill
            className="object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
