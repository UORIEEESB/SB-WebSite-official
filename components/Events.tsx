'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Event = {
  title: string
  date: string
  description: string
  image: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/OurNews')
        const data = await res.json()
        setEvents(data.events)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section
      id="events"
      className="max-w-7xl mx-auto px-6 sm:px-10 py-20 text-white overflow-hidden"
    >
      <Link href="/news">
        <h2 className="text-4xl font-extrabold mb-12 text-center hover:underline cursor-pointer">
          News & Events
        </h2>
      </Link>

      {/* Horizontal Scroll Marquee */}
      <div className="relative overflow-hidden">
        <div className="marquee-track flex gap-6 w-max">
          {[...events, ...events].map(({ title, date, description, image }, index) => (
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
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-blue-400 mb-3">{date}</p>
                <p className="text-sm text-gray-200">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .marquee-track {
            animation: scroll-left 60s linear infinite;
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
