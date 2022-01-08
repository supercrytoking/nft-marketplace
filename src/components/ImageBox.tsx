import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { cacheImage } from '../utils/utils'

export default function ImageBox({ nft }) {
    const [isLoaded, setIsLoaded] = useState(false)

    const ref = useRef()

    useEffect(() => {
        if (isLoaded) return
        if (!ref) return

        const timer = setInterval(() => {
            if (!ref.current) return
            ref.current.src += `?random=${Date.now()}`
        }, 2000)
        return () => clearInterval(timer)
    }, [isLoaded, ref])

    return (
        <>
            <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
                <a className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center h-full" style={{ minHeight: '24rem' }}>
                    <LazyLoad>
                        <img ref={ref} className="" src={cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))} onLoad={() => setIsLoaded(true)} onError={(e) => setIsLoaded(false)} alt="" />
                    </LazyLoad>
                </a>
            </Link>
        </>
    )
}
