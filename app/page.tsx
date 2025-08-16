'use client'

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

export default function Home() {
  return (
    <main
      className="relative overflow-hidden min-h-screen"
      style={{
        background: `radial-gradient(circle at 25% 35%, #00629B 0%, #00497A 40%, #00325B 70%, #001F33 90%)`,
      }}
    >
      <SpeedInsights/>
      {/* Animated circuit background */}
      <AnimatedCircuit />
      {/* Floating IEEE logo on the left */}
      <FloatingLogo />
      {/* Floating carousel on the right */}
<div
  className="fixed top-1/2 -translate-y-1/2 z-40 right-5 md:right-20"
>
  <div className="w-[300px] h-[300px] md:w-[520px] md:h-[520px] overflow-hidden">
    <FloatingCarousel />
  </div>
</div>



      {/* Page content */}
      <div className="relative z-41 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar /></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16" />
        <AwardBadge />
        <Hero />
        <About />
        <Events />
        <SBTimeline />
        <Team />
        
      </div>
      <div className="relative z-41">
      <Footer /></div>
    </main>
  )
}
