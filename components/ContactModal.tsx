'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    institute: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/Contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      console.log('Response:', text)

      const data = JSON.parse(text)
      if (!res.ok) throw new Error(data?.message || 'Submission failed')

      setSubmitted(true)
    } catch (err) {
      console.error('Fetch error:', err)
      alert('Something went wrong. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      contact: '',
      institute: '',
      subject: '',
      message: '',
    })
    setSubmitted(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <Dialog.Panel className="relative bg-white p-5 rounded-2xl max-w-sm w-full shadow-lg ring-1 ring-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <Dialog.Title className="text-2xl font-semibold mb-5 text-center text-gray-800">Contact Us</Dialog.Title>

        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 mb-6 font-medium">Thanks! Your message has been sent.</p>
            <button
              onClick={handleReset}
              className="inline-block px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 text-gray-700 text-sm">
            {[
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Contact No', name: 'contact', type: 'text' },
              { label: 'Institute/Organization/Company', name: 'institute', type: 'text' },
              { label: 'Subject', name: 'subject', type: 'text' },
            ].map(({ label, name, type }) => (
              <label key={name} className="flex flex-col">
                <span className="mb-1 font-medium">{label}</span>
                <input
                  name={name}
                  type={type}
                  required
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </label>
            ))}

            <label className="flex flex-col">
              <span className="mb-1 font-medium">Message</span>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                rows={3}
                className="border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </label>

            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}
      </Dialog.Panel>
    </Dialog>
  )
}