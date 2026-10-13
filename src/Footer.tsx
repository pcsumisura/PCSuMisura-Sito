export type Page = 'home' | 'computer' | 'assistenza'

interface FooterProps {
  onNavigate: (page: Page) => void
  accent?: string
}

function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.77 2.01z"/>
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

export default function Footer({ onNavigate, accent = '#2b7fff' }: FooterProps) {
  const navPages: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Computer', page: 'computer' },
    { label: 'Assistenza & Servizi', page: 'assistenza' },
  ]
  const landingLinks: { label: string; href: string }[] = [
    { label: 'Per le aziende', href: '/lan1/' },
    { label: 'Per i privati', href: '/lan2/' },
  ]

  return (
    <footer style={{ background: '#040408', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 1.25rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="rg-footer">
          {/* Brand */}
          <div>
            <button
              onClick={() => onNavigate('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '1rem' }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, boxShadow: `0 0 12px ${accent}` }} />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#f0f0f5' }}>
                PC su Misura<span style={{ color: accent }}>.</span>
              </span>
            </button>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.84rem', color: '#4a4a68', lineHeight: 1.7, maxWidth: '300px', margin: '0 0 1.25rem' }}>
              Progettiamo e assembliamo PC personalizzati per ogni esigenza. Dalla consulenza alla consegna a domicilio.
            </p>
            <a href="tel:+393756708997" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: accent, textDecoration: 'none', marginBottom: '0.45rem' }}>
              <IconPhone /> +39 375 670 8997
            </a>
            <a href="mailto:pcsumisura.info@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: accent, textDecoration: 'none' }}>
              <IconMail /> pcsumisura.info@gmail.com
            </a>
          </div>

          {/* Pages */}
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.73rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#6b6b88', marginBottom: '1.25rem' }}>
              Pagine
            </div>
            {navPages.map(l => (
              <button key={l.label} onClick={() => onNavigate(l.page)}
                style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', color: '#4a4a68', textAlign: 'left', padding: '0.3rem 0', transition: 'color 0.2s', width: '100%' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a0a0b8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4a4a68')}
              >{l.label}</button>
            ))}
            {landingLinks.map(l => (
              <a key={l.href} href={l.href}
                style={{ display: 'block', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', color: '#4a4a68', textAlign: 'left', padding: '0.3rem 0', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a0a0b8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4a4a68')}
              >{l.label}</a>
            ))}
          </div>

          {/* Hours */}
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.73rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#6b6b88', marginBottom: '1.25rem' }}>
              Orari
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.84rem', color: '#6b6b88', lineHeight: 1.9 }}>
              <div style={{ color: '#a0a0b8', fontWeight: 500, fontFamily: 'Outfit, sans-serif' }}>Lun – Ven</div>
              <div>08:00 – 12:00</div>
              <div>13:30 – 18:00</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', color: '#2a2a40' }}>
            © 2026 PC su Misura. Tutti i diritti riservati.
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', color: '#2a2a40' }}>
            Privacy Policy · Cookie Policy
          </span>
        </div>
      </div>
    </footer>
  )
}
