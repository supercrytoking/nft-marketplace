import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import { cacheImage } from '../utils/utils'

export default function ImageBox({ nft }) {
    return (
        <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
            <a className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center">
                <LazyLoad once>
                    <img
                        className="w-full"
                        src={cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))}
                        onError={(e) => {
                            setTimeout(() => {
                                e.target.src += `?${+new Date()}`
                            }, 1000)
                        }}
                        alt=""
                    />
                </LazyLoad>
            </a>
        </Link>
    )
}
