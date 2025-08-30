import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface LoaderAnimationProps {
  isLoading: boolean;
  onAnimationComplete?: () => void;
}

const LoaderAnimation: React.FC<LoaderAnimationProps> = ({ isLoading, onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading && isVisible) {
      // Start exit animation
      setIsExiting(true);
      
      // Hide loader after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete?.();
      }, 500); // Match this with CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [isLoading, isVisible, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <Image 
          src="/images/IEEE-UoR-Logo.png"
          alt="Loading"
          width={80}
          height={80}
          className={`object-contain transition-transform duration-500 ${
            isExiting ? 'animate-heartbeat-glow scale-75 opacity-0' : 'animate-heartbeat-glow'
          }`}
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
            filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 35px rgba(59, 130, 246, 0.6));
          }
        }
        
        .animate-heartbeat-glow {
          animation: heartbeat-glow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default LoaderAnimation