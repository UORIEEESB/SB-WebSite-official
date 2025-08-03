'use client'

import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface HomepageData {
  Merch_Img: string
  Merch_Price: string
  Merch_Buy_Link: string
  // other fields...
}

export default function MerchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [merchData, setMerchData] = useState<HomepageData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/HomePageContent') // Adjust the route to your actual API route path
        const data = await res.json()
        setMerchData(data.homepageData)
      } catch (error) {
        console.error('Failed to fetch merch data', error)
      }
    }

    fetchData()

    const hasSeenModal = localStorage.getItem('seenMerchModal')
    if (hasSeenModal) {
      setTimeout(() => setIsOpen(true), 1000)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('seenMerchModal', 'true')
    setIsOpen(false)
  }

  if (!merchData) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
          {/* Glass Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/40"
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Dialog.Panel
                    className="relative bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl max-w-md w-full p-6 text-center space-y-4 text-white"
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                {/* Image with Animated Price Tag */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <Image
                    src={merchData.Merch_Img}
                    alt="IEEE Merch Pack"
                    width={350}
                    height={200}
                    className="rounded-xl object-cover mx-auto border border-white/20"
                  />

                  {/* Price Tag */}
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg"
                  >
                    {merchData.Merch_Price}
                  </motion.div>
                </motion.div>

                {/* Title & Description */}
                <Dialog.Title className="text-2xl font-extrabold text-white drop-shadow">
                  IEEE Merch Pack
                </Dialog.Title>
                <p className="text-sm text-white/90">
                  Show your IEEE spirit! Grab our exclusive Student Branch merch pack while stock lasts.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg bg-white/30 border border-white/40 hover:bg-white/40 transition-all"
                  >
                    Maybe Later
                  </button>
                  <a
                    href={merchData.Merch_Buy_Link}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all"
                  >
                    Buy Now
                  </a>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
