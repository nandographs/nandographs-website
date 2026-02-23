import { useEffect, useRef, useState, useCallback } from 'react'
import { BlurIn } from './components/ui/blur-in'
import { AnimatePresence } from 'framer-motion'
import './App.css'

/* ==========================================
   HERO BACKGROUND VIDEO
   ========================================== */
function HeroVideo() {
  return (
    <video
      className="hero-video"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      <source src="/images/xray-whale-bg.mp4" type="video/mp4" />
    </video>
  )
}

/* ==========================================
   SCROLL REVEAL HOOK
   ========================================== */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/* ==========================================
   SECTION COMPONENTS
   ========================================== */

// --- HEADER ---
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const links = [
    { label: 'Início', href: '#hero' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Contato', href: '#contato' },
  ]

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="container header-inner">
          <a href="#hero" className="logo">
            <img src="/images/LOGOS-NANDOGRAPHS/logo-ngs-alt.png" alt="nandographs." className="header-logo-img" />
          </a>
          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
          </button>
        </div>
      </header>
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
        ))}
      </div>
    </>
  )
}

// --- HERO ---
const HERO_PHRASES = [
  <>Deep calls to deep<span className="dot">.</span></>,
  <>Marcas fortes nascem no <span style={{ color: 'var(--accent)' }}>Profundo.</span></>
]

function Hero() {
  const ref = useReveal<HTMLDivElement>()
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length)
    }, 4500)
    return () => clearTimeout(interval)
  }, [phraseIndex])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <HeroVideo />
      </div>
      <div className="hero-content reveal" ref={ref}>
        <div style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <BlurIn
              key={phraseIndex}
              word={HERO_PHRASES[phraseIndex]}
              className="hero-title"
              duration={1}
            />
          </AnimatePresence>
        </div>
      </div>
      <div className="scroll-indicator">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

// --- PROJECTS ---
const PROJECTS = [
  { img: '/images/project-01.png', title: 'Aura Studio', tag: 'Brand Identity' },
  { img: '/images/project-02.png', title: 'Verde Vivo', tag: 'App & Branding' },
  { img: '/images/project-03.png', title: 'Ônix Co.', tag: 'Packaging Design' },
  { img: '/images/project-04.png', title: 'Nexus Digital', tag: 'Web & Visual Identity' },
]

function Projects() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="projects" id="projetos" ref={ref}>
      <div className="container reveal" ref={useReveal<HTMLDivElement>()}>
        <p className="section-label">Projetos Selecionados</p>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className={`project-card reveal reveal-delay-${(i % 4) + 1}`} key={i} ref={useReveal<HTMLDivElement>()}>
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="project-overlay">
                <h3>{p.title}</h3>
                <span>{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// --- ABOUT ---
function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="about" id="sobre" ref={ref}>
      <div className="container">
        <p className="section-label reveal" ref={useReveal<HTMLParagraphElement>()}>Perfil</p>
        <div className="about-grid">
          <div className="about-photo reveal" ref={useReveal<HTMLDivElement>()}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 900,
              color: 'rgba(43, 79, 255, 0.2)',
            }}>
              N
            </div>
          </div>
          <div className="about-manifesto reveal reveal-delay-1" ref={useReveal<HTMLDivElement>()}>
            <h2>Olá, sou o Nando.</h2>
            <p>
              Crio identidades visuais estratégicas para marcas que desejam se posicionar com
              autenticidade. Combino pesquisa, conceito e design para construir sistemas visuais
              que geram reconhecimento e confiança.
            </p>
            <div className="about-tags">
              <span>Brand Design</span>
              <span>Identidade Visual</span>
              <span>Direção Criativa</span>
              <span>Design Estratégico</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// --- METHODOLOGY ---
const METHODS = [
  {
    num: '01',
    title: 'Imersão',
    desc: 'Pesquiso o mercado, o público e a essência da marca. Entendo o contexto antes de criar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Conceito',
    desc: 'Defino o posicionamento, o tom de voz e a direção visual com base na pesquisa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Criação',
    desc: 'Desenvolvo o logotipo, a paleta, a tipografia e todos os elementos do sistema visual.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Entrega',
    desc: 'Organizo o brandbook completo e todos os arquivos para aplicação profissional.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

function Methodology() {
  return (
    <section className="methodology" id="metodologia">
      <div className="container">
        <p className="section-label reveal" ref={useReveal<HTMLParagraphElement>()}>Metodologia</p>
        <div className="methodology-intro reveal" ref={useReveal<HTMLDivElement>()}>
          <p>
            Para garantir a mensagem e o posicionamento certo, sigo uma metodologia que me permite
            fazer as perguntas certas para revelar as respostas certas.
          </p>
        </div>
        <div className="methodology-grid">
          {METHODS.map((m, i) => (
            <MethodCard key={i} {...m} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MethodCard({ num, title, desc, icon, delay }: {
  num: string; title: string; desc: string; icon: React.ReactNode; delay: number
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className={`method-card reveal reveal-delay-${delay + 1}`} ref={ref}>
      <div className="card-icon">{icon}</div>
      <span className="card-number">{num}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

// --- CTA ---
function CTA() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className="cta" id="contato" ref={ref}>
      <div className="container">
        <div className="cta-content reveal" ref={useReveal<HTMLDivElement>()}>
          <h2>
            Quer dar à sua marca uma identidade visual que realmente comunica quem você é?
          </h2>
          <a href="mailto:contato@nandographs.com" className="cta-link">
            Vamos conversar <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-title" aria-hidden="true">
          <img src="/images/LOGOS-NANDOGRAPHS/logo-ngs-light.png" alt="NANDOGRAPHS." className="footer-logo-img" />
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <p className="footer-copyright">© 2025 nandographs. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

/* ==========================================
   CUSTOM CURSOR
   ========================================== */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Hide on mobile/touch screens
    if (window.matchMedia('(max-width: 768px)').matches) {
      cursor.style.display = 'none'
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId: number
    const render = () => {
      // Lerp for smooth trailing effect
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`
      animId = requestAnimationFrame(render)
    }
    render()

    const onMouseDown = () => cursor.classList.add('clicked')
    const onMouseUp = () => cursor.classList.remove('clicked')

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Add classes for hover states on interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .project-card, .menu-toggle')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'))
      })
    }

    // Slight delay to ensure DOM is ready
    const timeoutId = setTimeout(addHoverListeners, 500)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animId)
      clearTimeout(timeoutId)
    }
  }, [])

  return <div className="custom-cursor" ref={cursorRef} />
}

/* ==========================================
   APP
   ========================================== */
export default function App() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Methodology />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
