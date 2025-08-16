'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [heroTitle, setHeroTitle] = useState('Empowering Engineering Excellence')
  const [heroParagraph, setHeroParagraph] = useState(
    "Welcome to the IEEE Student Branch of the University of Ruhuna! We are a vibrant community of passionate students dedicated to innovation, technology, and professional growth. As part of the world's largest technical professional organization, our branch provides a dynamic platform for students to engage in hands-on projects, technical workshops, leadership development, and global networking opportunities. We strive to empower future engineers and technologists by fostering a culture of creativity, collaboration, and continuous learning. Whether you're looking to expand your knowledge, connect with industry leaders, or make an impact through technology, you'll find your place here with us."
  )

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch('/api/HomePageContent')
        const data = await res.json()
        if (data.Hero_Title) setHeroTitle(data.Hero_Title)
        if (data.Hero_Paragraph) setHeroParagraph(data.Hero_Paragraph)
      } catch (error) {
        console.error('Failed to load hero content:', error)
      }
    }

    fetchHeroContent()
  }, [])

  return (
    <section
      id="welcome"
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-10 pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 flex flex-col md:flex-row items-center justify-between text-white"
    >
      {/* Intro Content */}
      <div className="md:w-4/5 text-center md:text-left space-y-6 md:pl-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight md:leading-tight">
          {heroTitle}
        </h1>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          {heroParagraph}
        </p>
        <a
          href="#about"
          className="inline-block bg-blue-600 hover:bg-blue-500 transition px-5 sm:px-6 py-2.5 sm:py-3 text-white font-semibold rounded-lg"
        >
          Learn More
        </a>
      </div>
    </section>
  )
}
