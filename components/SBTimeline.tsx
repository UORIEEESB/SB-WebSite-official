'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function SBTimeline() {
  const [timelineItems, setTimelineItems] = useState<
    { image: string; title: string; description: string; date: string }[]
  >([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await fetch('/api/OurJourney');
        const data = await res.json();
        setTimelineItems(data.timelineItems);
      } catch (error) {
        console.error('Failed to fetch timeline data:', error);
      }
    }
    fetchTimeline();
  }, []);

  // IntersectionObserver to pause marquee when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (trackRef.current) {
          if (entries[0].isIntersecting) {
            trackRef.current.style.animationPlayState = 'running';
          } else {
            trackRef.current.style.animationPlayState = 'paused';
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sb-timeline"
      className="relative py-24 bg-[#001F33]/60 rounded-3xl backdrop-blur-md overflow-hidden mx-4 md:mx-12"
    >
      {/* Heading */}
      <h2 className="text-center text-white text-4xl font-bold mb-4">Our Journey</h2>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
        Highlights of our milestones and achievements over the years.
      </p>

      {/* Glowing beam */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] z-0" />

      {/* Marquee container */}
      <div className="relative z-10 overflow-hidden">
        <div ref={trackRef} className="marquee-track flex gap-8 w-max">
          {[...timelineItems, ...timelineItems].map((item, i) => (
            <div
              key={i}
              className="relative w-60 h-80 rounded-xl overflow-hidden shadow-xl border border-blue-500 bg-black bg-opacity-60 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative flex-grow w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Box */}
              <div className="p-3 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-xl backdrop-blur-sm flex flex-col justify-between space-y-1">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                <span className="text-xs text-blue-400 mt-1">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for animation */}
      <style jsx>{`
        .marquee-track {
          animation: scroll-left 40s linear infinite;
          animation-play-state: running; /* default */
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
    </section>
  );
}
