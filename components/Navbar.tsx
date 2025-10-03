'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Menu, X } from 'lucide-react'
import ContactModal from '@/components/ContactModal'

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)

  // Subchapter mapping with slugs matching rewrites
  const subChapters = [
    { name: 'Main', slug: 'https://ieee-main-new-uat.vercel.app' },
    { name: 'RAS', slug: 'https://ieee-main-new-uat-git-ras-manujaya-pereras-projects.vercel.app' },
    { name: 'CS', slug: 'https://ieee-main-new-uat-git-cs-manujaya-pereras-projects.vercel.app' },
    { name: 'PES', slug: 'https://ieee-main-new-uat-git-pes-manujaya-pereras-projects.vercel.app' },
    { name: 'IAS', slug: 'https://ieee-main-new-uat-git-ias-manujaya-pereras-projects.vercel.app' },
    { name: 'WIE', slug: 'https://ieee-main-new-uat-git-wie-manujaya-pereras-projects.vercel.app' }
  ]  

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-10 h-16">
        {/* Logo */}
        <Link href="/" className="block w-32 sm:w-36 h-10 sm:h-12 relative">
          <Image
            src="/images/White comsoc.png"
            alt="IEEE UoR Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-white font-medium text-lg items-center">
          <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
          <li><a href="#about" className="hover:text-blue-500 transition">About</a></li>
          <li><a href="/news" className="hover:text-blue-500 transition">News</a></li>

          {/* Sub Chapters Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="hover:text-blue-500 transition flex items-center gap-1">
              Chapters ▾
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full mt-2 bg-white text-black rounded shadow-lg py-2 w-48 z-50">
                {subChapters.map((chapter) => (
                  <li key={chapter.slug}>
                    <Link href={chapter.slug} className="block px-4 py-2 hover:bg-blue-100">
                      {chapter.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Contact */}
          <li>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="hover:text-blue-500 transition flex items-center gap-1 text-white"
            >
              Contact
              <Mail className="w-5 h-5 animate-wiggle text-blue-400" />
            </button>
            <ContactModal isOpen={open} onClose={() => setOpen(false)} />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md">
          <ul className="flex flex-col space-y-4 px-6 py-4 text-white font-medium text-lg">
            <li>
              <Link href="/" className="hover:text-blue-500 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-500 transition" onClick={() => setMobileMenuOpen(false)}>About</a>
            </li>
            <li>
              <a href="/news" className="hover:text-blue-500 transition" onClick={() => setMobileMenuOpen(false)}>News</a>
            </li>

            {/* Sub Chapters */}
            <li>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer hover:text-blue-500 transition">
                  Sub Chapters ▾
                </summary>
                <ul className="mt-2 pl-4 flex flex-col space-y-2 text-black bg-white rounded p-2">
                  {subChapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        href={chapter.slug}
                        className="hover:bg-blue-100 px-2 py-1 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {chapter.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>

            {/* Contact */}
            <li>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="hover:text-blue-500 transition flex items-center gap-1"
              >
                Contact
                <Mail className="w-5 h-5 animate-wiggle text-blue-400" />
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Wiggle animation */}
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
