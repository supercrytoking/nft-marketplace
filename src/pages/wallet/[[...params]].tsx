import useSWR from 'swr'
import { useWallet } from 'use-wallet'

import Link from 'next/link'
import lodash from 'lodash'
import { useEffect } from 'react'
import ReactTyped from 'react-typed'
import Web3 from 'web3'
import Button from '../../components/Button'
import ImageBox from '../../components/ImageBox'
import NFTGroup from '../../components/NFTGroup'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Wallet({ params }) {
    const wallet = useWallet()

    const address = params ? params[0] : wallet.account
    const isAddress = Web3.utils.isAddress(address)
    const isSearching = params && params[0]

    const { data: unsortedData, error } = useSWR(isAddress ? `/data/wallet/${address}` : null)
    const data = unsortedData?.sort((a, b) => (new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)))

    const grouped = data?.reduce(function (r, a) {
        r[a.contractAddress] = r[a.contractAddress] || [];
        r[a.contractAddress].push(a);
        return r;
    }, Object.create(null))

    useEffect(() => console.log(grouped), [grouped])

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            {!isSearching && !wallet.account && (
                <button onClick={() => wallet.connect()} type="button" className="px-4 py-2 bg-zinc-400 text-zinc-900">
                    Connect Wallet
                </button>
            )}

            {address && !error && !data && (
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

            {grouped && (
                <div className='space-y-12'>
                    {Object.keys(grouped)?.map(groupKey => {
                        const group = grouped[groupKey]
                        return <NFTGroup items={group} />
                    })}
                </div>
            )}
        </div>
    )
}
