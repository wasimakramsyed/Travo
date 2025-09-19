import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })

  function submit(e) {
    e.preventDefault()
    login(form)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="w-96 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Authority Login</h2>
        <label className="block text-sm">Username</label>
        <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full border p-2 rounded mb-3" />
        <label className="block text-sm">Password</label>
        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border p-2 rounded mb-4" />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        </div>
      </form>
    </div>
  )
}
