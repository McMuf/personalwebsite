import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'About Me',       path: '/about'      },
  { label: 'Resume',         path: '/resume'     },
  { label: 'My Experiences', path: '/experience' },
  { label: 'My Projects',    path: '/projects'   },
  { label: 'Contact Me!',    path: '/contact'    },
]

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav
      className="navbar-glass"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '62px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.6)' : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Logo — card corner style */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none', border: 'none', padding: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          lineHeight: 1,
        }}
      >
        <span className="font-mono-tech" style={{ color: '#c9a84c', fontSize: '15px', letterSpacing: '1px' }}>
          ♠
        </span>
        <span className="font-mono-tech" style={{ color: '#c9a84c', fontSize: '9px', letterSpacing: '1px', marginTop: '2px' }}>
          DL
        </span>
      </button>

      {/* Desktop nav */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {NAV_ITEMS.map(item => {
          const active = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="font-mono-tech"
              style={{
                background: active ? 'rgba(201,168,76,0.1)' : 'none',
                border: active ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
                borderRadius: '4px',
                color: active ? '#c9a84c' : '#7a7a8a',
                fontSize: '12px',
                padding: '6px 13px',
                letterSpacing: '0.4px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget).style.color = '#f0ece4'
                  ;(e.currentTarget).style.borderColor = 'rgba(255,255,255,0.08)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  ;(e.currentTarget).style.color = '#7a7a8a'
                  ;(e.currentTarget).style.borderColor = 'transparent'
                }
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Suit row right side */}
      <div style={{ display: 'flex', gap: '6px', fontSize: '12px', opacity: 0.25 }}>
        {['♠','♥','♦','♣'].map(s => (
          <span key={s} style={{ color: s==='♥'||s==='♦' ? '#c41e3a' : '#f0ece4' }}>{s}</span>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(m => !m)}
        className="mobile-hamburger"
        style={{ display: 'none', background: 'none', border: 'none', color: '#f0ece4', fontSize: '20px' }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '62px', left: 0, right: 0,
          background: 'rgba(8,8,15,0.97)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
          padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {NAV_ITEMS.map(item => (
            <button key={item.path} onClick={() => navigate(item.path)}
              className="font-mono-tech"
              style={{
                background: 'none', border: 'none',
                color: location.pathname === item.path ? '#c9a84c' : '#7a7a8a',
                fontSize: '13px', padding: '10px 0', textAlign: 'left', letterSpacing: '0.4px',
              }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .mobile-hamburger { display: block !important; }
          nav > div:nth-child(2) { display: none !important; }
          nav > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
