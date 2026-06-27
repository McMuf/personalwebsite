import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { animate, stagger } from 'animejs'
import emailjs from '@emailjs/browser'

/*
  ============================================================
  EMAILJS SETUP (do this once to wire up the form):
  1. Create free account at emailjs.com
  2. Add Email Service (Gmail) → copy Service ID
  3. Create Template with {{from_name}}, {{from_email}}, {{message}}, {{to_name}}
     Set To Email: danielmdlei@gmail.com → copy Template ID
  4. Account → API Keys → copy Public Key
  5. Replace the three values below
  ============================================================
*/
const EMAILJS_SERVICE_ID  = 'service_mssfteu'
const EMAILJS_TEMPLATE_ID = 'template_vbas9oq'
const EMAILJS_PUBLIC_KEY  = 'Weyu8JxkswGQcf5Ej'

const LINKS = [
  {
    label: 'Email',
    value: 'danielmdlei@gmail.com',
    href:  'mailto:danielmdlei@gmail.com',
    suit:  '♠',
    suitColor: '#c9a84c',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/McMuf',
    href:  'https://github.com/McMuf',
    suit:  '♣',
    suitColor: '#c9a84c',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/daniel-lei-234704269',
    href:  'https://www.linkedin.com/in/daniel-lei-234704269/',
    suit:  '♦',
    suitColor: '#c41e3a',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

type Status = 'idle'|'sending'|'success'|'error'

export default function Contact() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.reveal')
    if (items?.length) {
      animate(items, {
        translateY:[30,0], opacity:[0,1],
        delay: stagger(120, { start:100 }),
        duration:700, easing:'easeOutExpo',
      })
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name:name, from_email:email, message, to_name:'Daniel' },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ minHeight:'100vh', paddingTop:'62px', background:'#08080f' }} className="diamond-bg">
      <div
        ref={containerRef}
        style={{ maxWidth:'940px', margin:'0 auto', padding:'56px 28px 80px', display:'flex', flexDirection:'column', gap:'36px' }}
      >
        {/* Header */}
        <div className="reveal" style={{ opacity:0 }}>
          <p className="font-mono-tech" style={{ color:'rgba(201,168,76,0.5)', fontSize:'11px', letterSpacing:'3px', marginBottom:'10px' }}>
            ♥ &nbsp; 05. CONTACT
          </p>
          <h1 className="font-cinzel" style={{ fontSize:'clamp(28px,4vw,52px)', color:'#f0ece4', lineHeight:1.3, fontWeight:600 }}>
            Get In Touch
          </h1>
        </div>

        {/* Two-column layout */}
        <div
          className="reveal"
          style={{ opacity:0, display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:'24px', alignItems:'start' }}
        >
          {/* Form card */}
          <div className="card-frame" style={{ borderRadius:'12px', padding:'32px', display:'flex', flexDirection:'column', gap:'18px' }}>
            <div>
              <h2 style={{ color:'#f0ece4', fontSize:'17px', fontWeight:600, marginBottom:'5px' }}>Send a Message</h2>
              <p style={{ color:'#444', fontSize:'12px' }}>I'll get back to you as soon as I can.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {[
                { label:'NAME',     value:name,    set:setName,    type:'text',  ph:'Your name' },
                { label:'EMAIL',    value:email,   set:setEmail,   type:'email', ph:'your@email.com' },
              ].map(f => (
                <div key={f.label} style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                  <label className="font-mono-tech" style={{ color:'#444', fontSize:'10px', letterSpacing:'1.5px' }}>{f.label}</label>
                  <input
                    type={f.type} value={f.value} placeholder={f.ph} required
                    onChange={e => f.set(e.target.value)}
                    className="form-input"
                    style={{ padding:'11px 14px', borderRadius:'6px', fontSize:'13px', width:'100%' }}
                  />
                </div>
              ))}

              <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                <label className="font-mono-tech" style={{ color:'#444', fontSize:'10px', letterSpacing:'1.5px' }}>YOUR MESSAGE</label>
                <textarea
                  value={message} placeholder="What's on your mind?" required rows={5}
                  onChange={e => setMessage(e.target.value)}
                  className="form-input"
                  style={{ padding:'11px 14px', borderRadius:'6px', fontSize:'13px', width:'100%', resize:'vertical', fontFamily:'Inter,sans-serif' }}
                />
              </div>

              <button type="submit" disabled={status==='sending'}
                className="btn-gold font-mono-tech"
                style={{
                  padding:'13px', borderRadius:'6px', fontSize:'12px', letterSpacing:'2px',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                  opacity: status==='sending' ? 0.7 : 1,
                }}>
                {status === 'sending'
                  ? <><div style={{ width:'12px', height:'12px', border:'2px solid #08080f', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/> SENDING...</>
                  : 'SEND MESSAGE →'}
              </button>

              {status === 'success' && (
                <div style={{ padding:'11px 14px', background:'rgba(201,168,76,0.07)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'6px', color:'#c9a84c', fontSize:'12px', textAlign:'center' }}>
                  ♠ Message sent! I'll be in touch soon.
                </div>
              )}
              {status === 'error' && (
                <div style={{ padding:'11px 14px', background:'rgba(196,30,58,0.07)', border:'1px solid rgba(196,30,58,0.2)', borderRadius:'6px', color:'#c41e3a', fontSize:'12px', textAlign:'center' }}>
                  ♦ Something went wrong. Try emailing me directly.
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {/* Links card */}
            <div className="card-frame" style={{ borderRadius:'12px', padding:'24px', display:'flex', flexDirection:'column', gap:'4px' }}>
              <p className="font-mono-tech" style={{ color:'#3a3a4a', fontSize:'10px', letterSpacing:'2px', marginBottom:'14px' }}>FIND ME AT</p>
              {LINKS.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'flex', alignItems:'center', gap:'12px', padding:'12px 14px',
                    borderRadius:'7px', textDecoration:'none', color:'#7a7a8a',
                    border:'1px solid transparent', transition:'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,168,76,0.04)'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.15)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLAnchorElement).style.color = '#7a7a8a'
                    ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent'
                  }}
                >
                  <span style={{ color: link.suitColor, fontFamily:'serif', fontSize:'14px', flexShrink:0 }}>{link.suit}</span>
                  <span style={{ flexShrink:0, opacity:0.6 }}>{link.icon}</span>
                  <div style={{ display:'flex', flexDirection:'column', gap:'1px', overflow:'hidden' }}>
                    <span className="font-mono-tech" style={{ fontSize:'9px', color:'#3a3a4a', letterSpacing:'1px' }}>{link.label.toUpperCase()}</span>
                    <span style={{ fontSize:'11px', wordBreak:'break-all', color:'inherit' }}>{link.value}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
