'use client'

import { useState, useEffect } from 'react'
import { useLoading } from '@/contexts/LoadingContext'
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import About from "@/components/About"
import Events from "@/components/Events"
import Team from "@/components/Team"
import Footer from "@/components/Footer"
import FloatingCarousel from "@/components/FloatingCarousel"
import FloatingLogo from "@/components/FloatingLogo"
import AnimatedCircuit from "@/components/AnimatedCircuit"
import SBTimeline from "@/components/SBTimeline"
import AwardBadge from "@/components/AwardBadge"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PromotionBanner from "@/components/PromotionBanner"
import LoaderAnimation from "@/components/LoaderAnimation"

export default function Home() {
  const { isAppLoading, setAppLoading } = useLoading()
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [componentsLoaded, setComponentsLoaded] = useState({
    promotion: false,
    award: false,
    timeline: false,
    hero: false,
    events: false,
    team: false,
  })

  // When all components are loaded, start exit animation
  useEffect(() => {
    if (Object.values(componentsLoaded).every(Boolean)) {
      setLoading(false)
    }
  }, [componentsLoaded])

  // Show content after loader animation completes
  const handleAnimationComplete = () => {
    setShowContent(true)
    // Notify the app that loading is complete
    setAppLoading(false)
  }

  return (
    <main
      className="relative overflow-hidden min-h-screen"
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
      {/* Loader Animation */}
      <LoaderAnimation 
        isLoading={loading} 
        onAnimationComplete={handleAnimationComplete}
      />

      {/* Main Content - only show after loader completes */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <SpeedInsights />
        <AnimatedCircuit />
        <FloatingLogo />

        {/* Floating carousel */}
        <div className="fixed top-1/2 -translate-y-1/2 z-40 right-5 md:right-20">
          <div className="w-[300px] h-[300px] md:w-[520px] md:h-[520px] overflow-hidden">
            <FloatingCarousel />
          </div>
        </div>

        {/* Page content */}
        <div className="relative z-41 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>

        {/* Components that fetch data */}
        <PromotionBanner onLoad={() => setComponentsLoaded(prev => ({ ...prev, promotion: true }))} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AwardBadge onLoad={() => setComponentsLoaded(prev => ({ ...prev, award: true }))} />
          <Hero onLoad={() => setComponentsLoaded(prev => ({ ...prev, hero: true }))} />
          <About />
          <Events onLoad={() => setComponentsLoaded(prev => ({ ...prev, events: true }))}/>
          <SBTimeline onLoad={() => setComponentsLoaded(prev => ({ ...prev, timeline: true }))} />
          <Team onLoad={() => setComponentsLoaded(prev => ({ ...prev, team: true }))}/>
        </div>

        <div className="relative z-41">
          <Footer />
        </div>
      </div>
    </main>
  )
}