'use client'

import { useState, useEffect, useCallback } from 'react'
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
  const { setAppLoading } = useLoading() // Remove isAppLoading since it's not used
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

  // Memoize onLoad callbacks to prevent unnecessary re-renders
  const handlePromotionLoad = useCallback(() => {
    setComponentsLoaded(prev => ({ ...prev, promotion: true }))
  }, [])

  const handleAwardLoad = useCallback(() => {
    setComponentsLoaded(prev => ({ ...prev, award: true }))
  }, [])

  const handleHeroLoad = useCallback(() => {
    setComponentsLoaded(prev => ({ ...prev, hero: true }))
  }, [])

  const handleEventsLoad = useCallback(() => {
    setComponentsLoaded(prev => ({ ...prev, events: true }))
  }, [])

  const handleTimelineLoad = useCallback(() => {
    setComponentsLoaded(prev => ({ ...prev, timeline: true }))
  }, [])

  const handleTeamLoad = useCallback(() => {
    setComponentsLoaded(prev => ({ ...prev, team: true }))
  }, [])

  // When all components are loaded, start exit animation
  useEffect(() => {
    if (Object.values(componentsLoaded).every(Boolean)) {
      setLoading(false)
    }
  }, [componentsLoaded])

  // Show content after loader animation completes
  const handleAnimationComplete = useCallback(() => {
    setShowContent(true)
    // Notify the app that loading is complete
    setAppLoading(false)
  }, [setAppLoading])

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
        <PromotionBanner onLoad={handlePromotionLoad} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AwardBadge onLoad={handleAwardLoad} />
          <Hero onLoad={handleHeroLoad} />
          <About />
          <Events onLoad={handleEventsLoad}/>
          <SBTimeline onLoad={handleTimelineLoad} />
          <Team onLoad={handleTeamLoad}/>
        </div>

        <div className="relative z-41">
          <Footer />
        </div>
      </div>
    </main>
  )
}