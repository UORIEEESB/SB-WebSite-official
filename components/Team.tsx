'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Member = {
  name: string
  role: string
  photo: string
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([])

  useEffect(() => {
    fetch('/api/OurTeam')
      .then((res) => res.json())
      .then((data) => setTeamMembers(data.teamMembers || []))
      .catch((err) => console.error('Failed to fetch team:', err))
  }, [])

  return (
    <section
      id="team"
      className="max-w-7xl mx-auto px-6 sm:px-10 py-20 text-white"
    >
      <h2 className="text-4xl font-extrabold mb-12 text-center">Meet the Team</h2>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...teamMembers, ...teamMembers].map(({ name, role, photo }, index) => (
            <div key={`${name}-${index}`} className="flex flex-col items-center space-y-3">
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg shadow-blue-600/50">
                <Image
                  src={photo}
                  alt={name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold whitespace-nowrap">{name}</h3>
              <p className="text-blue-400 whitespace-nowrap">{role}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
