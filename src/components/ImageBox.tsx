import Link from 'next/link'
import Web3 from 'web3'
import { imageUrl } from '../utils/utils'
import LazyLoad from 'react-lazyload'

export default function ImageBox({ nft }) {
    return (
        // <LazyLoad>
        <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`} >
            <a className="group relative bg-white bg-opacity-5 border border-white border-opacity-10 rounded overflow-hidden flex items-center justify-center" style={{ minHeight: '8em' }}>
                <div className='absolute inset-0 z-20 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition'>
                    <div className='p-4 flex items-start justify-start gap-4 flex-wrap'>
                        <p className='bg-white text-black p-2'>{nft.metadata.name}</p>
                        {nft?.listing && <><p className='bg-white text-black p-2'>{nft?.listing?.status === 'listed' ? `${Web3.utils.fromWei(nft?.listing?.price)} FTM` : nft?.listing?.status}</p></>}
                    </div>
                </div>
                <img className='max-h-full min-w-full object-contain' style={{}} src={imageUrl(nft.metadata.image)} alt="" />
            </a>
        </Link >
        // </LazyLoad>
    )
}
