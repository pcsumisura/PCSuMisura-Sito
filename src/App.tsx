import { useState, useEffect, useRef } from 'react'
import Computer from './Soluzioni'
import Assistenza from './Assistenza'
import Footer, { type Page } from './Footer'

// ── Icons ─────────────────────────────────────────────────────
function IconBriefcase() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  )
}
function IconGamepad() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/>
      <line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/>
      <path d="M6 20.485C3.5 20 2 17.5 2 15l1.071-7.5A2 2 0 0 1 5.053 5.5h13.894a2 2 0 0 1 1.982 2l1.071 7.5c0 2.5-1.5 5-4 5.485"/>
    </svg>
  )
}
function IconCpu() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  )
}
function IconHome2() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
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
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function IconX() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

// ── Hooks ──────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
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

const BLUE = '#2b7fff'

function scrollToCta() {
  document.getElementById('cta-final')?.scrollIntoView({ behavior: 'smooth' })
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
    { label: 'Servizi', href: '#servizi' },
    { label: 'Come Funziona', href: '#processo' },
  ]
  const pageLinks: { label: string; page: Page }[] = [
    { label: 'Computer', page: 'computer' },
    { label: 'Assistenza & Servizi', page: 'assistenza' },
  ]

  const navLinkStyle = { fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.88rem', color: '#a0a0b8', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.01em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.4s ease', background: scrolled ? 'rgba(7,7,15,0.94)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: BLUE, boxShadow: `0 0 12px ${BLUE}` }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#f0f0f5' }}>
            PC su Misura<span style={{ color: BLUE }}>.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {anchorLinks.map(l => (
            <a key={l.label} href={l.href} style={navLinkStyle as React.CSSProperties}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
            >{l.label}</a>
          ))}
          {/* Dot separator */}
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3a3a55', flexShrink: 0 }} />
          {pageLinks.map(l => (
            <button key={l.label} onClick={() => onNavigate(l.page)} style={navLinkStyle as React.CSSProperties}
              onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f5')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
            >{l.label}</button>
          ))}
          <a href="/lan1/" style={navLinkStyle as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
          >Per le aziende</a>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <a href="tel:+393756708997" className="nav-cta-phone" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: BLUE, textDecoration: 'none' }}>
            <IconPhone /> Chiamaci
          </a>
          <button className="btn-primary" onClick={scrollToCta} style={{ fontSize: '0.83rem', padding: '0.58rem 1.15rem' }}>
            Consulenza gratuita
          </button>
          <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ background: 'none', border: 'none', color: '#f0f0f5', cursor: 'pointer', padding: '0.25rem' }}>
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(7,7,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
          {anchorLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', textDecoration: 'none', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ height: '1px', background: 'rgba(43,127,255,0.2)', margin: '0.5rem 0' }} />
          {pageLinks.map(l => (
            <button key={l.label} onClick={() => { onNavigate(l.page); setOpen(false) }}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              {l.label}
            </button>
          ))}
          <a href="/lan1/" onClick={() => setOpen(false)}
            style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', textDecoration: 'none', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            Per le aziende
          </a>
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
            <a href="tel:+393756708997" className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              <IconPhone /> Chiamaci
            </a>
            <button className="btn-primary" onClick={() => { scrollToCta(); setOpen(false) }} style={{ flex: 1 }}>Consulenza</button>
          </div>
        </div>
      )}
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '68px' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, rgba(43,127,255,0.13) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-200px', left: '-200px', width: '700px', height: '700px', borderRadius: '50%', background: `radial-gradient(circle, rgba(43,127,255,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div className="noise-overlay" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.25rem', width: '100%' }} className="rg-2">
        {/* Copy */}
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#f0f0f5', margin: 0, opacity: 0, animation: 'fadeInUp 0.7s ease 0.1s forwards' }}>
            Il computer giusto,{' '}
            <span style={{ background: 'linear-gradient(135deg, #2b7fff, #88ccff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              costruito intorno
            </span>
            {' '}alle tue esigenze
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', lineHeight: 1.72, color: '#8a8aa8', margin: '1.6rem 0 2.4rem', maxWidth: '520px', opacity: 0, animation: 'fadeInUp 0.7s ease 0.25s forwards' }}>
            Progettiamo e assembliamo PC personalizzati per lavoro, gaming e professionisti.
            Dalla scelta dei componenti alla configurazione direttamente a casa tua.
          </p>

          <div className="cta-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeInUp 0.7s ease 0.38s forwards' }}>
            <button className="btn-primary" onClick={scrollToCta} style={{ fontSize: '0.97rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Richiedi consulenza gratuita <IconArrow />
            </button>
            <a href="tel:+393756708997" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <IconPhone /> Chiamaci ora
            </a>
          </div>

          <div className="trust-bar" style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', opacity: 0, animation: 'fadeInUp 0.7s ease 0.5s forwards' }}>
            {[
              { num: '100%', label: 'Configurazioni Personalizzate' },
              { num: '98%', label: 'Clienti Soddisfatti' },
              { num: '24h', label: 'Risposta Garantita' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.45rem', color: '#f0f0f5' }}>{s.num}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', color: '#6b6b88', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', opacity: 0, animation: 'fadeIn 1s ease 0.3s forwards' }}>
          <div style={{ position: 'absolute', inset: '-16px', borderRadius: '1.4rem', background: 'linear-gradient(135deg, rgba(43,127,255,0.18), transparent 60%)', zIndex: 0 }} />
          <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(43,127,255,0.2)', boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(43,127,255,0.12)' }}>
            <img
              src="https://images.unsplash.com/photo-1660855551740-4474188debdb?w=720&h=520&fit=crop&auto=format"
              alt="Custom PC professionale con illuminazione blu"
              className="hero-img" style={{ width: '100%', display: 'block', objectFit: 'cover', height: '460px' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,15,0.5) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(43,127,255,0.3)', borderRadius: '0.65rem', padding: '0.65rem 1.1rem' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.82rem', color: BLUE }}>Assemblato e testato</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#6b6b88', marginTop: '0.1rem' }}>Consegna a domicilio inclusa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.35 }}>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b88' }}>Scopri di più</span>
        <div style={{ width: '1px', height: '36px', background: `linear-gradient(to bottom, ${BLUE}, transparent)` }} />
      </div>
    </section>
  )
}

// ── Services ───────────────────────────────────────────────────
function Services() {
  const { ref, inView } = useInView()

  const services = [
    { icon: <IconBriefcase />, title: 'PC Ufficio e Aziende', tag: 'Business', tagColor: '#059669', desc: 'Computer affidabili e performanti per il lavoro quotidiano. Configurazioni ottimizzate per produttività, multi-tasking e applicazioni gestionali. Nessun componente superfluo.', img: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=400&h=260&fit=crop&auto=format' },
    { icon: <IconGamepad />, title: 'PC Gaming', tag: 'Gaming', tagColor: '#7c3aed', desc: 'Build gaming personalizzate per ogni budget e stile di gioco. Dal gaming in 1080p alle configurazioni 4K. Selezioniamo GPU, CPU e RAM per le massime prestazioni.', img: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400&h=260&fit=crop&auto=format' },
    { icon: <IconCpu />, title: 'Workstation Professionali', tag: 'Pro', tagColor: BLUE, desc: 'Workstation per video editing, rendering 3D, CAD e carichi intensivi. CPU multi-core, RAM ECC e GPU professionali per chi lavora senza compromessi.', img: 'https://images.unsplash.com/photo-1632749042303-7f7a18ed6ff0?w=400&h=260&fit=crop&auto=format' },
    { icon: <IconHome2 />, title: 'PC Casa', tag: 'Home', tagColor: '#d97706', desc: "Il computer ideale per la famiglia: streaming, navigazione, videochiamate e intrattenimento. Silenzioso, efficiente e pronto all'uso fin dal primo avvio.", img: 'https://images.unsplash.com/photo-1619597455322-4fbbd820250a?w=400&h=260&fit=crop&auto=format' },
  ]

  return (
    <section id="servizi" className="section-pad" style={{ position: 'relative' }}>
      <div className="noise-overlay" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '0.9rem' }}>I NOSTRI SERVIZI</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', color: '#f0f0f5', margin: '0 0 1rem' }}>
            Un PC costruito su misura per te
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6b6b88', maxWidth: '520px', margin: '0 auto', lineHeight: 1.72 }}>
            Non vendiamo computer standard. Progettiamo ogni configurazione in base alle tue reali esigenze, utilizzo e budget.
          </p>
        </div>

        <div className="rg-cards-2">
          {services.map((s, i) => (
            <div key={s.title} className="service-card card-glass"
              style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: `all 0.65s ease ${i * 0.1 + 0.15}s` }}
            >
              <div style={{ position: 'relative', height: '170px', overflow: 'hidden', background: '#0f0f1a' }}>
                <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(7,7,15,0.2), rgba(7,7,15,0.8))' }} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: s.tagColor, borderRadius: '0.3rem', padding: '0.18rem 0.6rem' }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.67rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{s.tag}</span>
                </div>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: BLUE }}>{s.icon}</div>
              </div>
              <div style={{ padding: '1.4rem' }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#f0f0f5', margin: '0 0 0.65rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: '#6b6b88', lineHeight: 1.72, margin: '0 0 1.1rem' }}>{s.desc}</p>
                <button onClick={scrollToCta} style={{ background: 'none', border: 'none', color: BLUE, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'gap 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.gap = '0.65rem')}
                  onMouseLeave={e => (e.currentTarget.style.gap = '0.4rem')}
                >
                  Richiedi consulenza <IconArrow />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Repair card */}
        <div className="service-card card-glass rg-repair"
          style={{ borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer', marginTop: '1.5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'all 0.65s ease 0.5s' }}
        >
          <div className="repair-img" style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#0f0f1a' }}>
            <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&h=440&fit=crop&auto=format" alt="Riparazione e upgrade PC" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,7,15,0.1), rgba(7,7,15,0.6))' }} />
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(139,92,246,0.9)', borderRadius: '0.3rem', padding: '0.18rem 0.6rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.67rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Assistenza</span>
            </div>
          </div>
          <div style={{ padding: '1.75rem 2rem' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#f0f0f5', margin: '0 0 0.8rem', letterSpacing: '-0.02em' }}>
              PC lento o con problemi? Dagli una seconda vita.
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#6b6b88', lineHeight: 1.75, margin: '0 0 1.4rem' }}>
              Non sempre serve comprare un PC nuovo. Diagnostichiamo il problema, sostituiamo i componenti usurati e riportiamo il tuo computer a piena velocità — a una frazione del costo di uno nuovo.
            </p>
            <button onClick={scrollToCta} style={{ background: 'none', border: 'none', color: BLUE, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.87rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, transition: 'gap 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.gap = '0.65rem')}
              onMouseLeave={e => (e.currentTarget.style.gap = '0.4rem')}
            >
              Scopri il servizio <IconArrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Process ────────────────────────────────────────────────────
function Process() {
  const { ref, inView } = useInView(0.1)
  const steps = [
    { num: '01', title: 'Analisi delle esigenze', desc: 'Ti ascoltiamo e capiamo esattamente come utilizzerai il computer. Partiamo da te, non dalle schede tecniche.' },
    { num: '02', title: 'Progettazione configurazione', desc: 'Selezioniamo i componenti migliori per le tue esigenze e il tuo budget. Nessun componente in eccesso.' },
    { num: '03', title: 'Assemblaggio e test', desc: "Il tuo PC viene assemblato con cura professionale e sottoposto a test completi prima di essere consegnato." },
    { num: '04', title: 'Consegna e installazione', desc: 'Portiamo il PC direttamente a casa tua, configuriamo il sistema operativo e ti guidiamo nel primo utilizzo.' },
  ]

  return (
    <section id="processo" className="section-pad" style={{ position: 'relative', background: 'linear-gradient(180deg, #07070f 0%, #0d0d1f 50%, #07070f 100%)' }}>
      <div className="noise-overlay" />
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '350px', height: '500px', background: 'radial-gradient(ellipse at right, rgba(43,127,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', gap: '4rem' }} className="rg-2">
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '0.9rem' }}>COME FUNZIONA</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', color: '#f0f0f5', margin: '0 0 1.25rem' }}>
            Dal primo contatto al computer acceso
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6b6b88', lineHeight: 1.72, margin: '0 0 2rem' }}>
            Un percorso semplice e trasparente. Ti seguiamo in ogni fase, dalla consulenza iniziale fino all'installazione a casa tua.
          </p>
          <button className="btn-primary" onClick={scrollToCta} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            Richiedi consulenza gratuita <IconArrow />
          </button>
        </div>

        <div>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: '1.25rem', position: 'relative', paddingBottom: i < steps.length - 1 ? '2rem' : 0, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition: `all 0.6s ease ${i * 0.1 + 0.2}s` }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.82rem', color: BLUE }}>{step.num}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: '1px', flex: 1, marginTop: '0.6rem', background: 'linear-gradient(to bottom, rgba(43,127,255,0.28), rgba(43,127,255,0.04))' }} />}
              </div>
              <div style={{ paddingTop: '0.6rem', paddingBottom: i < steps.length - 1 ? '0.75rem' : 0 }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#f0f0f5', margin: '0 0 0.45rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: '#6b6b88', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Audiences (link alle landing) ─────────────────────────────
function Audiences() {
  const { ref, inView } = useInView()
  const ORANGE = '#ff7a1f'
  const items = [
    {
      tag: 'Aziende e studi',
      title: "L'informatica della tua azienda, gestita da noi",
      desc: 'Assistenza, sicurezza, backup, account di posta, accessi e rete. Un unico referente per computer e server, e un piano per ripartire se qualcosa si ferma.',
      cta: 'Scopri i servizi per le aziende',
      href: '/lan1/',
      color: BLUE,
    },
    {
      tag: 'Privati e gamer',
      title: 'PC lento, console che scalda, Wi-Fi che non prende?',
      desc: 'Upgrade, pulizia, pasta termica, modding Nintendo Switch e assistenza remota. Ti diciamo cosa serve davvero, anche se significa spendere meno.',
      cta: 'Scopri i servizi per i privati',
      href: '/lan2/',
      color: ORANGE,
    },
  ]

  return (
    <section id="per-chi" className="section-pad" style={{ position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '0.9rem' }}>PER CHI LAVORIAMO</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', color: '#f0f0f5', margin: '0 0 1rem' }}>
            Non solo PC su misura
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6b6b88', maxWidth: '540px', margin: '0 auto', lineHeight: 1.72 }}>
            Seguiamo aziende e privati su tutto quello che riguarda l'informatica. Scegli la strada che ti riguarda.
          </p>
        </div>

        <div className="rg-cards-2">
          {items.map((it, i) => (
            <a key={it.href} href={it.href} className="service-card card-glass"
              style={{ display: 'block', textDecoration: 'none', borderRadius: '1rem', padding: '2rem', borderTop: `3px solid ${it.color}`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: `all 0.65s ease ${i * 0.1 + 0.15}s` }}
            >
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: it.color, marginBottom: '0.8rem' }}>{it.tag}</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#f0f0f5', margin: '0 0 0.75rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{it.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#6b6b88', lineHeight: 1.72, margin: '0 0 1.4rem' }}>{it.desc}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: it.color, fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
                {it.cta} <IconArrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Section ────────────────────────────────────────────────
function CtaSection() {
  const { ref, inView } = useInView()
  return (
    <section id="cta-final" className="section-pad-sm" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div ref={ref} style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', padding: 'clamp(2rem, 6vw, 4rem)', background: 'linear-gradient(135deg, rgba(43,127,255,0.14) 0%, rgba(43,127,255,0.05) 50%, rgba(15,15,26,0.9) 100%)', border: '1px solid rgba(43,127,255,0.22)', textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'all 0.8s ease' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, rgba(43,127,255,0.18), transparent 65%)', pointerEvents: 'none' }} />
          <div className="noise-overlay" />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE, marginBottom: '1rem' }}>INIZIA OGGI</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 5vw, 3rem)', letterSpacing: '-0.03em', color: '#f0f0f5', margin: '0 0 0.9rem', lineHeight: 1.08 }}>
              Non sai quale PC scegliere?
              <br /><span style={{ background: 'linear-gradient(135deg, #2b7fff, #88ccff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ti aiutiamo noi.</span>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6b6b88', margin: '0 auto 2rem', maxWidth: '480px', lineHeight: 1.72 }}>
              Una consulenza gratuita di 20 minuti è sufficiente per capire esattamente di quale computer hai bisogno. Senza impegno.
            </p>
            {/* Contact options — no clickable CTA button */}
            <div className="cta-row" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+393756708997" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.35)', borderRadius: '0.5rem', padding: '0.9rem 1.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,127,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(43,127,255,0.1)'; e.currentTarget.style.transform = 'none' }}
              >
                <IconPhone /> +39 375 670 8997
              </a>
              <a href="mailto:pcsumisura.info@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.35)', borderRadius: '0.5rem', padding: '0.9rem 1.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,127,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(43,127,255,0.1)'; e.currentTarget.style.transform = 'none' }}
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

// ── Home page ──────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ background: '#07070f', minHeight: '100vh' }}>
      <Navbar onNavigate={onNavigate} />
      <Hero />
      <Services />
      <Process />
      <Audiences />
      <CtaSection />
      <Footer onNavigate={onNavigate} accent={BLUE} />
    </div>
  )
}

// ── Router ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home')

  if (page === 'computer') return <Computer onNavigate={setPage} />
  if (page === 'assistenza') return <Assistenza onNavigate={setPage} />
  return <HomePage onNavigate={setPage} />
}
