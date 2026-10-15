import { useState, useEffect, useRef } from 'react'
import Footer, { type Page } from './Footer'

const RED = '#ef4444'
const BG  = '#07070f'
const FG  = '#f0f0f5'
const MUTED = '#6b6b88'

// ── Icons ──────────────────────────────────────────────────────
function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.77 2.01z"/>
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function IconXClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
function IconWrench() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  )
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function scrollToCta() {
  document.getElementById('cta-computer')?.scrollIntoView({ behavior: 'smooth' })
}

// ── PC Diagram SVG ─────────────────────────────────────────────
const PC_COMPONENTS = [
  { key: 'cpu',     label: 'CPU',  name: 'Processore',      note: 'Scelto in base al carico di lavoro reale del cliente' },
  { key: 'cooling', label: 'FAN',  name: 'Raffreddamento',  note: 'Dimensionato per silenziosità e longevità nel tempo' },
  { key: 'ram',     label: 'RAM',  name: 'Memoria',         note: "Capacità e velocità calibrate sull'utilizzo effettivo" },
  { key: 'gpu',     label: 'GPU',  name: 'Scheda Video',    note: 'Per gaming, rendering 3D o uso professionale' },
  { key: 'ssd',     label: 'SSD',  name: 'Storage',         note: 'Tipo e capienza selezionati per il flusso di lavoro' },
  { key: 'psu',     label: 'PSU',  name: 'Alimentatore',   note: 'Certificazione e wattaggio con margine di sicurezza' },
  { key: 'case',    label: 'CASE', name: 'Cabinet',         note: 'Scelto per airflow, estetica e possibilità di espansione' },
]

