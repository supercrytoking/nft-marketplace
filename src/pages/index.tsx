import useSWR from 'swr'
import Link from 'next/link'
import { formatPricing } from '../utils/utils'

export default function IndexPage() {
    const { data: listings } = useSWR('/listings')

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listings?.map((listing) => (
                    <Link href={`/${listing.contractAddress}/${listing.tokenId}`}>
                        <a className="block">
                            <img src={listing.metadata} alt="" />
                            <div className="bg-white text-black p-2">
                                <p>{listing.metadata.name}</p>
                                <p className="text-xs opacity-50">{formatPricing(listing.listing.price)}</p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    )
}
