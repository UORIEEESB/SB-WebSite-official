'use client'

import { useEffect, useState } from 'react'
import { FaTwitter, FaLinkedin, FaFacebookF } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa6'

export default function Footer() {
  const [footerData, setFooterData] = useState({
    address: '',
    university: '',
    line1: '',
    line2: '',
    email: '',
    phone: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
  })

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const res = await fetch('/api/HomePageContent')
        const data = await res.json()
        const content = data.homepageData

        setFooterData({
          address: content.Address || '',
          university: content.University || '',
          line1: content.Address_Line_1 || '',
          line2: content.Address_Line_2 || '',
          email: content.Email || '',
          phone: content.Phone || '',
          facebook: content.Facebook || '',
          twitter: content.Twitter || '',
          linkedin: content.Linkedin || '',
          youtube: content.Youtube || '',
        })
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }

    fetchFooterData()
  }, [])

  return (
    <footer className="relative bg-white/10 backdrop-blur-md text-white w-full mt-20 overflow-hidden rounded-t-3xl border-t border-white/20 shadow-inner">
      {/* Wedge-shaped top edge */}
      <div className="absolute -top-8 left-0 w-full overflow-hidden leading-[0] rotate-180 z-10">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon fill="rgba(255, 255, 255, 0.1)" points="0,0 100,0 50,100" />
        </svg>
      </div>

      {/* Footer content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Address */}
        <div>
          <h4 className="text-2xl font-bold text-blue-400 mb-5">Address</h4>
          <p className="text-base leading-relaxed text-gray-200">
            {footerData.address && <>{footerData.address}<br /></>}
            {footerData.university && <>{footerData.university}<br /></>}
            {footerData.line1 && <>{footerData.line1}<br /></>}
            {footerData.line2 && <>{footerData.line2}</>}
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-2xl font-bold text-blue-400 mb-5">Menu</h4>
          <ul className="space-y-3 text-base text-gray-200">
            <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="#events" className="hover:text-blue-400 transition">Events</a></li>
            <li><a href="#team" className="hover:text-blue-400 transition">Team</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-2xl font-bold text-blue-400 mb-5">Contact</h4>
          {footerData.email && <p className="text-base text-gray-200">{footerData.email}</p>}
          {footerData.phone && <p className="text-base text-gray-200 mt-2">{footerData.phone}</p>}
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-2xl font-bold text-blue-400 mb-5">Follow Us</h4>
          <div className="flex space-x-5 text-2xl">
  {footerData.twitter && (
    <a
      href={footerData.twitter}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      title="Twitter"
      className="hover:text-blue-400 transition-transform transform hover:scale-110"
    >
      <FaTwitter />
    </a>
  )}
  {footerData.linkedin && (
    <a
      href={footerData.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      title="LinkedIn"
      className="hover:text-blue-400 transition-transform transform hover:scale-110"
    >
      <FaLinkedin />
    </a>
  )}
  {footerData.facebook && (
    <a
      href={footerData.facebook}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      title="Facebook"
      className="hover:text-blue-400 transition-transform transform hover:scale-110"
    >
      <FaFacebookF />
    </a>
  )}
  {footerData.youtube && (
    <a
      href={footerData.youtube}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      title="YouTube"
      className="hover:text-blue-400 transition-transform transform hover:scale-110"
    >
      <FaYoutube />
    </a>
  )}
</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-sm text-gray-300 py-6 border-t border-white/10 backdrop-blur-md">
        &copy; {new Date().getFullYear()} IEEE Student Branch. All rights reserved.
      </div>
    </footer>
  )
}
