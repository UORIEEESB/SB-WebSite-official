'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function AwardBadge() {
  const [visible, setVisible] = useState(true)
  const [awardImage, setAwardImage] = useState<string | null>(null)

  useEffect(() => {
    // Hide after 8 seconds
    const timer = setTimeout(() => setVisible(false), 12000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchAward = async () => {
      try {
        const res = await fetch('/api/HomePageContent')
        const { homepageData } = await res.json()
        setAwardImage(homepageData?.Award_Image)
      } catch (err) {
        console.error('Failed to fetch award image:', err)
      }
    }
    fetchAward()
  }, [])

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
          {/* Podium Image */}
          <Image
            src={awardImage}
            alt="Award"
            fill
            className="object-contain"
          />

          {/* Glowing Title */}
          {/*<motion.div
            animate={{
              textShadow: [
                '0 0 5px rgba(255, 215, 0, 0.6)',
                '0 0 15px rgba(255, 215, 0, 1)',
                '0 0 5px rgba(255, 215, 0, 0.6)',
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: 'easeInOut',
            }}
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 text-center"
          >
            <h2 className="text-base md:text-lg font-semibold text-yellow-400 select-none">
              Champion
            </h2>
          </motion.div>*/}
          </motion.div>
      )}
    </AnimatePresence>
  )
}
