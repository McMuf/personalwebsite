import { useEffect, useRef, useState, useCallback } from 'react'
import { animate, stagger } from 'animejs'
import { useNavigate } from 'react-router-dom'

// Tracks whether the card intro has already played this session
let introPlayed = false

// ── Card intro ────────────────────────────────────────────────────────
const INTRO_CARDS = [
  { letter:'D', suit:'♠', color:'#c9a84c' },
  { letter:'A', suit:'♥', color:'#c41e3a' },
  { letter:'N', suit:'♦', color:'#c41e3a' },
  { letter:'I', suit:'♣', color:'#c9a84c' },
  { letter:'E', suit:'♥', color:'#c41e3a' },
  { letter:'L', suit:'♠', color:'#c9a84c' },
]

function CardIntro({ onComplete }: { onComplete: () => void }) {
  const [flipped, setFlipped] = useState<boolean[]>(Array(6).fill(false))
  const [fading,  setFading]  = useState(false)
  const cbRef = useRef(onComplete)
  useEffect(() => { cbRef.current = onComplete }, [onComplete])

  useEffect(() => {
    const ts: ReturnType<typeof setTimeout>[] = []

    // Flip each card with a stagger
    INTRO_CARDS.forEach((_, i) => {
      ts.push(setTimeout(() => {
        setFlipped(f => { const n = [...f]; n[i] = true; return n })
      }, 480 + i * 175))
    })

    // last flip starts at 480 + 5*175 = 1355ms; flip duration 680ms → done ~2035ms
    // hold 650ms → fade starts at 2685ms
    ts.push(setTimeout(() => setFading(true), 2685))
    // fade 750ms → call onComplete at 3435ms
    ts.push(setTimeout(() => cbRef.current(), 3435))

    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:300,
      display:'flex',
      opacity: fading ? 0 : 1,
      transition: fading ? 'opacity 0.75s ease' : 'none',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      {INTRO_CARDS.map((card, i) => (
        <div
          key={i}
          style={{
            flex:1,
            perspective:'1100px',
            borderRight: i < 5 ? '1px solid rgba(201,168,76,0.2)' : 'none',
          }}
        >
          {/* Card inner — spins on Y axis */}
          <div style={{
            width:'100%', height:'100%',
            position:'relative',
            transformStyle:'preserve-3d',
            transform: flipped[i] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
            transition:'transform 0.68s cubic-bezier(0.4,0,0.2,1)',
          }}>

            {/* ── Back face ── */}
            <div style={{
              position:'absolute', inset:0,
              backfaceVisibility:'hidden',
              WebkitBackfaceVisibility:'hidden',
              backgroundColor:'#12123a',
              backgroundImage:`
                repeating-linear-gradient(45deg,  rgba(201,168,76,0.1) 0, rgba(201,168,76,0.1) 1px, transparent 0, transparent 50%),
                repeating-linear-gradient(-45deg, rgba(201,168,76,0.1) 0, rgba(201,168,76,0.1) 1px, transparent 0, transparent 50%)
              `,
              backgroundSize:'18px 18px',
            }}>
              {/* Subtle border inset */}
              <div style={{
                position:'absolute', inset:'12px',
                border:'1px solid rgba(201,168,76,0.18)',
              }}/>
              {/* Centre diamond ornament */}
              <div style={{
                position:'absolute', left:'50%', top:'50%',
                transform:'translate(-50%,-50%) rotate(45deg)',
                width:'clamp(24px,3.5vw,52px)', height:'clamp(24px,3.5vw,52px)',
                border:'1px solid rgba(201,168,76,0.35)',
              }}/>
            </div>

            {/* ── Front face ── */}
            <div style={{
              position:'absolute', inset:0,
              background:'#f8f4ea',
              backfaceVisibility:'hidden',
              WebkitBackfaceVisibility:'hidden',
              transform:'rotateY(180deg)',
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
            }}>
              {/* Top-left pip */}
              <div style={{
                position:'absolute',
                top:'clamp(10px,1.8vh,22px)',
                left:'clamp(12px,1.2vw,20px)',
                display:'flex', flexDirection:'column', alignItems:'center', lineHeight:1.1,
              }}>
                <span style={{ color:card.color, fontSize:'clamp(11px,1.4vw,20px)', fontWeight:700, fontFamily:'Georgia,serif' }}>
                  {card.letter}
                </span>
                <span style={{ color:card.color, fontSize:'clamp(9px,1.2vw,17px)', fontFamily:'Georgia,serif' }}>
                  {card.suit}
                </span>
              </div>

              {/* Centre letter */}
              <span style={{
                color: card.color,
                fontSize:'clamp(64px,10vw,190px)',
                fontWeight:700,
                fontFamily:'Georgia,serif',
                lineHeight:1,
                userSelect:'none',
              }}>
                {card.letter}
              </span>

              {/* Centre suit */}
              <span style={{
                color: card.color,
                fontSize:'clamp(30px,5vw,100px)',
                fontFamily:'Georgia,serif',
                lineHeight:1.15,
                marginTop:'clamp(6px,1vh,14px)',
                userSelect:'none',
              }}>
                {card.suit}
              </span>

              {/* Bottom-right pip (rotated 180°) */}
              <div style={{
                position:'absolute',
                bottom:'clamp(10px,1.8vh,22px)',
                right:'clamp(12px,1.2vw,20px)',
                display:'flex', flexDirection:'column', alignItems:'center', lineHeight:1.1,
                transform:'rotate(180deg)',
              }}>
                <span style={{ color:card.color, fontSize:'clamp(11px,1.4vw,20px)', fontWeight:700, fontFamily:'Georgia,serif' }}>
                  {card.letter}
                </span>
                <span style={{ color:card.color, fontSize:'clamp(9px,1.2vw,17px)', fontFamily:'Georgia,serif' }}>
                  {card.suit}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Floating suit symbol canvas ───────────────────────────────────────
function useSuitCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const SUITS = ['♠','♥','♦','♣']
    const RED   = 'rgba(196,30,58,'
    const GOLD  = 'rgba(201,168,76,'

    const symbols = Array.from({ length: 38 }, () => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      suit:  SUITS[Math.floor(Math.random() * 4)],
      size:  Math.random() * 18 + 8,
      alpha: Math.random() * 0.12 + 0.03,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    (Math.random() - 0.5) * 0.25,
      rot:   Math.random() * Math.PI * 2,
      rotV:  (Math.random() - 0.5) * 0.008,
    }))

    let id: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      symbols.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.rot += s.rotV
        if (s.x < -30)  s.x = canvas.width  + 20
        if (s.x > canvas.width  + 30) s.x = -20
        if (s.y < -30)  s.y = canvas.height + 20
        if (s.y > canvas.height + 30) s.y = -20

        const isRed = s.suit === '♥' || s.suit === '♦'
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rot)
        ctx.font       = `${s.size}px serif`
        ctx.fillStyle  = isRed ? `${RED}${s.alpha})` : `${GOLD}${s.alpha})`
        ctx.textAlign  = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(s.suit, 0, 0)
        ctx.restore()
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
}

// ── Landing page content ──────────────────────────────────────────────
function HomeContent() {
  const titleRef    = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const infoRef     = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const navigate    = useNavigate()

  useSuitCanvas(canvasRef)

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current.querySelectorAll('.letter'), {
        translateY: [40, 0], opacity: [0, 1],
        delay: stagger(70, { start: 200 }),
        duration: 700, easing: 'easeOutExpo',
      })
    }
    animate(subtitleRef.current!, { translateY:[20,0], opacity:[0,1], delay:900,  duration:600, easing:'easeOutExpo' })
    animate(infoRef.current!,     { translateY:[20,0], opacity:[0,1], delay:1100, duration:600, easing:'easeOutExpo' })
    animate(ctaRef.current!,      { translateY:[20,0], opacity:[0,1], delay:1300, duration:600, easing:'easeOutExpo' })
  }, [])

  const NAME = 'DANIEL LEI'

  return (
    <div
      style={{
        position:'fixed', inset:0,
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        background:'#08080f', overflow:'hidden',
      }}
      className="diamond-bg"
    >
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:0 }} />

      <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 24px' }}>
        {/* Suit row */}
        <div style={{ display:'flex', justifyContent:'center', gap:'18px', marginBottom:'20px', fontSize:'13px', opacity:0.35 }}>
          <span style={{ color:'#f0ece4' }}>♠</span>
          <span style={{ color:'#c41e3a' }}>♥</span>
          <span style={{ color:'#c41e3a' }}>♦</span>
          <span style={{ color:'#f0ece4' }}>♣</span>
        </div>

        {/* Name */}
        <div
          ref={titleRef}
          className="font-cinzel"
          style={{
            fontSize:'clamp(30px,6vw,80px)',
            letterSpacing:'0.12em',
            marginBottom:'18px',
            display:'flex', justifyContent:'center', gap:'0.05em', flexWrap:'wrap',
            fontWeight:700,
          }}
        >
          {NAME.split('').map((ch, i) => (
            <span
              key={i}
              className="letter gold-shimmer"
              style={{ display:'inline-block', opacity:0, minWidth: ch === ' ' ? '0.4em' : undefined }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} style={{ opacity:0, marginBottom:'28px' }}>
          <p className="font-mono-tech" style={{ color:'#c9a84c', fontSize:'clamp(7px,1.4vw,12px)', letterSpacing:'0.2em' }}>
            SOFTWARE ENGINEER & FINANCE
          </p>
        </div>

        {/* Info */}
        <div
          ref={infoRef}
          className="font-mono-tech"
          style={{ opacity:0, color:'#555', fontSize:'clamp(10px,1.3vw,13px)', letterSpacing:'2px', marginBottom:'44px', display:'flex', flexDirection:'column', gap:'6px' }}
        >
          <span>VANCOUVER, BC // WATERLOO, ON</span>
          <span style={{ color:'#3a3a4a' }}>UNIVERSITY OF WATERLOO — CS + FINANCE (CFM)</span>
          <span style={{ color:'#2e2e3e' }}>CLASS OF '31</span>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} style={{ opacity:0, display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
          <button
            className="btn-gold font-mono-tech"
            style={{ padding:'13px 30px', borderRadius:'4px', fontSize:'12px', letterSpacing:'2px' }}
            onClick={() => navigate('/about')}
          >
            EXPLORE →
          </button>
          <button
            className="btn-outline font-mono-tech"
            style={{ padding:'13px 30px', borderRadius:'4px', fontSize:'12px', letterSpacing:'2px' }}
            onClick={() => navigate('/contact')}
          >
            CONTACT ME
          </button>
        </div>

        {/* Blink cursor */}
        <div style={{ marginTop:'52px' }}>
          <span className="font-mono-tech animate-blink" style={{ color:'#2e2e3e', fontSize:'11px', letterSpacing:'3px' }}>_</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position:'absolute', bottom:'20px', left:'28px', right:'28px', zIndex:2, display:'flex', alignItems:'center', gap:'14px' }}>
        <div style={{ flex:1, height:'1px', background:'rgba(201,168,76,0.1)' }}/>
        <span className="font-mono-tech" style={{ color:'#2e2e3e', fontSize:'6px', letterSpacing:'3px' }}>♠ PORTFOLIO 2026 ♠</span>
        <div style={{ flex:1, height:'1px', background:'rgba(201,168,76,0.1)' }}/>
      </div>
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────────
export default function Home() {
  const [introDone, setIntroDone] = useState(introPlayed)

  const handleIntroComplete = useCallback(() => {
    introPlayed = true
    setIntroDone(true)
  }, [])

  return (
    <>
      {!introDone && <CardIntro onComplete={handleIntroComplete} />}
      {introDone  && <HomeContent />}
    </>
  )
}
