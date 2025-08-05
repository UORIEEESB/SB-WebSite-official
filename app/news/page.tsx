'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedCircuit from '@/components/AnimatedCircuit'
import { SpeedInsights } from "@vercel/speed-insights/next"

const EVENTS_PER_PAGE = 6

type EventType = {
  title: string
  date: string
  description: string
  image: string
  year?: number
}

export default function NewsPage() {
  const [allEvents, setAllEvents] = useState<EventType[]>([])
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)

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
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = allEvents.filter((event) =>
    yearFilter === 'all' ? true : event.year === yearFilter
  )

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  )

  const availableYears = Array.from(new Set(allEvents.map((e) => e.year ?? 0)))
    .filter((year) => year !== 0) // remove any undefined-converted-to-0 values
    .sort((a, b) => (b ?? 0) - (a ?? 0)) // safe sort

  return (
    <main
  className="relative overflow-hidden min-h-screen bg-[radial-gradient(circle_at_25%_35%,#00629B_0%,#00497A_40%,#00325B_70%,#001F33_90%)]"
>
<SpeedInsights/>
      <AnimatedCircuit />
      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white rounded-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-2 text-center">All News & Events</h1>
        <p className="text-gray-300 mb-10 text-center">
          Browse through our full collection of events and updates.
        </p>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => {
              setYearFilter('all')
              setCurrentPage(1)
            }}
            className={`px-4 py-2 rounded-full border ${
              yearFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'border-blue-600 text-blue-300'
            }`}
          >
            All Years
          </button>
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => {
                if (year !== undefined) {
                  setYearFilter(year)
                  setCurrentPage(1)
                }
              }}
              className={`px-4 py-2 rounded-full border ${
                yearFilter === year
                  ? 'bg-blue-600 text-white'
                  : 'border-blue-600 text-blue-300'
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
              className="flex flex-col md:flex-row bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-600 transition-shadow"
            >
              <div className="relative w-full md:w-1/3 h-60 md:h-auto">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center w-full md:w-2/3">
                <Link href={`/news/${encodeURIComponent(event.title)}`}>
                  <h3 className="text-2xl font-semibold mb-2 hover:underline cursor-pointer">
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
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full border text-sm ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'border-blue-600 text-blue-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
