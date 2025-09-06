'use client'

import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const sections = [
    { id: 'welcome' },
    { id: 'presence' },
    { id: 'projects' },
    { id: 'team' },
    { id: 'contact' },
  ]

export default function CircleCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationImages, setAnimationImages] = useState<string[]>([])

  useEffect(() => {
    async function fetchAnimationImages() {
      try {
        const res = await fetch('/api/HomePageContent')
        const data = await res.json()
        const content = data.homepageData

        const fallback = '/images/welcome.jpg'
        const images: string[] = [
          content.Animation_img_1,
          content.Animation_img_2,
          content.Animation_img_3,
          content.Animation_img_4,
          content.Animation_img_5,
        ].map((img) => img || fallback)

        setAnimationImages(images)
      } catch (err) {
        console.error('Error fetching animation images:', err)
        setAnimationImages([
          '/images/welcome.jpg',
          '/images/presence.jpg',
          '/images/projects.jpg',
          '/images/team.jpg',
          '/images/default.jpg',
        ])
      }
    }

    fetchAnimationImages()
  }, [])

  const scrollToSection = (id: string, index: number) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center">
      <div className="relative w-56 h-56 rounded-full border-8 border-green-800 shadow-lg overflow-hidden bg-white">
        {/* Preview Image */}
        {animationImages.length > 0 && (
          <Image
            src={animationImages[activeIndex]}
            alt="preview"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}

        {/* Outer Dots */}
        {sections.map((section, i) => {
          const angle = (360 / sections.length) * i;
          const radius = 120; // distance from center

          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.button
              key={i}
              className={`absolute w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'bg-white border-2 border-green-600 scale-125'
                  : 'bg-green-400'
              }`}
              style={{
                top: `calc(50% + ${y}px - 0.5rem)`,
                left: `calc(50% + ${x}px - 0.5rem)`,
                position: 'absolute',
              } as React.CSSProperties}
              onClick={() => scrollToSection(section.id, i)}
              whileHover={{ scale: 1.2 }}
            />
          );
        })}
      </div>
    </div>
  );
}
