import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar">
        <NavLink className="logo" to="/" onClick={closeMenu}>
          TripPlanner
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/destinations" onClick={closeMenu}>
            Destinations
          </NavLink>
          <NavLink to="/plan-trip" onClick={closeMenu}>
            Plan Trip
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
