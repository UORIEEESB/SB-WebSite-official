'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function AwardBadge() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
          className="fixed bottom-4 left-4 z-50 w-64 h-40 md:w-80 md:h-52"
        >
          {/* Podium Image */}
          <Image
            src="/images/award-badge.jpg"
            alt="Podium"
            fill
            className="object-contain"
          />

          {/* Adjusted Glowing Title */}
          <motion.div
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
