'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
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
        <ul className="hidden md:flex space-x-8 text-white font-medium text-lg">
          <li>
            <Link href="/" className="hover:text-blue-500 transition">Home</Link>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-500 transition">About</a>
          </li>
          <li>
            <a href="#events" className="hover:text-blue-500 transition">Events</a>
          </li>
          <li>
            <a href="#team" className="hover:text-blue-500 transition">Team</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
          </li>
          <li>
            <Link href="/news" className="hover:text-blue-500 transition">News</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
