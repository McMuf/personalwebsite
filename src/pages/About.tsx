import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

const SKILL_GROUPS = [
  { suit: '♠', label: 'Languages',  color: '#c9a84c', skills: ['Python','Java','TypeScript','JavaScript','HTML/CSS'] },
  { suit: '♥', label: 'Finance',    color: '#c41e3a', skills: ['Excel (DCF/Comps)','Financial Modeling','Equity Research','PowerPoint'] },
  { suit: '♦', label: 'Frameworks', color: '#c41e3a', skills: ['React','Node.js','Pandas','NumPy','yFinance'] },
  { suit: '♣', label: 'Tools',      color: '#c9a84c', skills: ['Git','GitHub','VS Code','Vercel'] },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.reveal')
    if (items?.length) {
      animate(items, {
        translateY: [30, 0], opacity: [0, 1],
        delay: stagger(120, { start: 100 }),
        duration: 700, easing: 'easeOutExpo',
      })
    }
  }, [])

  return (
    <div style={{ minHeight:'100vh', paddingTop:'62px', background:'#08080f' }} className="diamond-bg">
      <div
        ref={containerRef}
        style={{ maxWidth:'960px', margin:'0 auto', padding:'56px 28px 80px', display:'flex', flexDirection:'column', gap:'44px' }}
      >
        {/* Header */}
        <div className="reveal" style={{ opacity:0 }}>
          <p className="font-mono-tech" style={{ color:'rgba(201,168,76,0.5)', fontSize:'11px', letterSpacing:'3px', marginBottom:'10px' }}>
            ♠ &nbsp; 01. ABOUT ME
          </p>
          <h1 className="font-cinzel" style={{ fontSize:'clamp(28px,4.5vw,56px)', color:'#f0ece4', lineHeight:1.3, fontWeight:600 }}>
            Hey, I'm Daniel.
          </h1>
        </div>

        {/* Main card */}
        <div
          className="reveal card-frame"
          style={{
            opacity:0,
            display:'grid', gridTemplateColumns:'1fr 1.6fr', gap:'40px',
            borderRadius:'12px', padding:'40px', alignItems:'center',
          }}
        >
          {/* Photo */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
            <div
              className="animate-float"
              style={{
                width:'200px', height:'250px', borderRadius:'8px', overflow:'hidden',
                border:'1px solid rgba(201,168,76,0.25)',
                background:'#0e0e1c', display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative',
              }}
            >
              <img src="/images/profile.png" alt="Daniel Lei"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />

              {/* Card corner accents */}
              {[['top:0,left:0','borderTop:1px solid #c9a84c,borderLeft:1px solid #c9a84c,borderRadius:0 0 4px 0'],
                ['bottom:0,right:0','borderBottom:1px solid #c9a84c,borderRight:1px solid #c9a84c,borderRadius:4px 0 0 0']
              ].map((_, idx) => (
                <div key={idx} style={{
                  position:'absolute',
                  ...(idx===0 ? {top:0,left:0} : {bottom:0,right:0}),
                  width:'16px', height:'16px',
                  ...(idx===0
                    ? {borderTop:'1.5px solid #c9a84c',borderLeft:'1.5px solid #c9a84c',borderRadius:'0 0 3px 0'}
                    : {borderBottom:'1.5px solid #c9a84c',borderRight:'1.5px solid #c9a84c',borderRadius:'3px 0 0 0'}
                  ),
                }}/>
              ))}
            </div>

          </div>

          {/* Bio */}
          <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>
            <p style={{ color:'#b8b4ac', fontSize:'15px', lineHeight:1.85, fontWeight:300 }}>
              Hey there! My name is Daniel Lei and I am a first year student at the
              University of Waterloo studying CFM (CS + Finance). I like stock trading,
              magic, going to the gym, comics, and custom mechanical keyboards!
            </p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {['Stock Trading','Magic','Gym','Comics','Mechanical Keyboards','CS + Finance'].map(tag => (
                <span key={tag} className="font-mono-tech" style={{
                  padding:'4px 11px',
                  background:'#13131f', border:'1px solid #2a2a3a',
                  borderRadius:'3px', color:'#555', fontSize:'11px',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ borderTop:'1px solid #1a1a2a', paddingTop:'18px', display:'flex', flexDirection:'column', gap:'9px' }}>
              {[
                ['University','University of Waterloo'],
                ['Program','CS & Finance (CFM)'],
                ['Year','Class of 2031'],
                ['Location','Vancouver, BC | Waterloo, ON'],
              ].map(([label, value]) => (
                <div key={label} style={{ display:'flex', gap:'14px', alignItems:'baseline' }}>
                  <span className="font-mono-tech" style={{ color:'#c9a84c', fontSize:'10px', letterSpacing:'1px', minWidth:'84px' }}>
                    {label}
                  </span>
                  <span style={{ color:'#7a7a8a', fontSize:'13px' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills — suit-coded */}
        <div className="reveal" style={{ opacity:0 }}>
          <p className="font-mono-tech" style={{ color:'rgba(201,168,76,0.5)', fontSize:'11px', letterSpacing:'3px', marginBottom:'18px' }}>
            ♦ &nbsp; TECHNICAL SKILLS
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:'14px' }}>
            {SKILL_GROUPS.map(g => (
              <div key={g.label} style={{
                background:'#0e0e1c', border:'1px solid #1e1e2e', borderRadius:'8px', padding:'18px',
              }}>
                <p className="font-mono-tech" style={{ fontSize:'11px', letterSpacing:'1.5px', marginBottom:'12px', display:'flex', alignItems:'center', gap:'6px' }}>
                  <span style={{ color: g.color }}>{g.suit}</span>
                  <span style={{ color:'#555' }}>{g.label.toUpperCase()}</span>
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                  {g.skills.map(s => (
                    <span key={s} style={{
                      padding:'3px 9px', background:'#13131f', borderRadius:'3px',
                      color:'#7a7a8a', fontSize:'11px',
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
