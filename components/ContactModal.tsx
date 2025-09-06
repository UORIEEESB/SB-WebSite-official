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

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) newErrors.name = 'Name is required.'
    if (!form.email.trim()) newErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email address.'
    if (!form.contact.trim()) newErrors.contact = 'Contact number is required.'
    if (!form.institute.trim()) newErrors.institute = 'Institute/Company is required.'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.'
    if (!form.message.trim()) newErrors.message = 'Message cannot be empty.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/Contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      const data = JSON.parse(text)
      if (!res.ok) throw new Error(data?.message || 'Submission failed')

      setSubmitted(true)
    } catch (err) {
      console.error('Fetch error:', err)
      alert('Something went wrong. Please try again later.')
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
    setErrors({})
    setSubmitted(false)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <Dialog.Panel className="relative bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        
        <Dialog.Title className="text-3xl font-semibold mb-6 py-4 text-center text-green-700">Send Us A Message</Dialog.Title>
        <div className="p-6 overflow-y-auto flex-1">
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 mb-6 font-medium">Thanks! Your message has been sent.</p>
            <button
              onClick={handleReset}
              className="inline-block px-6 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 text-gray-700 text-sm">
            {[
              { label: 'Name', name: 'name', type: 'text', helper: 'Enter your full name.' },
              { label: 'Email', name: 'email', type: 'email', helper: 'We will never share your email.' },
              { label: 'Contact No', name: 'contact', type: 'text', helper: 'Include country code if applicable.' },
              { label: 'Institute/Organization/Company', name: 'institute', type: 'text', helper: 'Your workplace or school.' },
              { label: 'Subject', name: 'subject', type: 'text', helper: 'Short summary of your message.' },
            ].map(({ label, name, type, helper }) => (
              <label key={name} className="flex flex-col">
                <span className="mb-1 font-medium">{label}</span>
                <input
                  name={name}
                  type={type}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition ${
                    errors[name] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'
                  }`}
                />
                <span className="text-xs mt-1 text-gray-400">{helper}</span>
                {errors[name] && <span className="text-xs mt-1 text-red-500">{errors[name]}</span>}
              </label>
            ))}

            <label className="flex flex-col">
              <span className="mb-1 font-medium">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={`border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 transition ${
                  errors.message ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'
                }`}
              />
              <span className="text-xs mt-1 text-gray-400">Write your message here.</span>
              {errors.message && <span className="text-xs mt-1 text-red-500">{errors.message}</span>}
            </label>

            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="mt-3 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        )}
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}
