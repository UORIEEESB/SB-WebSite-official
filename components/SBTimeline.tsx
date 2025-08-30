'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface SBTimelineProps {
  onLoad?: () => void;
}

export default function SBTimeline( { onLoad }: SBTimelineProps) {
  const [timelineItems, setTimelineItems] = useState<
    { image: string; title: string; description: string; date: string }[]
  >([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<null | {
    image: string;
    title: string;
    description: string;
    date: string;
  }>(null);
  const [animationDuration, setAnimationDuration] = useState('80s');
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch data
  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await fetch('/api/OurJourney');
        const data = await res.json();
        setTimelineItems(data.timelineItems);
        onLoad?.();
      } catch (error) {
        console.error('Failed to fetch timeline data:', error);
        setTimelineItems([]);
        onLoad?.();
      }
    }
    fetchTimeline();
  }, []);

  // Adjust scroll speed based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAnimationDuration('160s'); // Slower for mobile
      } else {
        setAnimationDuration('80s'); // Normal for desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pause marquee when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = entries[0].isIntersecting
            ? 'running'
            : 'paused';
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Functions to pause/resume with delay
  const pauseMarquee = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  const resumeMarquee = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
    }, 2000); // resume after 2s
  };

  return (
    <section
      ref={sectionRef}
      id="sb-timeline"
      className="relative py-24 bg-[#001F33]/60 rounded-3xl backdrop-blur-md overflow-hidden mx-4 md:mx-12"
    >
      {/* Heading */}
      <h2 className="text-center text-white text-4xl font-bold mb-4">
        Our Journey
      </h2>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
        Highlights of our milestones and achievements over the years.
      </p>

      {/* Glowing beam */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] z-0" />

      {/* Timeline container */}
      <div
        className="relative z-10 overflow-x-auto scrollbar-hide"
        onMouseDown={pauseMarquee}
        onMouseUp={resumeMarquee}
        onTouchStart={pauseMarquee}
        onTouchEnd={resumeMarquee}
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
      >
        <div
          ref={trackRef}
          className="marquee-track flex gap-8 w-max snap-x snap-mandatory"
          style={{
            animationDuration: animationDuration,
          }}
        >
          {[...timelineItems, ...timelineItems].map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedItem(item)}
              className="relative w-60 h-80 flex-shrink-0 snap-center cursor-pointer rounded-xl overflow-hidden shadow-xl border border-blue-500 bg-black bg-opacity-60 flex flex-col hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="p-3 flex flex-col justify-between space-y-1 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-lg font-bold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {item.description}
                </p>
                <span className="text-xs text-blue-400">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-[#0A1A2F]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-lg w-full transform transition-all duration-300 scale-100 hover:scale-[1.01] border border-blue-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{selectedItem.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{selectedItem.date}</p>
            <div className="text-gray-200 text-sm max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
              {selectedItem.description}
            </div>
            <div className="flex justify-center px-4 py-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(null);
                }}
                className="text-white hover:text-blue-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .marquee-track {
          animation: scroll-left linear infinite;
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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
