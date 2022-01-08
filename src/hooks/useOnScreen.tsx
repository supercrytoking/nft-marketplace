import { useEffect, useState } from 'react'

export default function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

    useEffect(() => {
        if (!ref.current) return
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return isIntersecting
}
