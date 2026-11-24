import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="page">
      <Header user={user} onUserChange={setUser} />
      <main className="main" id="main">
        {user ? (
          <>
            <h1>Welcome back, {user.name.split(' ')[0]}.</h1>
            <p className="lede">
              Your courses, grades, and timetable will appear here.
              {user.studentId && <> Student ID: <strong>{user.studentId}</strong>.</>}
            </p>
          </>
        ) : (
          <>
            <h1>Everything for your semester, in one place.</h1>
            <p className="lede">
              Check grades, see your timetable, and find deadlines. Sign in with your student account to begin.
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
