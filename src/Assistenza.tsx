import { useState, useEffect, useRef } from 'react'
import Footer, { type Page } from './Footer'

const GREEN = '#10b981'
const BG    = '#060e0a'
const FG    = '#f0f0f5'
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
  document.getElementById('cta-assistenza')?.scrollIntoView({ behavior: 'smooth' })
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

  const anchors = [
    { label: 'Servizi', href: '#servizi' },
    { label: 'Come Lavoriamo', href: '#processo' },
  ]

  const navStyle: React.CSSProperties = { fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '0.88rem', color: '#a0a0b8', textDecoration: 'none', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.4s ease', background: scrolled ? 'rgba(7,7,15,0.94)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <button onClick={() => onNavigate('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: GREEN, boxShadow: `0 0 12px ${GREEN}` }} />
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: FG }}>
            PC su Misura<span style={{ color: GREEN }}>.</span>
          </span>
        </button>

        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {anchors.map(l => (
            <a key={l.label} href={l.href} style={navStyle}
              onMouseEnter={e => (e.currentTarget.style.color = FG)}
              onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
            >{l.label}</a>
          ))}
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3a3a55' }} />
          <button onClick={() => onNavigate('computer')} style={navStyle}
            onMouseEnter={e => (e.currentTarget.style.color = FG)}
            onMouseLeave={e => (e.currentTarget.style.color = '#a0a0b8')}
          >Computer</button>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
          <a href="tel:+3903311090522" className="nav-cta-phone" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: GREEN, textDecoration: 'none' }}>
            <IconPhone /> Chiamaci
          </a>
          <button className="btn-primary" onClick={scrollToCta} style={{ fontSize: '0.83rem', padding: '0.58rem 1.15rem', background: GREEN, animation: 'none', boxShadow: `0 0 20px ${GREEN}44` }}>
            Richiedi assistenza
          </button>
          <button onClick={() => setOpen(!open)} className="nav-hamburger" style={{ background: 'none', border: 'none', color: FG, cursor: 'pointer', padding: '0.25rem' }}>
            {open ? <IconXClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: 'rgba(7,7,15,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
          {anchors.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', textDecoration: 'none', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ height: '1px', background: `rgba(16,185,129,0.2)`, margin: '0.5rem 0' }} />
          <button onClick={() => { onNavigate('computer'); setOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1rem', color: '#e0e0f0', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
            Computer
          </button>
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
            <a href="tel:+3903311090522" className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              <IconPhone /> Chiamaci
            </a>
            <button onClick={() => { scrollToCta(); setOpen(false) }} style={{ flex: 1, background: GREEN, color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', padding: '0.8rem 1rem' }}>
              Assistenza
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
    <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '68px' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '-80px', right: '-100px', width: '580px', height: '580px', borderRadius: '50%', background: `radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div className="noise-overlay" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.25rem', width: '100%' }} className="rg-2">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)', borderRadius: '2rem', padding: '0.3rem 0.9rem', marginBottom: '1.6rem', opacity: 0, animation: 'fadeInUp 0.6s ease 0.1s forwards' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.73rem', fontWeight: 700, color: GREEN, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Assistenza & Servizi Tecnici</span>
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: FG, margin: 0, opacity: 0, animation: 'fadeInUp 0.7s ease 0.2s forwards' }}>
            Il tuo PC può ancora{' '}
            <span style={{ background: `linear-gradient(135deg, ${GREEN}, #6ee7b7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              dare molto di più
            </span>
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.72, color: MUTED, margin: '1.5rem 0 2.25rem', maxWidth: '490px', opacity: 0, animation: 'fadeInUp 0.7s ease 0.32s forwards' }}>
            Upgrade hardware, ottimizzazione del sistema, networking e assistenza tecnica remota. Valorizziamo ciò che hai già prima di pensare a qualcosa di nuovo.
          </p>

          <div className="cta-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeInUp 0.7s ease 0.44s forwards' }}>
            <button onClick={scrollToCta} style={{ background: GREEN, color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.25s ease', boxShadow: `0 0 24px ${GREEN}44` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 32px ${GREEN}55` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 0 24px ${GREEN}44` }}
            >
              Richiedi assistenza <IconArrow />
            </button>
            <a href="tel:+3903311090522" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none' }}>
              <IconPhone /> Parla con un tecnico
            </a>
          </div>
        </div>

        <div style={{ position: 'relative', opacity: 0, animation: 'fadeIn 1s ease 0.35s forwards' }}>
          <div style={{ position: 'absolute', inset: '-14px', borderRadius: '1.4rem', background: `linear-gradient(135deg, rgba(16,185,129,0.15), transparent 60%)`, zIndex: 0 }} />
          <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', border: `1px solid rgba(16,185,129,0.18)`, boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 50px rgba(16,185,129,0.08)` }}>
            <img src="https://images.unsplash.com/photo-1632749042303-7f7a18ed6ff0?w=720&h=480&fit=crop&auto=format" alt="PC con LED verdi, componenti illuminati" className="hero-img" style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,15,0.5) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: 'rgba(7,7,15,0.85)', backdropFilter: 'blur(12px)', border: `1px solid rgba(16,185,129,0.25)`, borderRadius: '0.65rem', padding: '0.65rem 1.1rem' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.82rem', color: GREEN }}>Diagnosi gratuita</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: MUTED, marginTop: '0.1rem' }}>Valutiamo prima, interveniamo dopo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Services Grid ──────────────────────────────────────────────
const SERVICES = [
  {
    icon: '⚡',
    title: 'Upgrade RAM',
    tag: 'Hardware',
    desc: 'Più memoria significa più velocità nella gestione di più programmi aperti contemporaneamente. Selezioniamo il kit compatibile e lo installiamo.',
    details: ['Verifica compatibilità', 'Installazione e test', 'Ottimizzazione profili XMP/EXPO'],
  },
  {
    icon: '💾',
    title: 'Upgrade SSD',
    tag: 'Hardware',
    desc: "Sostituiamo il vecchio disco con un SSD NVMe o SATA. Avvio in pochi secondi, maggiore reattività e migliore esperienza quotidiana.",
    details: ['Clonazione dati inclusa', 'Installazione e configurazione', 'Test di velocità e integrità'],
  },
  {
    icon: '🎮',
    title: 'Upgrade Scheda Video',
    tag: 'Hardware',
    desc: 'Una GPU più potente per il gaming, per la creazione di contenuti o per accelerare software professionali. Verifichiamo compatibilità e alimentazione.',
    details: ['Verifica alimentatore', 'Installazione driver aggiornati', 'Benchmark performance'],
  },
  {
    icon: '🌡️',
    title: 'Cambio Pasta Termica',
    tag: 'Manutenzione',
    desc: 'La pasta termica si degrada nel tempo. Sostituzione professionale con prodotti di qualità per ridurre le temperature di CPU e GPU.',
    details: ['Pulizia residui esistenti', 'Applicazione professionale', 'Monitoraggio temperature'],
  },
  {
    icon: '🧹',
    title: 'Pulizia Hardware',
    tag: 'Manutenzione',
    desc: 'Polvere e residui aumentano le temperature e riducono la vita dei componenti. Pulizia completa interna con strumenti professionali.',
    details: ['Smontaggio e pulizia completa', 'Sostituzione pasta termica', 'Test stabilità post-pulizia'],
  },
  {
    icon: '🪟',
    title: 'Ottimizzazione Windows',
    tag: 'Software',
    desc: 'Sistema lento, startup lento, programmi inutili? Ottimizziamo Windows per renderlo veloce, stabile e sicuro come al primo giorno.',
    details: ['Rimozione bloatware', 'Ottimizzazione avvio e servizi', 'Aggiornamento driver e Windows'],
  },
  {
    icon: '🌐',
    title: 'Networking',
    tag: 'Reti',
    desc: 'Configurazione di reti domestiche e aziendali. Switch, NAS, firewall, access point Wi-Fi, VPN e condivisione risorse in rete locale.',
    details: ['Switch e cablaggio strutturato', 'NAS e storage di rete', 'Firewall, Wi-Fi e VPN'],
  },
  {
    icon: '🖥️',
    title: 'Assistenza Remota',
    tag: 'Supporto',
    desc: "Supporto tecnico rapido senza spostamenti. Ci colleghiamo al tuo computer e risolviamo il problema in tempo reale, ovunque tu sia.",
    details: ['Connessione sicura cifrata', 'Risoluzione problemi software', 'Guida e formazione inclusa'],
  },
]

const TAG_COLORS: Record<string, string> = {
  Hardware: GREEN,
  Manutenzione: '#f59e0b',
  Software: '#8b5cf6',
  Reti: '#3b82f6',
  Supporto: '#06b6d4',
}

function ServicesSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="servizi" className="section-pad" style={{ position: 'relative' }}>
      <div className="noise-overlay" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN, marginBottom: '0.9rem' }}>I NOSTRI SERVIZI</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', color: FG, margin: '0 0 1rem' }}>Tutto ciò di cui il tuo PC ha bisogno</h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: MUTED, maxWidth: '500px', margin: '0 auto', lineHeight: 1.72 }}>
            Dalla piccola manutenzione al potenziamento completo, agli interventi tecnici professionali.
          </p>
        </div>

        <div className="rg-cards-3" style={{ marginBottom: '1.5rem' }}>
          {SERVICES.slice(0, 6).map((s, i) => (
            <div key={s.title} className="card-glass service-card"
              style={{ borderRadius: '1rem', padding: '1.5rem', position: 'relative', overflow: 'hidden', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: `all 0.6s ease ${i * 0.08 + 0.15}s` }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${GREEN}, transparent)` }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
                <div style={{ fontSize: '1.6rem' }}>{s.icon}</div>
                <div style={{ background: TAG_COLORS[s.tag] || GREEN, opacity: 0.9, borderRadius: '0.28rem', padding: '0.15rem 0.55rem' }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{s.tag}</span>
                </div>
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: FG, margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: MUTED, lineHeight: 1.7, margin: '0 0 1.1rem' }}>{s.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {s.details.map(d => (
                  <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#a0a0b8' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Last 2 cards wider */}
        <div className="rg-cards-2">
          {SERVICES.slice(6).map((s, i) => (
            <div key={s.title} className="card-glass service-card"
              style={{ borderRadius: '1rem', padding: '1.6rem', position: 'relative', overflow: 'hidden', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: `all 0.6s ease ${i * 0.1 + 0.6}s` }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${TAG_COLORS[s.tag] || GREEN}, transparent)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: FG, margin: 0, letterSpacing: '-0.01em' }}>{s.title}</h3>
                    <div style={{ background: TAG_COLORS[s.tag] || GREEN, opacity: 0.9, borderRadius: '0.28rem', padding: '0.13rem 0.5rem' }}>
                      <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.63rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{s.tag}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: MUTED, lineHeight: 1.7, margin: '0 0 0.8rem' }}>{s.desc}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {s.details.map(d => (
                      <span key={d} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#a0a0b8', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2rem', padding: '0.2rem 0.65rem' }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Process ────────────────────────────────────────────────────
function Process() {
  const { ref, inView } = useInView(0.1)
  const steps = [
    { num: '01', title: 'Diagnosi gratuita', desc: 'Analizziamo il problema, verifichiamo i componenti e valutiamo gli interventi più efficaci e convenienti per te.' },
    { num: '02', title: 'Preventivo chiaro', desc: 'Ti forniamo un preventivo trasparente e dettagliato prima di iniziare qualsiasi intervento. Nessuna sorpresa.' },
    { num: '03', title: 'Intervento professionale', desc: "Eseguiamo il lavoro con componenti selezionati e strumenti professionali, nel pieno rispetto dell'hardware." },
    { num: '04', title: 'Verifica e assistenza', desc: "Test completi al termine dell'intervento. Sei sempre seguito, anche dopo che il lavoro è concluso." },
  ]

  return (
    <section id="processo" className="section-pad" style={{ position: 'relative', background: 'linear-gradient(180deg, #060e0a 0%, #081409 50%, #060e0a 100%)' }}>
      <div className="noise-overlay" />
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '350px', height: '500px', background: `radial-gradient(ellipse at left, rgba(16,185,129,0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', gap: '4rem' }} className="rg-2">
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN, marginBottom: '0.9rem' }}>COME LAVORIAMO</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', letterSpacing: '-0.03em', color: FG, margin: '0 0 1.1rem' }}>
            Trasparenza in ogni fase
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: MUTED, lineHeight: 1.72, margin: '0 0 2rem' }}>
            Nessuna spesa a sorpresa. Prima valutiamo, poi agiamo — sempre con il tuo consenso e nel rispetto del tuo budget.
          </p>
          <button onClick={scrollToCta} style={{ background: GREEN, color: '#fff', fontFamily: 'Outfit, sans-serif', fontWeight: 600, padding: '0.875rem 1.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.25s ease', boxShadow: `0 0 20px ${GREEN}33` }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${GREEN}44` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 0 20px ${GREEN}33` }}
          >
            Richiedi diagnosi gratuita <IconArrow />
          </button>
        </div>

        <div>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: '1.25rem', position: 'relative', paddingBottom: i < steps.length - 1 ? '2rem' : 0, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)', transition: `all 0.6s ease ${i * 0.1 + 0.2}s` }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: `1px solid rgba(16,185,129,0.28)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.82rem', color: GREEN }}>{step.num}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: '1px', flex: 1, marginTop: '0.6rem', background: `linear-gradient(to bottom, rgba(16,185,129,0.28), rgba(16,185,129,0.04))` }} />}
              </div>
              <div style={{ paddingTop: '0.6rem', paddingBottom: i < steps.length - 1 ? '0.75rem' : 0 }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: FG, margin: '0 0 0.45rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: MUTED, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Computer redirect banner ───────────────────────────────────
function ComputerBanner({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { ref, inView } = useInView()
  return (
    <section className="section-pad-sm" style={{ position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '1.1rem', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: FG, marginBottom: '0.3rem' }}>
                Stai cercando un computer nuovo progettato per le tue esigenze?
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.87rem', color: MUTED }}>
                Assembliamo PC personalizzati per gaming, lavoro, professioni creative e uso domestico.
              </div>
            </div>
            <button onClick={() => onNavigate('computer')} style={{ background: 'transparent', color: GREEN, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', border: `1px solid rgba(16,185,129,0.4)`, borderRadius: '0.5rem', padding: '0.75rem 1.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.25s ease', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none' }}
            >
              Vai alla sezione Computer <IconArrow />
            </button>
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
    <section id="cta-assistenza" className="section-pad" style={{ position: 'relative' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }}>
        <div ref={ref} style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', padding: 'clamp(2rem, 6vw, 4rem)', background: `linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.04) 50%, rgba(15,15,26,0.9) 100%)`, border: `1px solid rgba(16,185,129,0.22)`, textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'all 0.8s ease' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center top, rgba(16,185,129,0.15), transparent 65%)`, pointerEvents: 'none' }} />
          <div className="noise-overlay" />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-block', fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN, marginBottom: '1rem' }}>CONTATTACI ORA</div>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 5vw, 3rem)', letterSpacing: '-0.03em', color: FG, margin: '0 0 0.9rem', lineHeight: 1.08 }}>
              Hai un problema con il tuo PC?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: MUTED, margin: '0 auto 2rem', maxWidth: '460px', lineHeight: 1.72 }}>
              Descrivi il problema e ti aiutiamo subito. Diagnosi sempre gratuita, preventivo chiaro prima di qualsiasi intervento.
            </p>
            <div className="cta-row" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+3903311090522" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: `rgba(16,185,129,0.1)`, border: `1px solid rgba(16,185,129,0.35)`, borderRadius: '0.5rem', padding: '0.9rem 1.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)'; e.currentTarget.style.transform = 'none' }}
              >
                <IconPhone /> +39 0331 109 0522
              </a>
              <a href="mailto:pcsumisura.info@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: `rgba(16,185,129,0.1)`, border: `1px solid rgba(16,185,129,0.35)`, borderRadius: '0.5rem', padding: '0.9rem 1.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.1)'; e.currentTarget.style.transform = 'none' }}
              >
                <IconMail /> pcsumisura.info@gmail.com
              </a>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.77rem', color: '#3a3a58', marginTop: '1.25rem' }}>
              Risposta garantita entro 24 ore · Diagnosi sempre gratuita
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page root ──────────────────────────────────────────────────
export default function Assistenza({ onNavigate }: { onNavigate: (p: Page) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.background = '#060e0a'
    return () => { document.body.style.background = '' }
  }, [])
  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Navbar onNavigate={onNavigate} />
      <Hero />
      <ServicesSection />
      <Process />
      <ComputerBanner onNavigate={onNavigate} />
      <CtaSection />
      <Footer onNavigate={onNavigate} accent={GREEN} />
    </div>
  )
}
