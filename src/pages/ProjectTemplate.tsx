import { useEffect } from 'react'
import { BlurIn } from '../components/ui/blur-in'
import '../project.css'

export function ProjectTemplate() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className="project-page">
            {/* 1. Capa do Projeto */}
            <section className="project-hero">
                <div className="project-hero-bg">
                    {/* Placeholder Hero Image */}
                    <img src="/images/WATERFALL/CAPA-WATERFALL.jpg" alt="Waterfall Project Hero" />
                </div>
                <div className="project-hero-content container">
                    <BlurIn word="Waterfall Company Brazil" className="project-title" duration={1} />
                </div>
            </section>

            {/* 2. Informações */}
            <section className="project-info-section container">
                <div className="project-info-grid">
                    <div className="info-meta">
                        <div className="meta-item">
                            <span className="meta-label">Cliente</span>
                            <span className="meta-value">Waterfall Company Brazil</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Ano</span>
                            <span className="meta-value">2024</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Serviços</span>
                            <span className="meta-value">Brand Identity, Strategy</span>
                        </div>
                    </div>

                    <div className="info-details">
                        <div className="detail-item">
                            <h3>Descrição</h3>
                            <p>O desafio da Waterfall Company Brazil foi desenhar uma marca que transmita confiança e fluidez, refletindo o nome e a sua atuação de mercado, focada em entregar soluções com excelência corporativa.</p>
                        </div>
                        <div className="detail-item">
                            <h3>Desafio</h3>
                            <p>Criamos um sistema visual completo com logotipo dinâmico e grafismos inspirados na força e no movimento das águas. Mantendo um ar maduro, tecnológico e sustentável ao longo do design do projeto e da tipografia escolhida.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Galeria de Imagens */}
            <section className="project-gallery container">
                <img src="/images/WATERFALL/LOGO-GIF.gif" alt="Logo GIF" className="gallery-img-full" />

                <img src="/images/WATERFALL/BANNER.jpg" alt="Banner" className="gallery-img-full" />

                <div className="gallery-grid-2">
                    <img src="/images/WATERFALL/PAINÉIS1.png" alt="Painel 1" />
                    <img src="/images/WATERFALL/PAINÉIS2.png" alt="Painel 2" />
                </div>

                <img src="/images/WATERFALL/01.gif" alt="Animation" className="gallery-img-full" />

                <div className="gallery-grid-2">
                    <img src="/images/WATERFALL/PAINÉIS4.png" alt="Painel 4" />
                    <img src="/images/WATERFALL/PAINÉIS5.png" alt="Painel 5" />
                </div>

                <img src="/images/WATERFALL/panel copiar.jpg" alt="Panel" className="gallery-img-full" />

                <img src="/images/WATERFALL/POSTERS.jpg" alt="Posters" className="gallery-img-full" />

                <img src="/images/WATERFALL/STATIONERY.jpg" alt="Stationery" className="gallery-img-full" />

                <img src="/images/WATERFALL/BADGE.jpg" alt="Badge" className="gallery-img-full" />
            </section>
        </main>
    )
}
