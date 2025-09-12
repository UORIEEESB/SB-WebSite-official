'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCircuit from '@/components/AnimatedCircuit'
import LoaderAnimation from '@/components/LoaderAnimation'
import { SpeedInsights } from "@vercel/speed-insights/next"

const EVENTS_PER_PAGE = 6

type EventType = {
  title: string
  date: string
  description: string
  image: string
  url: string
  year?: number
}

export default function NewsPage() {
  const [allEvents, setAllEvents] = useState<EventType[]>([])
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/OurNews')
        const data = await res.json()
        const parsed = data.events.map((e: EventType) => ({
          ...e,
          year: new Date(e.date).getFullYear(),
        }))
        setAllEvents(parsed)
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        // Add a small delay to ensure smooth transition
        setTimeout(() => setLoading(false), 500)
      }
    }

    fetchEvents()
  }, [])

  const handleAnimationComplete = () => {
    setShowContent(true)
  }

  const filteredEvents = allEvents.filter((event) =>
    yearFilter === 'all' ? true : event.year === yearFilter
  )

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  )

  const availableYears = Array.from(new Set(allEvents.map((e) => e.year ?? 0)))
    .filter((year) => year !== 0)
    .sort((a, b) => (b ?? 0) - (a ?? 0))

  return (
    <main className="relative overflow-hidden min-h-screen bg-[radial-gradient(circle_at_25%_35%,#00629B_0%,#00507A_40%,#003B5D_70%,#001F33_100%)]">
      {/* Loading Animation */}
      <LoaderAnimation 
        isLoading={loading} 
        onAnimationComplete={handleAnimationComplete}
      />

      {/* Main Content - only show after loader completes */}
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <SpeedInsights />
        <AnimatedCircuit />
        <Navbar />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-30 text-white rounded-2xl backdrop-blur-md">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">All News & Events</h1>
          <p className="text-gray-300 mb-8 text-center">
            Browse through our full collection of events and updates.
          </p>

          {/* Year Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => { setYearFilter('all'); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-full border transition-colors ${
                yearFilter === 'all' ? 'bg-blue-700 text-white' : 'border-blue-600 text-blue-300 hover:bg-blue-700/20'
              }`}
            >
              All Years
            </button>
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => { setYearFilter(year); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  yearFilter === year ? 'bg-blue-700 text-white' : 'border-blue-600 text-blue-300 hover:bg-blue-700/20'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="flex flex-col gap-8 mb-12">
            {paginatedEvents.map((event, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row bg-neutral-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-blue-700/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="relative w-full md:w-1/3 h-60 md:h-auto">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-center w-full md:w-2/3">
                  <Link href={event.url}>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 hover:underline cursor-pointer hover:text-blue-300 transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-blue-400 mb-2">{event.date}</p>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full border text-sm transition-colors ${
                    currentPage === i + 1
                      ? 'bg-blue-700 text-white'
                      : 'border-blue-700 text-blue-300 hover:bg-blue-700/20'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </main>
  )
}