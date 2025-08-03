'use client'

import Link from 'next/link'
import Image from 'next/image'

const events = [
  {
    title: "Tech Symposium 2025",
    date: "March 15, 2025",
    description:
      "A conference featuring keynote speakers, workshops, and innovation challenges.",
    image: "/images/events.jpg",
  },
  {
    title: "Hackathon",
    date: "July 10-12, 2025",
    description:
      "A 48-hour coding marathon to solve real-world problems with teams.",
    image: "/images/events.jpg",
  },
  {
    title: "Networking Night",
    date: "October 5, 2025",
    description:
      "Meet industry leaders and fellow students in an informal networking event.",
    image: "/images/events.jpg",
  },
]

export default function Events() {
  return (
    <section
      id="events"
      className="max-w-7xl mx-auto px-6 sm:px-10 py-20 text-white"
    >
      <Link href="/news">
        <h2 className="text-4xl font-extrabold mb-12 text-center hover:underline cursor-pointer">
          News & Events
        </h2>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {events.map(({ title, date, description, image }) => (
          <div
            key={title}
            className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-600 transition-shadow"
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
    </section>
  )
}
