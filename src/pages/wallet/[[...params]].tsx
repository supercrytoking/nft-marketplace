import useSWR from 'swr'
import { useWallet } from 'use-wallet'

import Link from 'next/link'
import Web3 from 'web3'
import ImageBox from '../../components/ImageBox'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Wallet({ params }) {
    const wallet = useWallet()

    const address = params ? params[0] : wallet.account
    const isAddress = Web3.utils.isAddress(address)
    const { data } = useSWR(isAddress ? `/data/wallet/${address}` : null)

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {!wallet.account && (
                <button onClick={() => wallet.connect()} type="button" className="px-4 py-2 bg-zinc-400 text-zinc-900">
                    Connect Wallet
                </button>
            )}

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((nft) => (
                        <ImageBox nft={nft} />
                    ))}
                </div>
            )}

            {wallet.account && (
                <div className="bg-zinc-400 text-zinc-900 p-6 flex items-center flex-wrap gap-6">
                    <p className="flex-1">Don't see all your NFTs? No problem.</p>
                    <Link href="/tools/indexr" passHref>
                        <a className="bg-zinc-900 text-zinc-400 px-4 py-2">Use the Indexer</a>
                    </Link>
                </div>
            )}
        </div>
    )
}
