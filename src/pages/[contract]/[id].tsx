import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import History from '../../components/History'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import useExchange from '../../hooks/useExchange'
import { api } from '../../utils/utils'

export async function getServerSideProps(ctx) {
    const { contract, id } = ctx.query
    const { data: staleData } = await api.get(`/data/${contract}/${id}`)
    return { props: { contract, id, staleData } }
}

export default function TokenPage({ contract, id, staleData }) {
    const wallet = useWallet()
    const { createListing: createListingFunction, acceptListing: acceptListingFunction, revokeListing: revokeListingFunction } = useExchange()
    const { data, mutate } = useSWR(`/data/${contract}/${id}`)

    const [showModal, setShowModal] = useState<false | 'list' | 'send'>(false)
    const [listingPrice, setListingPrice] = useState('')

    const image = data ? data.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : null
    const iAmOwner = data && data.owner === wallet.account
    const isListed = data && data.listings.length > 0 && data.listings[0].status === 'listed'

    const listing = data ? data.listings[0] : null

    const createListing = async () => {
        await createListingFunction(contract, id, Web3.utils.toWei(listingPrice))
        await mutate()
    }

    const acceptListing = async () => {
        await acceptListingFunction(contract, id, listingPrice)
        await mutate()
    }

    const revokeListing = async () => {
        await revokeListingFunction(contract, id)
        await mutate()
    }

    useEffect(() => {
        setListingPrice(data?.listing?.price)
    }, [data])

    if (!data) return null
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href={staleData.metadata.image} />
                <meta property="og:image" content={staleData.metadata.image} />
                <meta name="twitter:image" content={staleData.metadata.image} />
            </Head>
            <Modal visible={showModal === 'list'} onClose={() => setShowModal(false)}>
                <div className="space-y-4">
                    <Input label="Listing Price" value={listingPrice} onChange={(e) => setListingPrice(e.target.value)} type="number" />

                    <div className="flex gap-4 justify-end items-center">
                        <button className="bg-white text-black px-4 py-2" onClick={() => createListing()} type="submit">
                            List for Sale
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal visible={showModal === 'send'} onClose={() => setShowModal(false)}>
                <div className="space-y-4">
                    <Input label="Address" value={listingPrice} onChange={(e) => setListingPrice(e.target.value)} type="number" />

                    <div className="flex gap-4 justify-end items-center">
                        <button className="bg-white text-black px-4 py-2" onClick={() => {}} type="submit">
                            Send Now
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="flex justify-center">
                    <img className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden" src={image} alt="" />
                </div>

                <p className="text-3xl">{data.metadata.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            {data.metadata.description && <p>{data.metadata.description}</p>}
                            {!data.metadata.description && (
                                <p className="opacity-50">
                                    This token has no description. Here's some Lorem: Deserunt ullamco culpa non laboris minim. Eiusmod laboris eu nisi Lorem labore in eiusmod. Dolore sunt enim commodo pariatur ullamco
                                    enim pariatur sunt velit culpa.
                                </p>
                            )}
                        </div>
                        <div className="">
                            <p className="truncate">
                                Collection:{' '}
                                <Link href={`/collection/${data.contractAddress}`}>
                                    <a href="" className="underline hover:no-underline">
                                        {data.contractAddress}
                                    </a>
                                </Link>
                            </p>
                            <p className="truncate">
                                Owner:{' '}
                                <Link href={`/wallet/${data.owner}`}>
                                    <a href="" className="underline hover:no-underline">
                                        {iAmOwner ? 'you' : data.owner}
                                    </a>
                                </Link>
                            </p>
                            <p>Token ID: {data.tokenId}</p>
                            <p>
                                <a className="underline hover:no-underline" href={data.tokenURI} target="_blank" rel="noreferrer">
                                    Open metadata
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {!isListed && (
                            <>
                                <p className="text-xl opacity-50">Not listed for sale. :(</p>
                            </>
                        )}
                        {isListed && (
                            <>
                                <p className="text-xl">{Web3.utils.fromWei(listing.price)} FTM</p>
                            </>
                        )}

                        <div className="space-y-2">
                            {!wallet.account && (
                                <button onClick={() => wallet.connect()} type="button" className="bg-white w-full text-black px-4 py-2">
                                    Connect Wallet
                                </button>
                            )}
                            {wallet.account && (
                                <>
                                    {isListed && (
                                        <button onClick={() => acceptListing()} type="button" className="bg-white w-full text-black px-4 py-2">
                                            Buy Now
                                        </button>
                                    )}
                                </>
                            )}

                            {iAmOwner && (
                                <>
                                    <button onClick={() => setShowModal('send')} type="button" className="bg-white w-full text-black px-4 py-2">
                                        Send
                                    </button>
                                    <button onClick={() => setShowModal('list')} type="button" className="bg-white w-full text-black px-4 py-2">
                                        {isListed ? 'Modify Listing' : 'List for Sale'}
                                    </button>
                                    {isListed && (
                                        <button onClick={() => revokeListing()} type="button" className="bg-white w-full text-black px-4 py-2">
                                            Delist from Sale
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {data.metadata.attributes && (
                    <div className="flex gap-2 flex-wrap">
                        {data.metadata.attributes.map((attribute) => (
                            <div className="inline-block bg-white text-black p-2">
                                <p className="text-xs">{attribute.trait_type}</p>
                                <p>{attribute.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                <History contractAddress={data.contractAddress} tokenId={data.tokenId} />
            </div>
        </>
    )
}