function PcDiagram({ active }: { active: string | null }) {
  const glow = (key: string) => active === key

  const hlFill = (key: string) => glow(key) ? `${RED}22` : 'transparent'
  const hlStroke = (key: string) => glow(key) ? RED : 'transparent'
  const hlFilter = (key: string) => glow(key) ? 'url(#glow-red)' : 'none'

  // Base colors
  const base = {
    mobo: '#0a1420',
    moboStroke: '#14203a',
    comp: '#111828',
    compStroke: '#1a2535',
    fan: '#0d1020',
    fanStroke: '#161828',
    psu: '#0c0c1a',
    psuStroke: '#14142a',
    case: '#0f0f1a',
    caseStroke: '#1e1e30',
  }

  return (
    <svg viewBox="0 0 480 370" style={{ width: '100%', height: 'auto', maxHeight: '400px', display: 'block' }} aria-label="Diagramma componenti PC">
      <defs>
        <filter id="glow-red" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-subtle" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Case body */}
      <rect x="4" y="4" width="472" height="362" rx="10" fill={base.case} stroke={base.caseStroke} strokeWidth="2"/>

      {/* Motherboard */}
      <rect x="18" y="16" width="282" height="330" rx="5" fill={base.mobo} stroke={base.moboStroke} strokeWidth="1.5"/>
      {/* I/O strip */}
      <rect x="18" y="16" width="282" height="22" rx="3" fill="#080e18"/>
      {/* Port connectors */}
      {[0,1,2,3,4,5].map(i => <rect key={i} x={28 + i*18} y={20} width="12" height="13" rx="1.5" fill="#0f1825" stroke="#182030" strokeWidth="1"/>)}

      {/* PCIe traces */}
      {[170,195,220,245,270].map(y => <line key={y} x1="25" y1={y} x2="295" y2={y} stroke="#0f1a28" strokeWidth="1"/>)}

      {/* CPU socket */}
      <rect x="55" y="50" width="95" height="95" rx="4" fill="#0c1828" stroke="#141f30" strokeWidth="1.5"/>
      {/* CPU die */}
      <rect x="70" y="65" width="65" height="65" rx="3" fill={base.comp} stroke={base.compStroke} strokeWidth="1.5"/>
      {/* CPU texture */}
      <rect x="80" y="75" width="12" height="45" rx="1" fill="#161e2e" opacity="0.8"/>
      <rect x="96" y="75" width="12" height="45" rx="1" fill="#161e2e" opacity="0.8"/>
      <rect x="112" y="75" width="12" height="45" rx="1" fill="#161e2e" opacity="0.8"/>

      {/* CPU cooler (circle fan) */}
      <circle cx="102" cy="97" r="58" fill="#0c1522" stroke="#141e2e" strokeWidth="1.5"/>
      <circle cx="102" cy="97" r="42" fill={base.fan} stroke={base.fanStroke} strokeWidth="1"/>
      <circle cx="102" cy="97" r="28" fill="#0a0e18" stroke="#101828" strokeWidth="1"/>
      <circle cx="102" cy="97" r="10" fill="#0d1020"/>
      {/* Fan blades */}
      {[0,60,120,180,240,300].map(deg => {
        const rad = (deg * Math.PI) / 180
        const x1 = 102 + 12 * Math.cos(rad), y1 = 97 + 12 * Math.sin(rad)
        const x2 = 102 + 36 * Math.cos(rad + 0.5), y2 = 97 + 36 * Math.sin(rad + 0.5)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#181e2e" strokeWidth="2.5" strokeLinecap="round"/>
      })}

      {/* RAM slots (4 sticks) */}
      {[170, 190, 210, 230].map((x, i) => (
        <g key={i}>
          <rect x={x} y="36" width="14" height="105" rx="2" fill={base.comp} stroke={base.compStroke} strokeWidth="1"/>
          <rect x={x + 3} y="40" width="8" height="60" rx="1" fill="#161e2e"/>
          <rect x={x + 2} y="130" width="10" height="8" rx="1" fill="#0d1520"/>
        </g>
      ))}

      {/* PCIe slot lines */}
      <rect x="20" y="195" width="278" height="8" rx="1" fill="#0d1525"/>
      <rect x="20" y="215" width="278" height="8" rx="1" fill="#0d1525"/>

      {/* GPU card */}
      <rect x="20" y="228" width="268" height="72" rx="4" fill={base.comp} stroke={base.compStroke} strokeWidth="1.5"/>
      {/* GPU fans */}
      {[75, 175].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={264} r={28} fill={base.fan} stroke={base.fanStroke} strokeWidth="1"/>
          <circle cx={cx} cy={264} r={18} fill="#0a0e18" stroke="#101828" strokeWidth="1"/>
          <circle cx={cx} cy={264} r={6} fill="#0d1020"/>
          {[0,90,180,270].map(deg => {
            const rad = (deg * Math.PI) / 180
            return <line key={deg} x1={cx + 7 * Math.cos(rad)} y1={264 + 7 * Math.sin(rad)} x2={cx + 16 * Math.cos(rad + 0.4)} y2={264 + 16 * Math.sin(rad + 0.4)} stroke="#181e2e" strokeWidth="2" strokeLinecap="round"/>
          })}
        </g>
      ))}
      {/* GPU VRAM chips */}
      {[225, 243, 261].map(x => <rect key={x} x={x} y={238} width="14" height="14" rx="2" fill="#161e2e"/>)}

      {/* M.2 SSD */}
      <rect x="55" y="318" width="140" height="16" rx="2.5" fill={base.comp} stroke={base.compStroke} strokeWidth="1"/>
      <rect x="62" y="321" width="6" height="10" rx="1" fill="#161e2e"/>
      {[74,86,98,110,122,134,146,158,170].map(x => <rect key={x} x={x} y={323} width="5" height="6" rx="0.5" fill="#131c2a"/>)}

      {/* PSU */}
      <rect x="308" y="210" width="158" height="145" rx="5" fill={base.psu} stroke={base.psuStroke} strokeWidth="1.5"/>
      <circle cx="370" cy="282" r="48" fill="#0a0a16" stroke="#141428" strokeWidth="1"/>
      <circle cx="370" cy="282" r="32" fill="#080814" stroke="#10102a" strokeWidth="1"/>
      <circle cx="370" cy="282" r="12" fill="#0c0c1e"/>
      {[0,45,90,135,180,225,270,315].map(deg => {
        const rad = (deg * Math.PI) / 180
        return <line key={deg} x1={370 + 14*Math.cos(rad)} y1={282 + 14*Math.sin(rad)} x2={370 + 28*Math.cos(rad+0.3)} y2={282 + 28*Math.sin(rad+0.3)} stroke="#141428" strokeWidth="2" strokeLinecap="round"/>
      })}
      {/* PSU vents */}
      {[215,220,225,230,235].map(y => <line key={y} x1="315" y1={y} x2="350" y2={y} stroke="#13132a" strokeWidth="1.5"/>)}

      {/* Top case fans */}
      {[370, 430].map((cx, fi) => (
        <g key={fi} opacity={fi === 1 ? 0.7 : 1}>
          <circle cx={cx} cy={90} r={fi === 0 ? 55 : 40} fill="#0b0b18" stroke="#131326" strokeWidth="1.5"/>
          <circle cx={cx} cy={90} r={fi === 0 ? 36 : 26} fill="#090914" stroke="#0f0f22" strokeWidth="1"/>
          <circle cx={cx} cy={90} r={fi === 0 ? 14 : 10} fill="#0c0c1c"/>
          {[0,90,180,270].map(deg => {
            const rad = (deg * Math.PI) / 180
            const r1 = fi === 0 ? 16 : 12, r2 = fi === 0 ? 32 : 22
            return <line key={deg} x1={cx + r1*Math.cos(rad)} y1={90 + r1*Math.sin(rad)} x2={cx + r2*Math.cos(rad+0.4)} y2={90 + r2*Math.sin(rad+0.4)} stroke="#13132a" strokeWidth="2.5" strokeLinecap="round"/>
          })}
        </g>
      ))}

      {/* ── HIGHLIGHT OVERLAYS (transparent, sit on top) ── */}

      {/* CPU highlight */}
      <rect x="55" y="50" width="95" height="95" rx="4" fill={hlFill('cpu')} stroke={hlStroke('cpu')} strokeWidth="2" filter={hlFilter('cpu')} style={{ transition: 'all 0.3s ease' }}/>

      {/* Cooling highlight (full cooler circle) */}
      <circle cx="102" cy="97" r="62" fill={hlFill('cooling')} stroke={hlStroke('cooling')} strokeWidth="2" filter={hlFilter('cooling')} style={{ transition: 'all 0.3s ease' }}/>

      {/* RAM highlight */}
      <rect x="164" y="30" width="90" height="118" rx="4" fill={hlFill('ram')} stroke={hlStroke('ram')} strokeWidth="2" filter={hlFilter('ram')} style={{ transition: 'all 0.3s ease' }}/>

      {/* GPU highlight */}
      <rect x="16" y="224" width="276" height="80" rx="6" fill={hlFill('gpu')} stroke={hlStroke('gpu')} strokeWidth="2" filter={hlFilter('gpu')} style={{ transition: 'all 0.3s ease' }}/>

      {/* SSD highlight */}
      <rect x="50" y="312" width="152" height="28" rx="4" fill={hlFill('ssd')} stroke={hlStroke('ssd')} strokeWidth="2" filter={hlFilter('ssd')} style={{ transition: 'all 0.3s ease' }}/>

      {/* PSU highlight */}
      <rect x="304" y="206" width="166" height="153" rx="7" fill={hlFill('psu')} stroke={hlStroke('psu')} strokeWidth="2" filter={hlFilter('psu')} style={{ transition: 'all 0.3s ease' }}/>

      {/* Case highlight (just the border) */}
      <rect x="2" y="2" width="476" height="366" rx="11" fill="none" stroke={glow('case') ? RED : 'transparent'} strokeWidth="3" filter={glow('case') ? 'url(#glow-red)' : 'none'} style={{ transition: 'all 0.3s ease' }}/>

      {/* Component labels (always visible, subtle) */}
      {[
        { x: 65, y: 105, t: 'CPU' },
        { x: 77, y: 55, t: 'FAN' },
        { x: 182, y: 98, t: 'RAM' },
        { x: 95, y: 257, t: 'GPU' },
        { x: 66, y: 330, t: 'SSD' },
        { x: 324, y: 290, t: 'PSU' },
      ].map(l => (
        <text key={l.t} x={l.x} y={l.y} fill={active && PC_COMPONENTS.find(c => c.label === l.t)?.key === active ? RED : '#2a3a50'} fontSize="9" fontFamily="Outfit, sans-serif" fontWeight="700" letterSpacing="0.08em" style={{ transition: 'fill 0.3s ease' }}>{l.t}</text>
      ))}
    </svg>
  )
}

