'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FloatingLogo() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <div className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none">
      <div className="w-[24rem] h-[50rem] relative -ml-[4.8rem]">
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
