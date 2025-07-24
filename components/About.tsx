'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import AwardBadge from './AwardBadge'

function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    step()
  }, [target, duration])

  return <span>{count}</span>
}

const logos = [
  '/images/subchapter1.png',
  '/images/subchapter2.png',
  '/images/subchapter3.png',
  '/images/subchapter4.png',
  '/images/subchapter5.png',
]

export default function About() {
  return (
    <section
      id="about"
      className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-20 text-white rounded-3xl bg-neutral-900/60 backdrop-blur-md overflow-hidden"
    >
      {/* Heading & Paragraphs */}
      <div className="md:w-4/5 text-left space-y-6 pl-8">
        <h2 className="text-4xl font-extrabold">Our Presence</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          The IEEE Student Branch of the University of Ruhuna has established a strong presence both locally and internationally through its active participation in various technical, professional, and humanitarian initiatives. Our members have consistently represented the university at IEEE regional events, competitions, and conferences, showcasing innovation and excellence. We are proud to be recognized for our collaborative projects, impactful outreach programs, and commitment to advancing technology for the benefit of humanity.
        </p>
        <p className="text-gray-400 text-base">
          Join us to be part of a global network that supports your career growth and technical development.
        </p>
      </div>

      {/* Centered Counters */}
      <div className="flex justify-center gap-16 mt-12 mb-8">
        {[
          { label: 'Projects', value: 150 },
          { label: 'Members', value: 600 },
          { label: 'Subchapters', value: 7 },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center relative">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full before:absolute before:inset-0 before:rounded-full before:bg-blue-500/30 before:blur-xl before:animate-pulse">
              <span className="text-4xl font-extrabold text-blue-400 z-10">
                <Counter target={value} />
              </span>
            </div>
            <p className="mt-2 uppercase text-sm tracking-wider text-gray-300">{label}</p>
          </div>
        ))}
      </div>

      {/* Scrolling Subchapter Logos */}
<div className="overflow-hidden whitespace-nowrap mt-6 px-8 bg-amber-50 rounded-lg">
  <div className="animate-marquee inline-flex gap-10 items-center">
    {[...logos, ...logos].map((logo, index) => (
      <div key={index} className="relative h-16 flex-shrink-0">
      <Image
        src={logo}
        alt={`Subchapter logo ${index + 1}`}
        width={256}        // intrinsic width of your logo image
        height={128}       // intrinsic height of your logo image
        style={{ height: '64px', width: 'auto' }}  // scale down to 64px height, auto width to keep ratio
        className="object-contain opacity-80 hover:opacity-100 transition duration-300"
        draggable={false}
      />
    </div>
    
    ))}
  </div>
</div>

      {/* Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
