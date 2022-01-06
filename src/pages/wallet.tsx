import useSWR from 'swr'
import { useWallet } from 'use-wallet'

import Link from 'next/link'

export default function Wallet() {
    const wallet = useWallet()

    const { data } = useSWR(wallet.account ? `/data/wallet/${wallet.account}` : null)

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {!wallet.account && (
                <button onClick={() => wallet.connect()} type="button" className="px-4 py-2 bg-white text-black">
                    Connect Wallet
                </button>
            )}

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {data.map((nft) => (
                        <Link href={`/${nft.contractAddress}/${nft.tokenId}`}>
                            <a className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center">
                                <img className="w-full" src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} alt="" />
                            </a>
                        </Link>
                    ))}
                </div>
            )}

            {wallet.account && (
                <div className="bg-white text-black p-6 flex items-center flex-wrap gap-6">
                    <p className="flex-1">Don't see all your NFTs? No problem.</p>
                    <a href="" className="bg-black text-white px-4 py-2">
                        Use the Indexer
                    </a>
                </div>
            )}
        </div>
    )
}
