'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Event = {
  title: string
  date: string
  description: string
  image: string
  url: string
}

interface EventsProps {
  onLoad?: () => void
}

export default function Events({ onLoad }: EventsProps) {
  const [events, setEvents] = useState<Event[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch events data
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/OurNews')
        const data = await res.json()
        setEvents(data.events)
        onLoad?.()
      } catch (error) {
        console.error('Failed to fetch events:', error)
        setEvents([])
        onLoad?.()
      }
    }
    fetchEvents()
  }, [onLoad]) // include onLoad

  // Pause marquee when not in view
  useEffect(() => {
    const currentSection = sectionRef.current
    if (!currentSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = entries[0].isIntersecting
            ? 'running'
            : 'paused'
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(currentSection)
    return () => {
      observer.unobserve(currentSection) // use cached ref
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="events"
      className="max-w-7xl mx-auto px-6 sm:px-10 py-20 text-white overflow-hidden"
    >
      <div className="flex justify-center">
        <Link
          href="/news"
          className="text-4xl font-extrabold mb-12 text-center text-white transition-all duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#3b82f6]"
        >
          News & Events
        </Link>
      </div>

      {/* Horizontal Scroll Marquee */}
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="marquee-track flex gap-6 w-max">
          {[...events, ...events].map(({ title, date, description, image, url }, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-600 transition-shadow w-80 flex-shrink-0"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 text-white">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                </a>
                <p className="text-sm text-blue-400 mb-3">{date}</p>
                <p className="text-sm text-gray-200">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .marquee-track {
            animation: scroll-left 100s linear infinite;
            animation-play-state: running;
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  )
}
