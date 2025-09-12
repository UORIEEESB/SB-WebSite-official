'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface LoaderAnimationProps {
  isLoading: boolean
  onAnimationComplete?: () => void
}

const LoaderAnimation: React.FC<LoaderAnimationProps> = ({ isLoading, onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!isLoading && isVisible) {
      setIsExiting(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onAnimationComplete?.()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, isVisible, onAnimationComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`relative w-64 h-64 ${
          isExiting ? 'animate-heartbeat-glow-exit' : 'animate-heartbeat-glow'
        }`}
      >
        <Image
          src="/images/Cs logo White Updated.png"
          alt="Loading"
          fill
          className="object-contain"
        />
      </div>

      <style jsx>{`
        @keyframes heartbeat-glow {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.8))
                    drop-shadow(0 0 35px rgba(59, 130, 246, 0.6));
          }
        }

        @keyframes heartbeat-glow-exit {
          0% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.8)); }
          100% { transform: scale(0.75); opacity: 0; filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
        }

        .animate-heartbeat-glow {
          animation: heartbeat-glow 1.5s ease-in-out infinite;
        }

        .animate-heartbeat-glow-exit {
          animation: heartbeat-glow-exit 0.5s forwards;
        }
      `}</style>
    </div>
  )
}

export default LoaderAnimation
