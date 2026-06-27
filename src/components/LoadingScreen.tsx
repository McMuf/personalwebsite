import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'

export type AnimType = 0 | 1 | 2 | 3

interface Props { animType: AnimType }

// ══ 0: Royal Flush Fan ══════════════════════════════════════════
const RF_CARDS = [
  { value:'10', suit:'♥', color:'#c41e3a' },
  { value:'J',  suit:'♥', color:'#c41e3a' },
  { value:'Q',  suit:'♥', color:'#c41e3a' },
  { value:'K',  suit:'♥', color:'#c41e3a' },
  { value:'A',  suit:'♥', color:'#c41e3a' },
]
const RF_FAN = [
  { angle:-28, ty:0   },
  { angle:-14, ty:-14 },
  { angle:  0, ty:-20 },
  { angle: 14, ty:-14 },
  { angle: 28, ty:0   },
]

function RoyalFlushAnim() {
  const [phase, setPhase] = useState<'stack'|'fan'|'flip'>('stack')
  const [msgIdx, setMsgIdx] = useState(0)
  const MSGS = ['SHUFFLING DECK...', 'DEALING CARDS...', 'READING THE HAND...', 'ROYAL FLUSH ♥']

  useEffect(() => {
    const ts = [
      setTimeout(() => { setPhase('fan');  setMsgIdx(1) }, 100),
      setTimeout(() => { setPhase('flip'); setMsgIdx(2) }, 580),
      setTimeout(() => setMsgIdx(3), 1700),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div style={{ position:'relative', width:'280px', height:'170px' }}>
        {RF_CARDS.map((card, i) => {
          const f = RF_FAN[i]
          const flipped = phase === 'flip'
          return (
            <div key={i} style={{
              position:'absolute', left:'50%', bottom:'0',
              marginLeft:'-39px',
              width:'78px', height:'112px',
              transformOrigin:'bottom center',
              transform: phase === 'stack'
                ? 'rotateZ(0deg) translateY(0px)'
                : `rotateZ(${f.angle}deg) translateY(${f.ty}px)`,
              transition: phase === 'stack' ? 'none' : `transform 0.45s cubic-bezier(0.34,1.3,0.64,1) ${i*50}ms`,
              zIndex: i,
            }}>
              <div style={{
                width:'100%', height:'100%',
                transformStyle:'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: flipped ? `transform 0.42s cubic-bezier(0.68,-0.3,0.27,1.35) ${i*110}ms` : 'none',
                position:'relative',
              }}>
                <div className="playing-card playing-card-back" style={{
                  position:'absolute', inset:0, backfaceVisibility:'hidden',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <span style={{ fontSize:'20px', opacity:0.4 }}>♦</span>
                </div>
                <div className="playing-card playing-card-face" style={{
                  position:'absolute', inset:0, backfaceVisibility:'hidden',
                  transform:'rotateY(180deg)',
                  display:'flex', flexDirection:'column', padding:'5px 7px', justifyContent:'space-between',
                }}>
                  <div style={{ color:card.color, lineHeight:1.1 }}>
                    <div style={{ fontSize:'11px', fontWeight:700, fontFamily:'Share Tech Mono,monospace' }}>{card.value}</div>
                    <div style={{ fontSize:'13px' }}>{card.suit}</div>
                  </div>
                  <div style={{ textAlign:'center', color:card.color, fontSize:'28px', lineHeight:1 }}>{card.suit}</div>
                  <div style={{ color:card.color, lineHeight:1.1, alignSelf:'flex-end', transform:'rotate(180deg)' }}>
                    <div style={{ fontSize:'11px', fontWeight:700, fontFamily:'Share Tech Mono,monospace' }}>{card.value}</div>
                    <div style={{ fontSize:'13px' }}>{card.suit}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="font-mono-tech" style={{ color:'#c9a84c', fontSize:'9px', letterSpacing:'3px', minHeight:'18px' }}>
        {MSGS[msgIdx]}
      </p>
    </>
  )
}

// ══ 1: Card Rain ════════════════════════════════════════════════
const RAIN_CARDS = [
  { x:-130, rot:-22, delay: 60, suit:'♠', color:'#c9a84c' },
  { x: -70, rot: 14, delay:170, suit:'♥', color:'#c41e3a' },
  { x: -10, rot: -9, delay:250, suit:'♦', color:'#c41e3a' },
  { x:  55, rot: 20, delay:340, suit:'♣', color:'#c9a84c' },
  { x:-100, rot:-28, delay:430, suit:'♠', color:'#c9a84c' },
  { x:  25, rot: 11, delay:510, suit:'♥', color:'#c41e3a' },
  { x: -40, rot:-16, delay:600, suit:'♦', color:'#c41e3a' },
  { x: 100, rot: 25, delay:680, suit:'♣', color:'#c9a84c' },
]

function CardRainAnim() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [showAce, setShowAce] = useState(false)
  const MSGS = ['RIFFLING THE DECK...', 'CARDS IN THE AIR...', 'DEALING YOU IN.']

  useEffect(() => {
    const ts = [
      setTimeout(() => setMsgIdx(1), 400),
      setTimeout(() => { setMsgIdx(2); setShowAce(true) }, 1150),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <>
      {/* Falling cards — absolutely positioned within the fixed LoadingScreen */}
      {RAIN_CARDS.map((c, i) => (
        <div key={i} style={{
          '--rot': `${c.rot}deg`,
          position:'absolute',
          left:`calc(50% + ${c.x}px)`,
          top:'0',
          width:'38px', height:'54px',
          animation:`cardRainFall 0.88s cubic-bezier(0.4,0,0.7,1) ${c.delay}ms both`,
          zIndex:1,
        } as CSSProperties}>
          <div className="playing-card playing-card-back" style={{
            width:'100%', height:'100%', borderRadius:'5px',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <span style={{ color:c.color, fontSize:'13px', fontFamily:'Georgia,serif', opacity:0.6 }}>{c.suit}</span>
          </div>
        </div>
      ))}

      {/* Ace of Spades materialises in centre */}
      <div style={{
        width:'104px', height:'146px',
        background:'#f8f4ea', borderRadius:'11px',
        border: showAce ? '2px solid rgba(201,168,76,0.85)' : '1px solid rgba(201,168,76,0.08)',
        boxShadow: showAce ? '0 0 28px rgba(201,168,76,0.45), 0 0 60px rgba(201,168,76,0.15)' : 'none',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        position:'relative', transition:'all 0.5s ease',
        opacity: showAce ? 1 : 0,
        transform: showAce ? 'scale(1)' : 'scale(0.72)',
        zIndex:2,
      }}>
        <div style={{ position:'absolute', top:'8px', left:'9px', lineHeight:1.1 }}>
          <div style={{ fontSize:'11px', fontWeight:700, fontFamily:'Share Tech Mono,monospace', color:'#c9a84c' }}>A</div>
          <div style={{ fontSize:'12px', color:'#1a1a2a' }}>♠</div>
        </div>
        <span style={{ color:'#1a1a2a', fontSize:'48px', fontFamily:'Georgia,serif', lineHeight:1 }}>♠</span>
        <div style={{ position:'absolute', bottom:'8px', right:'9px', lineHeight:1.1, transform:'rotate(180deg)' }}>
          <div style={{ fontSize:'11px', fontWeight:700, fontFamily:'Share Tech Mono,monospace', color:'#c9a84c' }}>A</div>
          <div style={{ fontSize:'12px', color:'#1a1a2a' }}>♠</div>
        </div>
      </div>

      <p className="font-mono-tech" style={{
        color:'#c9a84c', fontSize:'9px', letterSpacing:'3px', minHeight:'18px',
        position:'relative', zIndex:2,
      }}>
        {MSGS[msgIdx]}
      </p>

      <style>{`
        @keyframes cardRainFall {
          0%   { opacity:0; transform: translateY(-100px) rotateZ(var(--rot)); }
          12%  { opacity:1; }
          78%  { opacity:0.65; }
          100% { opacity:0; transform: translateY(105vh) rotateZ(calc(var(--rot) + 38deg)); }
        }
      `}</style>
    </>
  )
}

// ══ 2: Coin Flip — Ace of Spades ════════════════════════════════
function CoinFlipAnim() {
  const [spinning, setSpinning] = useState(false)
  const [done, setDone]         = useState(false)
  const [msgIdx, setMsgIdx]     = useState(0)
  const MSGS = ['PLACE YOUR BET.', 'FLIPPING...', "THE CARDS DON'T LIE."]

  useEffect(() => {
    const ts = [
      setTimeout(() => { setSpinning(true); setMsgIdx(1) }, 300),
      setTimeout(() => { setDone(true); setMsgIdx(2) }, 2050),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div style={{ perspective:'900px' }}>
        <div style={{
          width:'110px', height:'154px',
          transformStyle:'preserve-3d',
          position:'relative',
          animation: spinning ? 'coinFlipSpin 1.75s cubic-bezier(0.4,0,0.12,1) both' : 'none',
        }}>
          {/* Front — Ace of Spades */}
          <div style={{
            position:'absolute', inset:0, borderRadius:'11px',
            background:'#f8f4ea',
            border: done ? '2px solid #c9a84c' : '1px solid rgba(201,168,76,0.3)',
            boxShadow: done ? '0 0 28px rgba(201,168,76,0.6), 0 0 55px rgba(201,168,76,0.22)' : 'none',
            backfaceVisibility:'hidden',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            transition:'border-color 0.3s, box-shadow 0.4s',
          }}>
            <div style={{ position:'absolute', top:'8px', left:'9px', lineHeight:1.1 }}>
              <div style={{ fontSize:'11px', fontWeight:700, fontFamily:'Share Tech Mono,monospace', color:'#c9a84c' }}>A</div>
              <div style={{ fontSize:'12px', color:'#1a1a2a' }}>♠</div>
            </div>
            <span style={{ color:'#1a1a2a', fontSize:'52px', fontFamily:'Georgia,serif', lineHeight:1 }}>♠</span>
            <div style={{ position:'absolute', bottom:'8px', right:'9px', lineHeight:1.1, transform:'rotate(180deg)' }}>
              <div style={{ fontSize:'11px', fontWeight:700, fontFamily:'Share Tech Mono,monospace', color:'#c9a84c' }}>A</div>
              <div style={{ fontSize:'12px', color:'#1a1a2a' }}>♠</div>
            </div>
          </div>
          {/* Back */}
          <div className="playing-card-back" style={{
            position:'absolute', inset:0, borderRadius:'11px',
            border:'1px solid rgba(201,168,76,0.25)',
            transform:'rotateY(180deg)',
            backfaceVisibility:'hidden',
          }}/>
        </div>
      </div>

      <p className="font-mono-tech" style={{ color:'#c9a84c', fontSize:'9px', letterSpacing:'3px', minHeight:'18px' }}>
        {MSGS[msgIdx]}
      </p>

      <style>{`
        @keyframes coinFlipSpin {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(1440deg); }
        }
      `}</style>
    </>
  )
}

// ══ 3: Suit Convergence ══════════════════════════════════════════
const SUIT_NODES = [
  { sym:'♠', color:'#c9a84c', sx:'-145px', sy:'-95px', ex:'-205px', ey:'-135px' },
  { sym:'♥', color:'#c41e3a', sx: '145px', sy:'-95px', ex: '205px', ey:'-135px' },
  { sym:'♦', color:'#c41e3a', sx: '145px', sy: '95px', ex: '205px', ey: '135px' },
  { sym:'♣', color:'#c9a84c', sx:'-145px', sy: '95px', ex:'-205px', ey: '135px' },
]

function SuitConvergeAnim() {
  const [phase, setPhase]   = useState<'spread'|'converge'|'explode'>('spread')
  const [flash, setFlash]   = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const MSGS = ['THE SUITS ALIGN...', 'CHANNELING...', 'ALL IN. ♠♥♦♣']

  useEffect(() => {
    const ts = [
      setTimeout(() => { setPhase('converge'); setMsgIdx(1) }, 150),
      setTimeout(() => setFlash(true), 1360),
      setTimeout(() => { setPhase('explode'); setMsgIdx(2) }, 1600),
    ]
    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div style={{ position:'relative', width:'340px', height:'240px' }}>
        {SUIT_NODES.map((s, i) => (
          <div key={i} style={{
            position:'absolute', left:'50%', top:'50%',
            fontSize: phase === 'converge' ? '54px' : '36px',
            color: s.color,
            fontFamily:'Georgia,serif',
            transform: (() => {
              if (phase === 'spread')
                return `translate(calc(-50% + ${s.sx}), calc(-50% + ${s.sy}))`
              if (phase === 'converge')
                return 'translate(-50%, -50%)'
              return `translate(calc(-50% + ${s.ex}), calc(-50% + ${s.ey}))`
            })(),
            opacity: phase === 'explode' ? 0 : 1,
            transition: phase === 'spread' ? 'none'
              : phase === 'converge'
              ? `all 0.72s cubic-bezier(0.34,1.35,0.64,1) ${i*75}ms`
              : 'all 0.38s ease',
            textShadow: phase === 'converge'
              ? `0 0 26px ${s.color}cc, 0 0 52px ${s.color}44`
              : 'none',
            zIndex:2,
          }}>
            {s.sym}
          </div>
        ))}

        {/* Shockwave ring when suits converge */}
        {flash && (
          <div style={{
            position:'absolute', left:'50%', top:'50%',
            transform:'translate(-50%,-50%)',
            width:'1px', height:'1px',
            animation:'suitBurst 0.58s ease both',
            zIndex:1,
          }}/>
        )}
      </div>

      <p className="font-mono-tech" style={{ color:'#c9a84c', fontSize:'9px', letterSpacing:'3px', minHeight:'18px' }}>
        {MSGS[msgIdx]}
      </p>

      <style>{`
        @keyframes suitBurst {
          0%   { box-shadow: 0 0 0 0   rgba(201,168,76,0.9); }
          40%  { box-shadow: 0 0 0 72px rgba(201,168,76,0.22); }
          100% { box-shadow: 0 0 0 155px rgba(201,168,76,0); }
        }
      `}</style>
    </>
  )
}

// ══ Root ═════════════════════════════════════════════════════════
export default function LoadingScreen({ animType }: Props) {
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9999,
      background:'#08080f',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      gap:'36px',
    }} className="diamond-bg">
      {animType === 0 && <RoyalFlushAnim />}
      {animType === 1 && <CardRainAnim />}
      {animType === 2 && <CoinFlipAnim />}
      {animType === 3 && <SuitConvergeAnim />}

      <p className="font-mono-tech" style={{ color:'#2a2a3a', fontSize:'10px', letterSpacing:'4px' }}>
        DANIEL LEI // PORTFOLIO
      </p>
    </div>
  )
}
