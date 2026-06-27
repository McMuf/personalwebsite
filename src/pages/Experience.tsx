import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

/*
  ============================================================
  HOW TO ADD A NEW EXPERIENCE (e.g. a co-op or internship):
  Add a new object to the EXPERIENCES array below (newest first).

  Shape:
  {
    company:  'Company Name',
    type:     'Internship',
    location: 'City, Province',
    icon:     <svg>...</svg>,          ← inline SVG, 18×18
    roles: [
      {
        title:   'Job Title',
        period:  'Jan 2026 – Present',
        current: true,
        bullets: ['bullet 1', 'bullet 2'],
      },
    ],
  }
  ============================================================
*/
const EXPERIENCES = [
  {
    company: 'vsHacks',
    type: 'Self-employed',
    location: 'Virtual / Vancouver, BC',
    icon: <img src="/images/experience/vshacks.png" alt="vsHacks" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px' }} />,
    roles: [
      {
        title: 'Hackathon Chair 2026',
        period: 'Jan 2026 – Present',
        current: true,
        bullets: [
          'Currently organizing vsHacks 2026 with $10,000+ CAD in potential prize funding and 8+ corporate sponsors.',
          'Cold-emailing and networking to recruit senior practitioners from J.P. Morgan, Apple, and Microsoft as judges and keynote speakers.',
          'Designing judging rubrics and managing evaluation logistics across hundreds of project submissions.',
        ],
      },
      {
        title: 'Hackathon Chair 2025',
        period: 'Jan 2025 – Dec 2025',
        current: false,
        bullets: [
          'Directed a student-run virtual hackathon scaling to 400+ participants, 8+ sponsors, and $10,000+ CAD in prizes.',
          'Negotiated cash and in-kind contributions across 8+ corporate sponsors; coordinated prize allocation and post-event sponsor reporting.',
          'Managed full event budget, sponsor deliverables, and cross-functional event logistics end-to-end.',
        ],
      },
    ],
  },
  {
    company: 'Conceptus Foundation',
    type: 'Self-employed',
    location: 'Vancouver, BC',
    icon: <img src="/images/projects/conceptus.png" alt="Conceptus Foundation" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px' }} />,
    roles: [
      {
        title: 'Executive Board Member',
        period: 'Feb 2026 – Present',
        current: true,
        bullets: [
          'Aiding and handling administrative tasks, overseeing leadership within Conceptus Foundation.',
          'Mentoring next generation of enthusiastic youth in STEM disciplines.',
        ],
      },
      {
        title: 'Co-Founder & President',
        period: 'Sep 2024 – Feb 2026',
        current: false,
        bullets: [
          'Founded and led a registered STEM-education nonprofit; managed 20+ volunteers and oversaw budgeting, fundraising, and donor communications.',
          'Fundraised $1,700+ CAD through targeted campaigns; directed proceeds to STEM programming in underserved communities.',
          'Grew Instagram to 1,000+ followers and 90,000+ impressions; scripted educational content series for a global youth audience.',
          'Built website achieving 3K monthly views; tutored Grades 4–7 students in Python fundamentals.',
        ],
      },
    ],
  },
  {
    company: 'Soundr',
    type: 'Self-employed',
    location: 'Vancouver, BC',
    icon: <img src="/images/projects/soundr.png" alt="Soundr" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px' }} />,
    roles: [
      {
        title: 'President & Lead Developer',
        period: '2025',
        current: false,
        bullets: [
          'Co-founded a consumer health startup; served as president responsible for business strategy, financial record-keeping, and go-to-market execution.',
          'Generated $220 CAD in revenue within two weeks of launch; maintained the company balance sheet and produced financial summaries.',
          'Built and deployed the production web app (TypeScript, React, Tailwind CSS, Vercel); coordinated cross-functional execution between strategy and development.',
        ],
      },
    ],
  },
]

