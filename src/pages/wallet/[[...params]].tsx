import useSWR from 'swr'
import { useWallet } from 'use-wallet'

import Link from 'next/link'
import lodash from 'lodash'
import { useEffect, useState } from 'react'
import ReactTyped from 'react-typed'
import Web3 from 'web3'
import Button from '../../components/Button'
import ImageBox from '../../components/ImageBox'
import NFTGroup from '../../components/NFTGroup'
import classNames from 'classnames'
import TokenMasonry from '../../components/TokenMasonry'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Wallet({ params }) {
    const wallet = useWallet()

    const address = params ? params[0] : wallet.account
    const isAddress = Web3.utils.isAddress(address)
    const isSearching = params && params[0]

    const [showCollections, setShowCollections] = useState(true)

    const { data: unsortedData, error } = useSWR(isAddress ? `/data/wallet/${address}` : null)
    const data = unsortedData?.sort((a, b) => (new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)))

    const _grouped = data?.reduce(function (r, a) {
        const contractAddress = Web3.utils.toChecksumAddress(a.contractAddress)
        r[contractAddress] = r[contractAddress] || [];
        r[contractAddress].push(a);
        return r;
    }, Object.create(null))

    const grouped = _grouped && Object.keys(_grouped).map((key) => _grouped[key]).sort((a, b) => {
        console.log(a[0].contract.name, b[0].contract.name)
        return a[0].contract.name.localeCompare(b[0].contract.name)
    })

    useEffect(() => console.log(grouped), [grouped])

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12 w-full">
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
                <>
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

                    <div>
                        <div className="flex-1 flex gap-4">
                            <Button className={classNames(showCollections && 'bg-blue-500')} onClick={() => setShowCollections(true)}>
                                Collections
                            </Button>

                            <Button className={classNames(!showCollections && 'bg-blue-500')} onClick={() => setShowCollections(false)}>
                                NFTs
                            </Button>
                        </div>
                    </div>
                </>
            )}

            {/* {data && <>
                <div className='grid grid-cols-12'>
                    {data.slice(0, 22).map((nft => <div>
                        <div className='square bg-cover bg-center' style={{ backgroundImage: `url("${nft.metadata.image}")` }} />
                    </div>))}
                </div>
            </>} */}


            {showCollections && <>
                {grouped && (
                    <div className='space-y-6'>
                        {grouped.map(group => {
                            return <NFTGroup items={group} />
                        })}
                    </div>
                )}
            </>}
            {!showCollections && <>
                {data && <TokenMasonry tokens={data} />}
            </>}
        </div>
    )
}
