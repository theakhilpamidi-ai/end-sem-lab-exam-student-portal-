import './Footer.css'

const GROUPS = [
  { title: 'Academics', links: ['Courses', 'Grades', 'Timetable', 'Exam schedule'] },
  { title: 'Services', links: ['Library', 'Fees and payments', 'Scholarships', 'Career center'] },
  { title: 'Help', links: ['Contact support', 'IT help desk', 'Accessibility', 'Privacy'] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-about">
          <strong>Student Portal</strong>
          <p>One sign-in for your classes, results, and campus services.</p>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2>{g.title}</h2>
            <ul>
              {g.links.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="copy">© {new Date().getFullYear()} Student Portal. All rights reserved.</p>
    </footer>
  )
}
