import { useEffect, useState } from 'react'

export default function useOnScreen(ref, rootMargin = '0px') {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false)
    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting)
            },
            {
                rootMargin
            }
        )
        observer.observe(ref.current)
        return () => {
            if (!ref.current) return
            observer.unobserve(ref.current)
        }
    }, [])
    return isIntersecting
}
