import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

// HOW TO UPDATE YOUR RESUME:
// 1. Replace public/resume.pdf with your new file (keep same filename).
// 2. Push to GitHub — Vercel redeploys automatically. No code changes needed.
const RESUME_PATH = '/resume.pdf'

export default function Resume() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.reveal')
    if (items?.length) {
      animate(items, {
        translateY:[30,0], opacity:[0,1],
        delay: stagger(100, { start:100 }),
        duration:700, easing:'easeOutExpo',
      })
    }
  }, [])

  return (
    <div style={{ minHeight:'100vh', paddingTop:'62px', background:'#08080f' }} className="diamond-bg">
      <div
        ref={containerRef}
        style={{ maxWidth:'900px', margin:'0 auto', padding:'56px 28px 80px', display:'flex', flexDirection:'column', gap:'28px' }}
      >
        {/* Header */}
        <div className="reveal" style={{ opacity:0 }}>
          <p className="font-mono-tech" style={{ color:'rgba(201,168,76,0.5)', fontSize:'11px', letterSpacing:'3px', marginBottom:'10px' }}>
            ♦ &nbsp; 02. RESUME
          </p>
          <h1 className="font-cinzel" style={{ fontSize:'clamp(28px,4vw,52px)', color:'#f0ece4', lineHeight:1.3, fontWeight:600 }}>
            My Resume
          </h1>
        </div>

        {/* PDF viewer card */}
        <div className="reveal card-frame" style={{ opacity:0, borderRadius:'12px', overflow:'hidden' }}>
          {/* Toolbar */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'12px 18px', borderBottom:'1px solid rgba(201,168,76,0.1)',
            background:'#0a0a14',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#3a1a1a' }}/>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#2a2a14' }}/>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#1a3a1a' }}/>
              <span className="font-mono-tech" style={{ color:'#3a3a4a', fontSize:'11px', marginLeft:'10px', letterSpacing:'1px' }}>
                Daniel_Lei_Resume.pdf
              </span>
            </div>
            <a
              href={RESUME_PATH}
              download="Daniel_Lei_Resume.pdf"
              className="btn-gold font-mono-tech"
              style={{
                padding:'5px 14px', borderRadius:'4px', textDecoration:'none',
                fontSize:'10px', letterSpacing:'1px',
                display:'flex', alignItems:'center', gap:'5px',
              }}
            >
              ↓ DOWNLOAD
            </a>
          </div>

          {/* Embedded PDF */}
          <div style={{ width:'100%', height:'80vh' }}>
            <object data={RESUME_PATH} type="application/pdf" style={{ width:'100%', height:'100%' }}>
              <div style={{
                width:'100%', height:'400px',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', color:'#3a3a4a',
              }}>
                <span style={{ fontSize:'32px' }}>♠</span>
                <p className="font-mono-tech" style={{ fontSize:'11px', letterSpacing:'2px' }}>PDF PREVIEW NOT SUPPORTED</p>
                <a href={RESUME_PATH} download className="btn-gold font-mono-tech"
                  style={{ padding:'10px 22px', borderRadius:'4px', textDecoration:'none', fontSize:'11px', letterSpacing:'2px' }}>
                  DOWNLOAD PDF
                </a>
              </div>
            </object>
          </div>
        </div>

        <div className="reveal" style={{ opacity:0, textAlign:'center' }}>
          <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="font-mono-tech"
            style={{ color:'#c9a84c', fontSize:'11px', letterSpacing:'2px', textDecoration:'none',
              borderBottom:'1px solid rgba(201,168,76,0.3)', paddingBottom:'2px' }}>
            OPEN IN NEW TAB ↗
          </a>
        </div>
      </div>
    </div>
  )
}
