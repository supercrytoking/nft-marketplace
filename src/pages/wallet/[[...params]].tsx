import useSWR from 'swr'
import { useWallet } from 'use-wallet'

import Link from 'next/link'
import Web3 from 'web3'
import ReactTyped from 'react-typed'
import ImageBox from '../../components/ImageBox'
import Button from '../../components/Button'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Wallet({ params }) {
    const wallet = useWallet()

    const address = params ? params[0] : wallet.account
    const isAddress = Web3.utils.isAddress(address)
    const isSearching = params && params[0]

    const { data, error } = useSWR(isAddress ? `/data/wallet/${address}` : null)

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            {!isSearching && !wallet.account && (
                <button onClick={() => wallet.connect()} type="button" className="px-4 py-2 bg-zinc-400 text-zinc-900">
                    Connect Wallet
                </button>
            )}

            {!error && !data && (
                <div>
                    <p className="opacity-50">
                        <ReactTyped strings={['Loading...']} loop />
                    </p>
                </div>
            )}

            {error && (
                <div>
                    <p className="opacity-50">An error has occurred. Please check back in a few minutes.</p>
                </div>
            )}

            {data && (
                <div className="flex flex-wrap gap-6">
                    <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                            <p>
                                <a href={`https://ftmscan.com/address/${address}`} target="_blank" className="underline hover:no-underline" rel="noreferrer">
                                    {address.slice(0, 6)}
                                    ...
                                    {address.slice(-6)}
                                </a>
                            </p>
                            <p>{data.length} items</p>
                        </div>
                        {/* <div /> */}
                    </div>
                    {!isSearching && (
                        <div className="w-full md:w-auto">
                            <Link href="/create/import" passHref>
                                <a className="block">
                                    <Button>Import</Button>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((nft) => (
                        <ImageBox nft={nft} />
                    ))}
                </div>
            )}

            {/* {wallet.account && (
                <div className="bg-zinc-400 text-zinc-900 p-6 flex items-center flex-wrap gap-6">
                    <p className="flex-1">Don't see all your NFTs? No problem.</p>
                    <Link href="/tools/indexr" passHref>
                        <a className="bg-zinc-900 text-zinc-400 px-4 py-2">Use the Indexer</a>
                    </Link>
                </div>
            )} */}
        </div>
    )
}
