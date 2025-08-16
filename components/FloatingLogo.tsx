'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FloatingLogo() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <div className="fixed top-1/2 -translate-y-1/2 z-0 pointer-events-none">
      {/* Mobile view */}
      <div className="relative w-[12rem] h-[25rem] sm:w-[18rem] sm:h-[35rem] md:w-[24rem] md:h-[50rem] -ml-[2.4rem] sm:-ml-[3.6rem] md:-ml-[4.8rem] opacity-40 sm:opacity-50 md:hidden">
        <Image
          src="/images/IEEE-UoR-Logohalf.png"
          alt="IEEE UoR Logo"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Tablet / Desktop view */}
      <div className="hidden md:block relative w-[24rem] h-[50rem] -ml-[4.8rem]">
        <Image
          src="/images/IEEE-UoR-Logohalf.png"
          alt="IEEE UoR Logo"
          fill
          priority
          className="object-contain drop-shadow-[0_0_20px_#0af] opacity-60"
        />
      </div>
    </div>
  );
}
