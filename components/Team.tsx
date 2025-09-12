'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

type Member = {
  name: string
  role: string
  photo: string
}

interface TeamProps {
  onLoad?: () => void
}

export default function Team({ onLoad }: TeamProps) {
  const [teamMembers, setTeamMembers] = useState<Member[]>([])
  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch team data
  useEffect(() => {
    fetch('/api/OurTeam')
      .then((res) => res.json())
      .then((data) => setTeamMembers(data.teamMembers || []))
      .catch((err) => console.error('Failed to fetch team:', err))
      .finally(() => onLoad?.())
  }, [onLoad]) // ✅ include onLoad in deps

  // Intersection Observer to pause animation off-screen
  useEffect(() => {
    const currentSection = sectionRef.current
    if (!currentSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start({
            x: ['0%', '-50%'],
            transition: { duration: 60, repeat: Infinity, ease: 'linear' },
          })
        } else {
          controls.stop()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(currentSection)

    return () => {
      observer.unobserve(currentSection) // use cached ref
    }
  }, [controls])

  return (
    <section
      ref={sectionRef}
      id="team"
      className="max-w-7xl mx-auto px-6 sm:px-10 py-20 text-white"
    >
      <h2 className="text-4xl font-extrabold mb-12 text-center">Executive Committee</h2>

      <div className="overflow-hidden">
        <motion.div className="flex gap-12 w-max" animate={controls}>
          {[...teamMembers, ...teamMembers].map(({ name, role, photo }, index) => (
            <div key={`${name}-${index}`} className="flex flex-col items-center space-y-3">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg shadow-orange-600/50">
                <Image
                  src={photo}
                  alt={name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold whitespace-nowrap">{name}</h3>
              <p className="text-orange-300 whitespace-nowrap">{role}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
