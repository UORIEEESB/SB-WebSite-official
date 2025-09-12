'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LaunchingPage({
  onEnter,
}: {
  onEnter: () => Promise<void>
}) {
  const [loadingHome, setLoadingHome] = useState(false)

  const handleEnter = async () => {
    setLoadingHome(true)       // show high-tech loader
    await onEnter()            // waits for Home page preparation
    // optional: keep loader until Home fully loaded
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        background: `radial-gradient(
          circle at 25% 35%, 
          #005A9D 0%,    
          #004081 35%,  
          #002B5D 65%,   
          #001834 90%    
        )`,
      }}
    >
      {/* Fullscreen Transparent Background Image */}
      <Image
        src="/images/background.png" // Replace with your image path
        alt="Background"
        fill
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
        priority
      />

      {/* Floating Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="w-[28rem] h-[28rem] rounded-full border-2 border-blue-400 opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[40rem] h-[40rem] rounded-full border border-blue-500 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* IEEE Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-8 z-20"
      >
        <Image
          src="/images/IEEE-UoR-Logo.png"
          alt="IEEE Logo"
          width={500}
          height={500}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-5xl font-extrabold tracking-wide text-center drop-shadow-lg z-20"
      >
        Official Website
      </motion.h1>

      {/* Launch Button */}
      {!loadingHome && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          className="mt-10 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg shadow-lg transition z-20"
        >
          Launch Now
        </motion.button>
      )}

      {/* High-Tech Loader Overlay */}
      <AnimatePresence>
        {loadingHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            style={{
              background: `linear-gradient(135deg, 
                rgba(0, 98, 155, 0.95) 0%, 
                rgba(0, 76, 127, 0.97) 50%, 
                rgba(0, 47, 77, 0.98) 100%)`
            }}
          >
            {/* Network Nodes */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {Array.from({ length: 12 }).map((_, i) => {
                const positions = [
                  { x: 15, y: 20 }, { x: 85, y: 25 }, { x: 25, y: 60 }, { x: 75, y: 70 },
                  { x: 45, y: 35 }, { x: 55, y: 80 }, { x: 10, y: 75 }, { x: 90, y: 45 },
                  { x: 35, y: 15 }, { x: 65, y: 90 }, { x: 20, y: 40 }, { x: 80, y: 60 }
                ]
                const pos = positions[i] || { x: 50, y: 50 }

                return (
                  <div key={`node-${i}`} className="absolute">
                    <motion.div
                      className="w-2 h-2 bg-blue-300 rounded-full"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                    />

                    {/* Connection lines */}
                    {i < 8 && (
                      <motion.div
                        className="absolute w-px bg-gradient-to-r from-blue-300 to-transparent"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          width: `${Math.abs(positions[(i + 1) % 12].x - pos.x)}%`,
                          height: '1px',
                          transformOrigin: 'left',
                          transform: `rotate(${Math.atan2(
                            positions[(i + 1) % 12].y - pos.y,
                            positions[(i + 1) % 12].x - pos.x
                          ) * 180 / Math.PI}deg)`
                        }}
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Loader Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <Image
                src="/images/IEEE-UoR-Logo.png"
                alt="IEEE Logo"
                width={500}
                height={500}
                className="drop-shadow-2xl"
              />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-80 mb-6"
            >
              <div className="h-1 bg-blue-200 bg-opacity-20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-300 to-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-center"
            >
              <motion.p
                className="text-white font-medium text-lg mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                Loading...
              </motion.p>
              <motion.p
                className="text-blue-200 text-sm opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Preparing your IEEE experience
              </motion.p>
            </motion.div>

            {/* IEEE Brand Footer */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className="text-blue-200 text-xs font-light tracking-wide">
                IEEE • Advancing Technology for Humanity
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
