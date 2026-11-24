import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.svg'
import './Header.css'

async function api(path, options) {
  const res = await fetch(`/api/auth${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Try again.')
  return data
}

const LINKS = ['Courses', 'Grades', 'Timetable', 'Support']

export default function Header({ user, onUserChange }) {
  const dialogRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Restore the session if a valid cookie exists.
  useEffect(() => {
    api('/me').then((d) => onUserChange(d.user)).catch(() => {})
  }, [onUserChange])

  function openDialog(nextMode) {
    setMode(nextMode)
    setError('')
    setMenuOpen(false)
    dialogRef.current?.showModal()
  }

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const form = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const data = await api(`/${mode}`, { method: 'POST', body: JSON.stringify(form) })
      onUserChange(data.user)
      dialogRef.current?.close()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    await api('/logout', { method: 'POST' }).catch(() => {})
    onUserChange(null)
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <a className="skip" href="#main">Skip to content</a>
      <a className="brand" href="/">
        <img src={logo} alt="" width="32" height="32" />
        <span>Student Portal</span>
      </a>

      <button
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>

      <nav id="site-nav" className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
        <ul>
          {LINKS.map((l) => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <div className="account">
          {user ? (
            <>
              <span className="who">{user.name}</span>
              <button className="btn ghost" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <>
              <button className="btn ghost" onClick={() => openDialog('login')}>Sign in</button>
              <button className="btn solid" onClick={() => openDialog('register')}>Create account</button>
            </>
          )}
        </div>
      </nav>

      <dialog ref={dialogRef} className="dialog" aria-labelledby="dlg-title">
        <form onSubmit={submit} className="dialog-form">
          <h2 id="dlg-title">{mode === 'login' ? 'Sign in' : 'Create your account'}</h2>

          {mode === 'register' && (
            <>
              <label>Full name<input name="name" required autoComplete="name" /></label>
              <label>Student ID (optional)<input name="studentId" /></label>
            </>
          )}
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              minLength={mode === 'register' ? 8 : undefined}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="error" role="alert">{error}</p>}

          <div className="dialog-actions">
            <button type="button" className="btn ghost" onClick={() => dialogRef.current?.close()}>Cancel</button>
            <button type="submit" className="btn solid" disabled={busy}>
              {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </div>

          <button
            type="button"
            className="switch"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
          >
            {mode === 'login' ? 'New here? Create an account' : 'Already registered? Sign in'}
          </button>
        </form>
      </dialog>
    </header>
  )
}
