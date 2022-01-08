import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import TrackVisibility from 'react-on-screen'
import { cacheImage } from '../utils/utils'

export default function ImageBox({ nft }) {
    return (
        <LazyLoad once>
            <TrackVisibility>
                {({ isVisible }) => (
                    <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
                        <a className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center h-full" style={{ minHeight: '24rem' }}>
                            {isVisible ? 'y' : 'n'}
                            <img
                                className=""
                                src={cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))}
                                onError={(e) => {
                                    setTimeout(() => {
                                        if (isVisible) e.target.src += `?${+new Date()}`
                                    }, 1000)
                                }}
                                alt=""
                            />
                        </a>
                    </Link>
                )}
            </TrackVisibility>
        </LazyLoad>
    )
}