// Opacity gradient for the connector dots — dimmer at edges, brighter in centre
const CONNECTOR = [0.12, 0.22, 0.35, 0.22, 0.12]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.exp-card')
    if (cards?.length) {
      animate(cards, {
        translateY: [40, 0], opacity: [0, 1],
        delay: stagger(150, { start: 200 }),
        duration: 700, easing: 'easeOutExpo',
      })
    }
  }, [])

  return (
    <div style={{ minHeight:'100vh', paddingTop:'62px', background:'#08080f' }} className="diamond-bg">
      <div
        ref={containerRef}
        style={{ maxWidth:'780px', margin:'0 auto', padding:'56px 28px 80px' }}
      >
        {/* Header */}
        <div style={{ marginBottom:'44px' }}>
          <p className="font-mono-tech" style={{ color:'rgba(201,168,76,0.5)', fontSize:'11px', letterSpacing:'3px', marginBottom:'10px' }}>
            ✦ &nbsp; 03. EXPERIENCE
          </p>
          <h1 className="font-cinzel" style={{ fontSize:'clamp(28px,4vw,52px)', color:'#f0ece4', lineHeight:1.3, fontWeight:600 }}>
            Where I've Worked
          </h1>
        </div>

        {/* Timeline */}
        <div style={{ position:'relative' }}>
          {/* Continuous vertical line behind everything */}
          <div style={{
            position:'absolute', left:'19px', top:0, bottom:0, width:'1px',
            background:'linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.14) 4%, rgba(201,168,76,0.14) 96%, transparent 100%)',
            pointerEvents:'none',
          }}/>

          {EXPERIENCES.map((exp, ei) => (
            <div key={exp.company} className="exp-card" style={{ opacity:0 }}>

              {/* ── Company block ─────────────────────────────── */}
              <div style={{ position:'relative', paddingLeft:'52px' }}>

                {/* Diamond marker — sits on the timeline line */}
                <div style={{
                  position:'absolute', left:'13px', top:'24px',
                  width:'13px', height:'13px',
                  transform:'rotate(45deg)',
                  background:'#08080f',
                  border:'1px solid rgba(201,168,76,0.45)',
                }}/>

                {/* Card */}
                <div style={{
                  background:'#0b0b18',
                  border:'1px solid rgba(201,168,76,0.09)',
                  borderRadius:'10px', overflow:'hidden',
                }}>
                  {/* Company header */}
                  <div style={{
                    display:'flex', alignItems:'center', gap:'14px',
                    padding:'18px 22px',
                    borderBottom:'1px solid rgba(201,168,76,0.07)',
                    background:'#090915',
                  }}>
                    {/* Company logo */}
                    <div style={{
                      width:'40px', height:'40px', borderRadius:'9px', flexShrink:0,
                      border:'1px solid rgba(201,168,76,0.11)',
                      overflow:'hidden',
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>
                      {exp.icon}
                    </div>

                    <div style={{ flex:1, minWidth:0 }}>
                      <h2 style={{ color:'#f0ece4', fontSize:'15px', fontWeight:600, marginBottom:'3px' }}>
                        {exp.company}
                      </h2>
                      <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
                        <span className="font-mono-tech" style={{ color:'#363646', fontSize:'10px', letterSpacing:'1px' }}>
                          {exp.type}
                        </span>
                        <span style={{ color:'#252535' }}>·</span>
                        <span className="font-mono-tech" style={{ color:'#363646', fontSize:'10px', letterSpacing:'1px' }}>
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  <div style={{ padding:'0 22px 4px' }}>
                    {exp.roles.map((role, ri) => (
                      <div key={role.title} style={{
                        padding:'18px 0',
                        borderBottom: ri < exp.roles.length - 1
                          ? '1px solid rgba(201,168,76,0.06)'
                          : 'none',
                      }}>
                        {/* Title + CURRENT badge */}
                        <div style={{
                          display:'flex', alignItems:'center', gap:'10px',
                          marginBottom:'4px', flexWrap:'wrap',
                        }}>
                          <h3 style={{ color:'#e8e4dc', fontSize:'14px', fontWeight:600 }}>
                            {role.title}
                          </h3>
                          {role.current && (
                            <span className="font-mono-tech" style={{
                              fontSize:'8px', letterSpacing:'1.5px', color:'#c9a84c',
                              padding:'2px 7px',
                              border:'1px solid rgba(201,168,76,0.22)',
                              borderRadius:'3px',
                            }}>
                              CURRENT
                            </span>
                          )}
                        </div>

                        {/* Period */}
                        <p className="font-mono-tech" style={{
                          color:'#363646', fontSize:'10px', letterSpacing:'1px', marginBottom:'13px',
                        }}>
                          {role.period}
                        </p>

                        {/* Bullet points */}
                        <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:'7px' }}>
                          {role.bullets.map((b, bi) => (
                            <li key={bi} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                              <span style={{
                                color:'rgba(201,168,76,0.38)', fontSize:'11px',
                                marginTop:'3px', flexShrink:0,
                              }}>—</span>
                              <span style={{ color:'#686878', fontSize:'13px', lineHeight:1.7 }}>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Connector dots between companies ──────────── */}
              {ei < EXPERIENCES.length - 1 && (
                <div style={{ position:'relative', height:'52px' }}>
                  {CONNECTOR.map((opacity, d) => (
                    <div key={d} style={{
                      position:'absolute',
                      left:'19px',
                      top:`${6 + d * 10}px`,
                      width:'3px', height:'3px',
                      borderRadius:'50%',
                      background:'#c9a84c',
                      opacity,
                      transform:'translateX(-50%)',
                    }}/>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
