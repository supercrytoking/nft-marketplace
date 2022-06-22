import Link from 'next/link'
import Web3 from 'web3'
import { imageUrl } from '../utils/utils'
import LazyLoad from 'react-lazyload'
import { useState } from 'react'
import classNames from 'classnames'

export default function ImageBox({ nft }) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    return (
        <LazyLoad height={200}>
            <>
                <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`} >
                    <a className={classNames("group relative bg-white bg-opacity-5 border border-white border-opacity-10 rounded overflow-hidden flex items-center justify-center", error && 'bg-red-500 border-red-500', !error && !loaded && 'animate-pulse')} style={{ minHeight: '8em' }}>
                        <div className='absolute inset-0 z-20 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition pointer-events-none'>
                            <div className='p-4 flex items-start justify-start gap-4 flex-wrap'>
                                <p className='bg-white text-black p-2'>{nft.metadata.name}</p>
                                {nft?.listing && <><p className='bg-white text-black p-2'>{nft?.listing?.status === 'listed' ? `${Web3.utils.fromWei(nft?.listing?.price)} FTM` : nft?.listing?.status}</p></>}
                            </div>
                        </div>

                        {error && <p className='max-w-sm mx-auto text-red-500 bg-pacity-25 flex flex-col gap-2 text-center p-6'>
                            <span>
                                <span>😕 Loading Error</span>
                            </span>
                            <span className='text-xs'>This file may be an unknown format or an incompatible contract. Consult support.</span>
                            <a onClick={e => e.stopPropagation()} className='underline hover:no-underline opacity-75 hover:opacity-100' target={"_blank"} href={nft.tokenUri}>View Metadata</a>
                        </p>}

                        <img loading="lazy" onLoad={() => setLoaded(true)} onError={() => setError(true)} className={classNames('max-h-full min-w-full object-contain', error && 'hidden')} src={imageUrl(nft.metadata.image)} />
                    </a>
                </Link>
            </>
        </LazyLoad>
    )
}