// ── Navbar ─────────────────────────────────────────────────────
function Navbar({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const anchorLinks = [
    { label: 'Soluzioni', href: '#soluzioni' },
    { label: 'Componenti', href: '#componenti' },
  ]

  const navStyle: React.CSSProperties = { fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.88rem', color: '#a0a0b8', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.01em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.4s ease', background: scrolled ? 'rgba(7,7,15,0.94)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <button onClick={() => { onNavigate('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: RED, boxShadow: `0 0 12px ${RED}` }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: FG }}>
            PC su Misura<span style={{ color: RED }}>.</span>
          </span>
        </button>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {anchorLinks.map(l => (
            <a key={l.label} href={l.href} style={navStyle}
              onMouseEnter={e => (e.currentTarget.style.color = FG)}
              onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
            >{l.label}</a>
          ))}
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3a3a55' }} />
          <button onClick={() => onNavigate('assistenza')} style={navStyle}
            onMouseEnter={e => (e.currentTarget.style.color = FG)}
            onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
          >Assistenza & Servizi</button>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <a href="tel:+393311090522" className="nav-cta-phone" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: RED, textDecoration: 'none' }}>
            <IconPhone /> Chiamaci
          </a>
          <button className="btn-primary" onClick={scrollToCta} style={{ fontSize: '0.83rem', padding: '0.58rem 1.15rem', background: RED, animation: 'none', boxShadow: `0 0 20px ${RED}44` }}>
            Configura il tuo PC
          </button>
          <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ background: 'none', border: 'none', color: FG, cursor: 'pointer', padding: '0.25rem' }}>
            {open ? <IconXClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: 'rgba(7,7,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
          {anchorLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', textDecoration: 'none', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ height: '1px', background: `rgba(239,68,68,0.2)`, margin: '0.5rem 0' }} />
          <button onClick={() => { onNavigate('assistenza'); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
            Assistenza & Servizi
          </button>
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
            <a href="tel:+393311090522" className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              <IconPhone /> Chiamaci
            </a>
            <button onClick={() => { scrollToCta(); setOpen(false) }} style={{ flex: 1, background: RED, color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', padding: '0.8rem 1rem' }}>
              Configura
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '68px' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '-80px', right: '-100px', width: '580px', height: '580px', borderRadius: '50%', background: `radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-180px', left: '-150px', width: '650px', height: '650px', borderRadius: '50%', background: `radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div className="noise-overlay" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.25rem', width: '100%' }} className="rg-2">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)', borderRadius: '2rem', padding: '0.3rem 0.9rem', marginBottom: '1.6rem', opacity: 0, animation: 'fadeInUp 0.6s ease 0.1s forwards' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: RED, boxShadow: `0 0 8px ${RED}` }} />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.73rem', fontWeight: 700, color: RED, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Configurazioni Su Misura</span>
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: FG, margin: 0, opacity: 0, animation: 'fadeInUp 0.7s ease 0.2s forwards' }}>
            Computer progettati per il tuo modo di{' '}
            <span style={{ background: `linear-gradient(135deg, ${RED}, #fca5a5)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              lavorare, giocare e creare
            </span>
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.72, color: MUTED, margin: '1.5rem 0 2.25rem', maxWidth: '490px', opacity: 0, animation: 'fadeInUp 0.7s ease 0.32s forwards' }}>
            Realizziamo PC personalizzati scegliendo ogni componente in base alle tue esigenze. Dalla progettazione alla consegna, ti accompagniamo in ogni fase.
          </p>

          <div className="cta-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeInUp 0.7s ease 0.44s forwards' }}>
            <button onClick={scrollToCta} style={{ background: RED, color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.25s ease', boxShadow: `0 0 24px ${RED}44` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${RED}55` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 0 24px ${RED}44` }}
            >
              Richiedi una configurazione <IconArrow />
            </button>
            <a href="tel:+393311090522" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none' }}>
              <IconPhone /> Parla con un tecnico
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', opacity: 0, animation: 'fadeIn 1s ease 0.35s forwards' }}>
          <div style={{ position: 'absolute', inset: '-14px', borderRadius: '1.4rem', background: `linear-gradient(135deg, rgba(239,68,68,0.16), transparent 60%)`, zIndex: 0 }} />
          <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', border: `1px solid rgba(239,68,68,0.2)`, boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 50px rgba(239,68,68,0.1)` }}>
            <img src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=720&h=500&fit=crop&auto=format" alt="Postazione workstation professionale" className="hero-img" style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,15,0.5) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(12px)', border: `1px solid rgba(239,68,68,0.25)`, borderRadius: '0.65rem', padding: '0.65rem 1.1rem' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.82rem', color: RED }}>Progettato su misura</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: MUTED, marginTop: '0.1rem' }}>Ogni componente scelto per te</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PC Solutions ───────────────────────────────────────────────
const PC_CARDS = [
  { tag: 'Gaming', tagColor: '#7c3aed', title: 'PC Gaming', desc: 'Computer ad alte prestazioni progettati per offrire la migliore esperienza di gioco, con componenti scelti in base ai titoli utilizzati e alle prestazioni desiderate.', features: ['Elevate prestazioni', 'Componenti selezionati', 'Upgrade futuri possibili'], img: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=560&h=300&fit=crop&auto=format' },
  { tag: 'Business', tagColor: '#059669', title: 'PC Ufficio e Aziende', desc: 'Soluzioni affidabili e veloci per professionisti e aziende che cercano strumenti stabili per lavorare ogni giorno senza interruzioni o rallentamenti.', features: ['Affidabilità', 'Silenziosità', 'Produttività'], img: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=560&h=300&fit=crop&auto=format' },
  { tag: 'Pro', tagColor: RED, title: 'Workstation Professionali', desc: 'Configurazioni per rendering, CAD, grafica 3D, editing video e software professionali. Hardware di fascia alta, stabile e pensato per il lavoro intensivo.', features: ['Massime prestazioni', 'Hardware professionale', 'Stabilità nel tempo'], img: 'https://images.unsplash.com/photo-1632749042303-7f7a18ed6ff0?w=560&h=300&fit=crop&auto=format' },
  { tag: 'Home', tagColor: '#d97706', title: 'PC Casa', desc: "Computer semplici, veloci e pronti all'uso per navigazione, studio, multimedia e utilizzo quotidiano. Configurati e consegnati direttamente a casa.", features: ["Facilità d'utilizzo", 'Configurazione completa', 'Assistenza inclusa'], img: 'https://images.unsplash.com/photo-1619597455322-4fbbd820250a?w=560&h=300&fit=crop&auto=format' },
]

function SoluzioniCards() {
  const { ref, inView } = useInView()
  return (
    <section id="soluzioni" className="section-pad" style={{ position: 'relative' }}>
      <div className="noise-overlay" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED, marginBottom: '0.9rem' }}>LE NOSTRE SOLUZIONI</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', color: FG, margin: '0 0 1rem' }}>Una configurazione per ogni esigenza</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: MUTED, maxWidth: '500px', margin: '0 auto', lineHeight: 1.72 }}>Ogni PC viene progettato partendo dall'utilizzo reale del cliente. Nessuna scorciatoia, nessun componente generico.</p>
        </div>

        <div className="rg-cards-2">
          {PC_CARDS.map((c, i) => (
            <div key={c.title} className="service-card card-glass"
              style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: `all 0.65s ease ${i * 0.1 + 0.15}s` }}
            >
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#0f0f1a' }}>
                <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,7,15,0.15), rgba(7,7,15,0.75))' }} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: c.tagColor, borderRadius: '0.3rem', padding: '0.18rem 0.6rem' }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.67rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{c.tag}</span>
                </div>
              </div>
              <div style={{ padding: '1.4rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: FG, margin: '0 0 0.65rem', letterSpacing: '-0.01em' }}>{c.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: MUTED, lineHeight: 1.72, margin: '0 0 1.1rem' }}>{c.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {c.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#a0a0b8' }}>
                      <span style={{ color: RED, flexShrink: 0 }}><IconCheck /></span>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={scrollToCta} style={{ background: 'none', border: 'none', color: RED, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'gap 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.gap = '0.65rem')}
                  onMouseLeave={e => (e.currentTarget.style.gap = '0.4rem')}
                >
                  Richiedi configurazione <IconArrow />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Upgrade redirect banner ────────────────────────────────────
function UpgradeBanner({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { ref, inView } = useInView()
  return (
    <section className="section-pad-sm" style={{ position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '1.1rem', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(239,68,68,0.12)', border: `1px solid rgba(239,68,68,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RED, flexShrink: 0 }}>
                <IconWrench />
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: FG, marginBottom: '0.25rem' }}>
                  Hai già un computer e vuoi dargli una seconda vita?
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: MUTED }}>
                  Upgrade, ottimizzazione, pulizia e riparazione: scopri i nostri servizi di assistenza.
                </div>
              </div>
            </div>
            <button onClick={() => onNavigate('assistenza')} style={{ background: RED, color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.25s ease', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${RED}44` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Vai ad Assistenza & Servizi <IconArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Component selector with SVG ────────────────────────────────
function ComponentsSection() {
  const { ref, inView } = useInView(0.1)
  const [active, setActive] = useState('cpu')

  const current = PC_COMPONENTS.find(c => c.key === active)!

  return (
    <section id="componenti" className="section-pad" style={{ position: 'relative', background: 'linear-gradient(180deg, #07070f 0%, #0c0c1c 100%)' }}>
      <div className="noise-overlay" />
      <div style={{ position: 'absolute', right: 0, top: '30%', width: '350px', height: '500px', background: `radial-gradient(ellipse at right, rgba(239,68,68,0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED, marginBottom: '0.9rem' }}>SELEZIONE COMPONENTI</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', color: FG, margin: '0 0 1rem' }}>Ogni componente ha un motivo</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: MUTED, maxWidth: '480px', margin: '0 auto', lineHeight: 1.72 }}>Nessun componente scelto a caso. Clicca su un componente per scoprire perché lo selezioniamo.</p>
        </div>

        <div style={{ gap: '4rem' }} className="rg-2">
          {/* Left: component list */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-20px)', transition: 'all 0.7s ease' }}>
            <div className="comp-tabs" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {PC_COMPONENTS.map((c) => (
                <button key={c.key} onClick={() => setActive(c.key)}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.1rem', borderRadius: '0.65rem', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.22s ease', background: active === c.key ? 'rgba(239,68,68,0.1)' : 'transparent', outline: active === c.key ? `1px solid rgba(239,68,68,0.28)` : '1px solid transparent' }}
                >
                  <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '0.45rem', background: active === c.key ? 'rgba(239,68,68,0.18)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.22s' }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.68rem', color: active === c.key ? RED : MUTED, letterSpacing: '0.04em' }}>{c.label}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.92rem', color: active === c.key ? FG : '#a0a0b8' }}>{c.name}</div>
                    {active === c.key && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: MUTED, marginTop: '0.15rem', lineHeight: 1.5 }}>{c.note}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: SVG diagram */}
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(20px)', transition: 'all 0.7s ease 0.15s' }}>
            <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', border: `1px solid rgba(239,68,68,0.15)`, background: '#08080f', boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 40px rgba(239,68,68,0.08)`, padding: '1.25rem' }}>
              <PcDiagram active={active} />
              {/* Active component info bar */}
              <div style={{ marginTop: '1rem', background: 'rgba(239,68,68,0.07)', border: `1px solid rgba(239,68,68,0.2)`, borderRadius: '0.6rem', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <div style={{ width: '2.8rem', height: '2.8rem', borderRadius: '0.4rem', background: 'rgba(239,68,68,0.15)', border: `1px solid rgba(239,68,68,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.7rem', color: RED }}>{current.label}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: FG }}>{current.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: MUTED, marginTop: '0.12rem' }}>{current.note}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA ────────────────────────────────────────────────────────
function CtaSection() {
  const { ref, inView } = useInView()
  return (
    <section id="cta-computer" className="section-pad" style={{ position: 'relative' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }}>
        <div ref={ref} style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', padding: 'clamp(2rem, 6vw, 4rem)', background: `linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 50%, rgba(15,15,26,0.9) 100%)`, border: `1px solid rgba(239,68,68,0.22)`, textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'all 0.8s ease' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center top, rgba(239,68,68,0.15), transparent 65%)`, pointerEvents: 'none' }} />
          <div className="noise-overlay" />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED, marginBottom: '1rem' }}>CONFIGURIAMO INSIEME</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 5vw, 3rem)', letterSpacing: '-0.03em', color: FG, margin: '0 0 0.9rem', lineHeight: 1.08 }}>
              Non sai quale computer scegliere?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: MUTED, margin: '0 auto 2rem', maxWidth: '460px', lineHeight: 1.72 }}>
              Raccontaci cosa devi fare e realizzeremo la soluzione più adatta alle tue esigenze. Consulenza sempre gratuita.
            </p>
            <div className="cta-row" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+393311090522" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: `rgba(239,68,68,0.1)`, border: `1px solid rgba(239,68,68,0.35)`, borderRadius: '0.5rem', padding: '0.9rem 1.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.transform = 'none' }}
              >
                <IconPhone /> +39 331 109 0522
              </a>
              <a href="mailto:pcsumisura.info@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: `rgba(239,68,68,0.1)`, border: `1px solid rgba(239,68,68,0.35)`, borderRadius: '0.5rem', padding: '0.9rem 1.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.transform = 'none' }}
              >
                <IconMail /> pcsumisura.info@gmail.com
              </a>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.77rem', color: '#3a3a58', marginTop: '1.25rem' }}>
              Risposta garantita entro 24 ore · Consulenza sempre gratuita
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page root ──────────────────────────────────────────────────
export default function Computer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar onNavigate={onNavigate} />
      <Hero />
      <SoluzioniCards />
      <UpgradeBanner onNavigate={onNavigate} />
      <ComponentsSection />
      <CtaSection />
      <Footer onNavigate={onNavigate} accent={RED} />
    </div>
  )
}
