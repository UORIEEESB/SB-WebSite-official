'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react' 

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-10 h-16">
        {/* Logo */}
        <Link href="/" className="block w-36 h-12 relative">
          <Image
            src="/images/IEEE-UoR-Logo.png"
            alt="IEEE UoR Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-white font-medium text-lg relative">
          <li>
            <Link href="/" className="hover:text-blue-500 transition">Home</Link>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-500 transition">About</a>
          </li>
          <li>
            <a href="/news" className="hover:text-blue-500 transition">News</a>
          </li>

          {/* Sub Chapters Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="hover:text-blue-500 transition">Sub Chapters ▾</button>
            {isDropdownOpen && (
              <ul className="absolute top-full mt-2 bg-white text-black rounded shadow-lg py-2 w-48 z-50">
                <li><Link href="https://www.ieee-ruhuna-wie.com" className="block px-4 py-2 hover:bg-blue-100">WIE</Link></li>
                <li><Link href="https://www.ieee-ruhuna-ras.com" className="block px-4 py-2 hover:bg-blue-100">RAS</Link></li>
                <li><Link href="https://www.ieee-ruhuna-pes.com" className="block px-4 py-2 hover:bg-blue-100">PES</Link></li>
                <li><Link href="https://www.ieee-ruhuna-cs.com" className="block px-4 py-2 hover:bg-blue-100">CS</Link></li>
                <li><Link href="https://www.ieee-ruhuna-comsoc.com" className="block px-4 py-2 hover:bg-blue-100">ComSoc</Link></li>
              </ul>
            )}
          </li>

          {/* Contact with Wiggling Icon */}
          <li>
            <a href="#contact" className="hover:text-blue-500 transition flex items-center gap-1">
              Contact
              <Mail className="w-5 h-5 animate-wiggle text-blue-400" />
            </a>
          </li>
        </ul>
      </div>

      {/* Custom wiggle animation */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.6s infinite;
        }
      `}</style>
    </nav>
  )
}
