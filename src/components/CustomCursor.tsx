import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const SPARK_ANGLES = [0, 60, 120, 180, 240, 300]
const SPARK_DIST   = 22

type SparkGroup = { id: number; x: number; y: number }

export default function CustomCursor() {
  const wandRef = useRef<HTMLDivElement>(null)
  const [isDown,  setIsDown]  = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [sparks,  setSparks]  = useState<SparkGroup[]>([])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (wandRef.current) {
        // Offset so the star tip (at SVG coords 7,7) lands on the mouse
        wandRef.current.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`
      }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setIsHover(!!el?.closest('a, button, input, textarea, select, [role="button"], label'))
    }

    const onDown = (e: MouseEvent) => {
      setIsDown(true)
      const id = Date.now()
      setSparks(s => [...s, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setSparks(s => s.filter(sp => sp.id !== id)), 500)
    }

    const onUp = () => setIsDown(false)

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [])

  const glowing = isDown || isHover
  const filterStr = isDown
    ? 'drop-shadow(0 0 7px rgba(201,168,76,1)) drop-shadow(0 0 14px rgba(201,168,76,0.6))'
    : isHover
    ? 'drop-shadow(0 0 4px rgba(201,168,76,0.75))'
    : 'none'

  return (
    <>
      {/* Wand */}
      <div
        ref={wandRef}
        style={{
          position:'fixed', top:0, left:0,
          width:'32px', height:'32px',
          zIndex:99999, pointerEvents:'none',
          filter: filterStr,
          transition:'filter 0.12s',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Handle (darker, grip area) */}
          <line x1="28" y1="28" x2="19" y2="19"
            stroke="#7a5410" strokeWidth="3.5" strokeLinecap="round"/>
          {/* Shaft */}
          <line x1="19" y1="19" x2="10" y2="10"
            stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
          {/* Hover/click glow ring around tip */}
          {glowing && (
            <circle cx="7" cy="7" r="5.5"
              fill="rgba(201,168,76,0.12)"
              stroke="rgba(201,168,76,0.35)"
              strokeWidth="0.5"/>
          )}
          {/* 4-pointed star tip — brighter white when clicking */}
          <path
            d="M7,3 L8,6 L11,7 L8,8 L7,11 L6,8 L3,7 L6,6 Z"
            fill={isDown ? '#ffffff' : '#c9a84c'}
          />
        </svg>
      </div>

      {/* Click sparks */}
      {sparks.flatMap(sp =>
        SPARK_ANGLES.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const sx  = (Math.cos(rad) * SPARK_DIST).toFixed(1)
          const sy  = (Math.sin(rad) * SPARK_DIST).toFixed(1)
          return (
            <div
              key={`${sp.id}-${i}`}
              style={{
                '--sx': `${sx}px`,
                '--sy': `${sy}px`,
                position:'fixed',
                left: sp.x,
                top:  sp.y,
                width:'3px', height:'3px',
                borderRadius:'50%',
                background: i % 2 === 0 ? '#c9a84c' : '#ffffff',
                zIndex:99998, pointerEvents:'none',
                animation:'wandSpark 0.45s ease-out both',
              } as CSSProperties}
            />
          )
        })
      )}

      <style>{`
        @keyframes wandSpark {
          0%   { transform: translate(-50%,-50%) scale(1.4); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--sx)), calc(-50% + var(--sy))) scale(0); opacity: 0; }
        }
      `}</style>
    </>
  )
}
