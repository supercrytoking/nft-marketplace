import Link from 'next/link'
import { imageUrl } from '../utils/utils'

export default function ImageBox({ nft }) {
    return (
        <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
            <a className="block bg-white bg-opacity-5 border border-white border-opacity-10 rounded overflow-hidden flex items-center justify-center">
                <img className='w-full' src={imageUrl(nft.metadata.image)} alt="" />
            </a>
        </Link>
    )
}
