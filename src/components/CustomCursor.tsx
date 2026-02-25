import { useEffect, useRef } from 'react'

export function CustomCursor() {
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

        // Observe changes to the DOM to re-apply hover listeners (for client-side routing)
        const observer = new MutationObserver(() => {
            addHoverListeners()
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            cancelAnimationFrame(animId)
            clearTimeout(timeoutId)
            observer.disconnect()
        }
    }, [])

    return <div className="custom-cursor" ref={cursorRef} />
}
