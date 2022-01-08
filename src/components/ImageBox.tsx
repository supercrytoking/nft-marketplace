import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LazyLoad from 'react-lazyload'
import useOnScreen from '../hooks/useOnScreen'
import { cacheImage } from '../utils/utils'

export default function ImageBox({ nft }) {
    const baseURL = cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))

    const [isLoaded, setIsLoaded] = useState(false)

    const boxRef = useRef()
    const ref = useRef()
    const isVisible = useOnScreen(boxRef)

    useEffect(() => {
        if (isLoaded) return
        if (!ref) return

        const timer = setInterval(() => {
            if (!ref.current) return
            console.log('Trying to load again...', nft.contractAddress, nft.tokenId)
            ref.current.src = ref.current.src
        }, 1000)
        return () => clearInterval(timer)
    }, [isLoaded, ref])

    useEffect(() => {
        if (!ref.current) return
        if (isLoaded) return
        if (!isVisible) ref.current.src = ''
        if (isVisible) ref.current.src = baseURL
    }, [ref, isVisible, isLoaded])

    return (
        <>
            <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
                <a ref={boxRef} className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center h-full" style={{ minHeight: '24rem' }}>
                    <img ref={ref} className="" src={baseURL} onLoad={() => setIsLoaded(true)} onError={(e) => setIsLoaded(false)} alt="" />
                </a>
            </Link>
        </>
    )
}
