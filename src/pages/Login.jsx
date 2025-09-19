import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [role, setRole] = useState('Tourism')

  // Prefer serving the image from the app (public/assets). As requested, try desktop file first,
  // then fall back to bundled asset if the file:// path can't be loaded by the browser.
  // const logoDesktopPath = 'file:///C:/Users/mouni/Desktop/logo.jpg'
  // const fallbackLogo = '/assets/logo.jpg'
  // local desktop images (use file:// URL). If browser blocks file://, fallback to bundled assets.
  // const policeDesktopPath = 'file:///C:/Users/mouni/Downloads/Gemini_Generated_Image_iwwj6qiwwj6qiwwj.png'
  // const tourismDesktopPath = 'file:///C:/Users/mouni/Downloads/Gemini_Generated_Image_s41r1zs41r1zs41r.png'
  // const fallbackPolice = '/assets/police.png'
  // const fallbackTourism = '/assets/tourism.png'

  // served from public/
  const logoPath = '/logo.jpg'
  const policePath = '/police.png'
  const tourismPath = '/tourism.png'
  const fallbackLogo = '/assets/logo.jpg'
  const fallbackPolice = '/assets/police.png'
  const fallbackTourism = '/assets/tourism.png'

  function submit(e) {
    e.preventDefault()
    // include selected role for backend later
    login({ ...form, role })
  }

  return (
    <div className="min-h-screen bg-center bg-cover relative">
      {/* Background image + blur overlay */}
      <div className="fixed inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=9d8b7a4b2d5e2e5b6e9f0f3f2e8f6d3b"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      {/* Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <main
          className="w-[90%] sm:w-10/12 md:w-3/5 lg:w-1/3 p-6 md:p-10 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg"
          role="main"
          aria-labelledby="portal-title"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 flex-shrink-0 rounded-md bg-white/70 flex items-center justify-center overflow-hidden">
              <img
                src={logoPath}
                alt="TRAVO Bharath"
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = fallbackLogo
                }}
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 id="portal-title" className="text-slate-900 text-lg sm:text-2xl font-semibold">
                Tourist Safety Authority Portal
              </h1>
              <div className="mt-1 text-sm">
                <span className="text-orange-500 font-semibold">TRAVO</span>
                <span className="text-green-700 ml-2">Bharath</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="mt-6" onSubmit={submit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username or Email
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                  placeholder="Username/Email"
                  className="w-full px-4 py-3 rounded-md border border-white/60 bg-white/80 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md border border-white/60 bg-white/80 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 pr-12"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-slate-600 hover:bg-white/30"
                >
                  {showPwd ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.47 10.47A3.5 3.5 0 0113.53 13.53" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Role selection */}
              <div className="flex gap-4 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setRole('Police')}
                  aria-pressed={role === 'Police'}
                  className={`w-36 md:w-44 p-3 rounded-xl flex flex-col items-center gap-2 transition focus:outline-none ${
                    role === 'Police' ? 'ring-2 ring-blue-400 shadow-md bg-white/90' : 'bg-white/70 hover:bg-white/80'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                    <img
                      src={policePath}
                      alt="Police"
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = fallbackPolice
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Police Officer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('Tourism')}
                  aria-pressed={role === 'Tourism'}
                  className={`w-36 md:w-44 p-3 rounded-xl flex flex-col items-center gap-2 transition focus:outline-none ${
                    role === 'Tourism' ? 'ring-2 ring-blue-400 shadow-md bg-white/90' : 'bg-white/70 hover:bg-white/80'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50">
                    <img
                      src={tourismPath}
                      alt="Tourism"
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = fallbackTourism
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700">Tourism Officer</span>
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-300" />
                  <span>Remember Me</span>
                </label>

                <a href="#" className="text-sm text-blue-700 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
                >
                  Login Securely
                </button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <footer className="mt-6 text-center text-xs text-slate-700/80">
            <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-4">
              <a href="#" className="hover:underline">
                Security Disclaimer
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="#" className="hover:underline">
                Help Desk
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="#" className="hover:underline">
                Support
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
