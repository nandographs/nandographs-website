import { useEffect, useRef, useState } from 'react'
import { BlurIn } from '../components/ui/blur-in'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

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
    { link: '/waterfall', img: '/images/WATERFALL/CAPA-WATERFALL.jpg', title: 'Waterfall Company Brazil', tag: 'Brand Identity' },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
    const ref = useReveal<HTMLAnchorElement>()
    return (
        <Link ref={ref} to={project.link} className={`project-card reveal reveal-delay-${(index % 4) + 1}`}>
            <img src={project.img} alt={project.title} loading="lazy" />
            <div className="project-overlay">
                <h3>{project.title}</h3>
                <span>{project.tag}</span>
            </div>
        </Link>
    )
}

function Projects() {
    const ref = useReveal<HTMLElement>()

    return (
        <section className="projects" id="projetos" ref={ref}>
            <div className="container reveal" ref={useReveal<HTMLDivElement>()}>
                <p className="section-label">Projetos Selecionados</p>
                <div className="projects-grid">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={i} index={i} project={p} />
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
                        <img
                            src="/images/nando-profile.jpg"
                            alt="Nando"
                        />
                    </div>
                    <div className="about-manifesto reveal reveal-delay-1" ref={useReveal<HTMLDivElement>()}>
                        <h2>Olá, sou o Nando.</h2>
                        <p>
                            Acredito que marcas fortes não nascem na superfície. Elas começam no invisível, na intenção, no fundamento. Antes de pensar na forma, eu busco entender a essência.
                            <br /><br />
                            Meu trabalho é construir identidades visuais com profundidade. Cada projeto passa por pesquisa, estratégia e direção clara. Não é apenas estética. É estrutura que sustenta presença, gera confiança e faz sentido no longo prazo.
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
        title: 'Kai',
        desc: 'Todo projeto começa com um mergulho. Aqui eu analiso a marca, o mercado, o público e os concorrentes. É o momento de observar, questionar e entender o cenário completo. Antes da forma, vem a compreensão.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Shin',
        desc: 'Com o contexto claro, aprofundamos. Organizo os insights e defino a direção estratégica da marca. Posicionamento, proposta de valor e personalidade começam a ganhar forma. Aqui encontramos o que realmente sustenta a identidade.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Zou',
        desc: 'Com base definida, começo a criar. Exploro formas, tipografia, cores e sistema visual. Rascunho, testo e lapido até que a solução represente com clareza a estratégia. Nada é aleatório. Tudo tem intenção.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'Mei',
        desc: 'Apresento o projeto mostrando aplicações reais e explicando cada decisão. A marca deixa de ser conceito e se torna presença. É o momento de enxergar o todo com clareza.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        num: '05',
        title: 'Kan',
        desc: 'Finalizamos com organização e direção. Entrego os arquivos e o manual de uso para garantir consistência na aplicação. Uma marca forte precisa de fundamento para permanecer.',
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
                <div className="methodology-list">
                    {METHODS.map((m, i) => (
                        <MethodRow key={i} {...m} delay={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function MethodRow({ num, title, desc, icon, delay }: {
    num: string; title: string; desc: string; icon: React.ReactNode; delay: number
}) {
    const ref = useReveal<HTMLDivElement>()
    return (
        <div className={`method-row reveal reveal-delay-${delay + 1}`} ref={ref}>
            <div className="row-number">{num}</div>
            <div className="row-content">
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
            <div className="row-icon">{icon}</div>
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
                    <a href="https://wa.me/554792330354" target="_blank" rel="noopener noreferrer" className="cta-link">
                        Vamos conversar <span className="arrow">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export function Home() {
    return (
        <main>
            <Hero />
            <Projects />
            <About />
            <Methodology />
            <CTA />
        </main>
    )
}
