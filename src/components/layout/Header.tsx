import { useEffect, useState, useCallback } from 'react'
import { HashLink } from 'react-router-hash-link'

export function Header() {
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
        { label: 'Home', href: '/#hero' },
        { label: 'Projetos', href: '/#projetos' },
        { label: 'Contato', href: '/#contato' },
    ]

    return (
        <>
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="container header-inner">
                    <HashLink smooth to="/#hero" className="logo">
                        <img src="/images/LOGOS-NANDOGRAPHS/logo-ngs-alt.png" alt="nandographs." className="header-logo-img" />
                    </HashLink>
                    <nav className="nav-links">
                        {links.map((l) => (
                            <HashLink smooth key={l.href} to={l.href}>{l.label}</HashLink>
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
                    <HashLink smooth key={l.href} to={l.href} onClick={closeMenu}>{l.label}</HashLink>
                ))}
            </div>
        </>
    )
}
