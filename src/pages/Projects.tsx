import { useState, useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

/*
  ============================================================
  HOW TO ADD / UPDATE PROJECTS:
  1. Add screenshot to: public/images/projects/your-image.png
  2. Add a new object to the PROJECTS array below (copy an existing one).
  3. Fill in title, description, tags, image, link, linkLabel, github, rank, suit, suitColor.
  4. Save and redeploy.

  TO ADD SCREENSHOTS for current projects:
  - Soundr:      public/images/projects/soundr.png
  - Conceptus:   public/images/projects/conceptus.png
  - SpotifyDJam: public/images/projects/spotifydjam.png
  ============================================================
*/
const PROJECTS = [
  {
    title: 'Soundr',
    description: 'Web app paired with a physical sanitation kit for earbuds, incentivizing daily cleaning through a streak system. Generated $220 CAD in revenue within two weeks of launch.',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    image: '/images/projects/soundr.png',
    link: 'https://soundrfinal.vercel.app/',
    linkLabel: 'Live Demo',
    // TO ADD PRESENTATION: drop the PDF at public/soundr-presentation.pdf then change presentationLink below to '/soundr-presentation.pdf'
    presentationLink: 'soundr-presentation.pdf',
    github: 'https://github.com/McMuf/soundrfinal',
    rank: 'A', suit: '♠', suitColor: '#c9a84c',
  },
  {
    title: 'Conceptus Foundation',
    description: 'Website for a registered STEM-education nonprofit — 3K+ monthly views at peak, $1,700 CAD raised, 90K+ impressions online. Coordinated tutoring programs for Grades 4–7.',
    tags: ['Nonprofit', 'Web', 'Education'],
    image: '/images/projects/conceptus.png',
    link: 'https://conceptusfoundation.org/',
    linkLabel: 'Visit Site',
    presentationLink: '',
    github: '',
    rank: 'K', suit: '♥', suitColor: '#c41e3a',
  },
  {
    title: 'SpotifyDJam',
    description: 'Minecraft Fabric mod — control Spotify from in-game jukeboxes. Features beat-synced particles, collaborative jam sessions, directional audio fade, and full playback keybinds. 50+ active users.',
    tags: ['Java', 'Node.js', 'Spotify API', 'Fabric'],
    
    image: '/images/projects/spotifydjam.png',
    link: 'https://github.com/McMuf/SpotifyDJam',
    linkLabel: 'View on GitHub',
    presentationLink: '',
    github: 'https://github.com/McMuf/SpotifyDJam',
    rank: 'Q', suit: '♦', suitColor: '#c41e3a',
  },
  {
    title: 'Coming Soon',
    description: 'Next project in progress. Check back soon.',
    tags: [],
    image: '',
    link: 'https://github.com/McMuf',
    linkLabel: 'View GitHub',
    presentationLink: '',
    github: 'https://github.com/McMuf',
    rank: 'J', suit: '♣', suitColor: '#c9a84c',
  },
]

export default function Projects() {
  const [current,   setCurrent]   = useState(0)
  const [animating, setAnimating] = useState(false)
  const headerRef   = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [headerRef.current, carouselRef.current].filter(Boolean)
    if (els.length) {
      animate(els as HTMLElement[], {
        translateY:[30,0], opacity:[0,1],
        delay: stagger(150, { start:100 }),
        duration:700, easing:'easeOutExpo',
      })
    }
  }, [])

  const goTo = (idx: number, dir: 'left'|'right') => {
    if (animating) return
    setAnimating(true)
    setCurrent(idx)
    animate(carouselRef.current!, {
      translateX: dir==='right' ? [-30,0] : [30,0],
      opacity:[0,1],
      duration:350, easing:'easeOutExpo',
      onComplete: () => setAnimating(false),
    })
  }

  const prev = () => goTo((current - 1 + PROJECTS.length) % PROJECTS.length, 'left')
  const next = () => goTo((current + 1) % PROJECTS.length, 'right')

  const p = PROJECTS[current]

  return (
    <div style={{ minHeight:'100vh', paddingTop:'62px', background:'#08080f' }} className="diamond-bg">
      <div style={{ maxWidth:'1000px', margin:'0 auto', padding:'56px 28px 80px', display:'flex', flexDirection:'column', gap:'36px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity:0 }}>
          <p className="font-mono-tech" style={{ color:'rgba(201,168,76,0.5)', fontSize:'11px', letterSpacing:'3px', marginBottom:'10px' }}>
            ♣ &nbsp; 04. MY PROJECTS
          </p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <h1 className="font-cinzel" style={{ fontSize:'clamp(28px,4vw,52px)', color:'#f0ece4', fontWeight:600 }}>
              Things I've Built
            </h1>
            <span className="font-mono-tech" style={{ color:'#3a3a4a', fontSize:'13px' }}>
              {current + 1} / {PROJECTS.length}
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} style={{ opacity:0, display:'flex', flexDirection:'column', gap:'22px' }}>

          {/* Main card */}
          <div
            className="card-frame responsive-grid-projects"
            style={{
              display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:'0',
              borderRadius:'12px', overflow:'hidden', minHeight:'360px',
              position:'relative',
            }}
          >
            {/* Card rank pip — top-left corner */}
            <div style={{
              position:'absolute', top:'14px', left:'14px', zIndex:3,
              display:'flex', flexDirection:'column', alignItems:'center', lineHeight:1.1,
              fontFamily:'Share Tech Mono,monospace', fontWeight:700,
            }}>
              <span style={{ color: p.suitColor, fontSize:'16px' }}>{p.rank}</span>
              <span style={{ color: p.suitColor, fontSize:'14px' }}>{p.suit}</span>
            </div>

            {/* Thumbnail */}
            <a
              href={p.link} target="_blank" rel="noopener noreferrer"
              style={{ display:'block', position:'relative', overflow:'hidden', background:'#0a0a14' }}
              className="project-card"
            >
              {p.image ? (
                <img src={p.image} alt={p.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }} />
              ) : (
                <div style={{
                  width:'100%', height:'100%', minHeight:'280px',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'14px',
                  background:'linear-gradient(135deg,#0a0a14 0%,#0f0f1e 100%)',
                }}>
                  <span style={{ fontSize:'48px', color:'rgba(201,168,76,0.15)', fontFamily:'serif' }}>{p.suit}</span>
                  <span className="font-mono-tech" style={{ color:'#2a2a3a', fontSize:'9px', letterSpacing:'2px' }}>ADD SCREENSHOT</span>
                </div>
              )}

              {/* Hover overlay */}
              <div className="project-overlay" style={{
                position:'absolute', inset:0, background:'rgba(8,8,15,0.82)',
                display:'flex', alignItems:'center', justifyContent:'center',
                opacity:0, transition:'opacity 0.3s',
              }}>
                <div className="btn-gold font-mono-tech" style={{
                  padding:'9px 22px', borderRadius:'4px', fontSize:'12px', letterSpacing:'2px',
                }}>
                  {p.linkLabel} ↗
                </div>
              </div>
            </a>

            {/* Info panel */}
            <div style={{ padding:'32px 28px', display:'flex', flexDirection:'column', gap:'18px', justifyContent:'center', background:'#0e0e1c' }}>
              <div>
                <h2 className="font-cinzel" style={{ fontSize:'clamp(16px,2.5vw,26px)', color:'#f0ece4', marginBottom:'10px', lineHeight:1.3, fontWeight:600 }}>
                  {p.title}
                </h2>
                <p style={{ color:'#7a7a8a', fontSize:'13px', lineHeight:1.7 }}>{p.description}</p>
              </div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
                {p.tags.map(t => (
                  <span key={t} className="font-mono-tech" style={{
                    padding:'3px 10px',
                    background:'rgba(201,168,76,0.07)', border:'1px solid rgba(201,168,76,0.2)',
                    borderRadius:'3px', color:'#c9a84c', fontSize:'10px', letterSpacing:'0.5px',
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  className="btn-gold font-mono-tech"
                  style={{ padding:'9px 20px', borderRadius:'4px', textDecoration:'none', fontSize:'11px', letterSpacing:'1.5px', width:'fit-content' }}>
                  {p.linkLabel} ↗
                </a>
                {p.presentationLink && (
                  <a href={p.presentationLink} target="_blank" rel="noopener noreferrer"
                    className="btn-outline font-mono-tech"
                    style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'9px 16px', borderRadius:'4px', textDecoration:'none', fontSize:'11px', letterSpacing:'1.5px', width:'fit-content' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Pitch Deck
                  </a>
                )}
                {p.github && p.github !== p.link && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="btn-outline font-mono-tech"
                    style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'9px 16px', borderRadius:'4px', textDecoration:'none', fontSize:'11px', letterSpacing:'1.5px', width:'fit-content' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'22px' }}>
            <button onClick={prev}
              className="btn-outline"
              style={{ width:'44px', height:'44px', borderRadius:'8px', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              ←
            </button>
            <div style={{ display:'flex', gap:'8px' }}>
              {PROJECTS.map((_proj, i) => (
                <button key={i} onClick={() => goTo(i, i>current?'right':'left')}
                  style={{
                    width: i===current ? '22px' : '7px', height:'7px',
                    borderRadius:'4px', border:'none',
                    background: i===current ? '#c9a84c' : '#2a2a3a',
                    transition:'all 0.3s',
                    boxShadow: i===current ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: i===current ? '#08080f' : 'transparent',
                    fontSize:'8px', fontFamily:'serif',
                    overflow:'hidden',
                  }}>
                </button>
              ))}
            </div>
            <button onClick={next}
              className="btn-outline"
              style={{ width:'44px', height:'44px', borderRadius:'8px', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              →
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .project-card:hover .project-overlay { opacity: 1 !important; }
        .project-card:hover img { transform: scale(1.05); }
      `}</style>
    </div>
  )
}
