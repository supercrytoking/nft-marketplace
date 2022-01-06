import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'

const feeds = [
    {
        name: 'latest',
        query: '/feeds/latest'
    },
    {
        name: 'listed',
        query: '/feeds/listed'
    }
]

export default function Explore() {
    const [feed, setFeed] = useState(feeds[0])
    const { data } = useSWR(feed.query)

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-4">
                <button onClick={() => setFeed(feeds[0])} type="button" className="px-4 py-2 bg-white text-black">
                    Latest
                </button>
                <button onClick={() => setFeed(feeds[1])} type="button" className="px-4 py-2 bg-white text-black">
                    Listed
                </button>
            </div>

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {data.map((nft) => (
                        <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
                            <a className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center">
                                <img className="w-full" src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} alt="" />
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
