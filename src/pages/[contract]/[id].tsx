import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Button from '../../components/Button'
import History from '../../components/History'
import ImageBox from '../../components/ImageBox'
import Input from '../../components/Input'
import Modal from '../../components/Modal'
import useExchange from '../../hooks/useExchange'
import { api, cacheImage, imageUrl } from '../../utils/utils'

export async function getServerSideProps(ctx) {
    const { contract, id } = ctx.query
    return { props: { contract, id } }
}

export default function TokenPage({ contract, id }) {
    const wallet = useWallet()
    const { status, createListing: createListingFunction, acceptListing: acceptListingFunction, revokeListing: revokeListingFunction } = useExchange()
    const { data, mutate } = useSWR(`/data/${contract}/${id}`)

    const [showModal, setShowModal] = useState<false | 'list' | 'send'>(false)
    const [listingPrice, setListingPrice] = useState('')

    const image = data ? data.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : null
    const iAmOwner = data && data.owner === wallet.account
    const isListed = data && data.listing && data.listing.status === 'listed'

    const listing = data ? data.listing : null

    const createListing = async () => {
        await createListingFunction(contract, id, Web3.utils.toWei(listingPrice))
        await mutate()
        setShowModal(false)
    }

    const acceptListing = async () => {
        console.log(listingPrice)
        await acceptListingFunction(contract, id, listingPrice)
        await mutate()
    }

    const revokeListing = async () => {
        await revokeListingFunction(contract, id)
        await mutate()
    }

    useEffect(() => {
        setListingPrice(data?.listing?.price && Web3.utils.fromWei(data?.listing?.price))
    }, [data])

    if (!data) return null
    return (
        <>
            <Modal visible={showModal === 'list'} onClose={() => setShowModal(false)}>
                <div className="space-y-4">
                    <Input label="Listing Price" value={listingPrice} onChange={(e) => setListingPrice(e.target.value)} type="number" />

                    <div className="flex gap-4 justify-end items-center">
                        <Button onClick={() => createListing()} loading={status === 'creating'}>
                            List for Sale
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal visible={showModal === 'send'} onClose={() => setShowModal(false)}>
                <div className="space-y-4">
                    {/* <Input label="Address" value={listingPrice} onChange={(e) => setListingPrice(e.target.value)} type="number" /> */}
                    {/*
                    <div className="flex gap-4 justify-end items-center">
                        <button className="bg-zinc-400 text-zinc-900 px-4 py-2" onClick={() => {}} type="submit">
                            Send Now
                        </button>
                    </div> */}
                </div>
            </Modal>

            <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div>
                            <ImageBox nft={data} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-3xl">{data.metadata.name}</p>

                        <div>
                            {data.metadata.description && <p>{data.metadata.description}</p>}
                            {!data.metadata.description && (
                                <p className="opacity-50">
                                    This token has no description. Here's some Lorem: Deserunt ullamco culpa non laboris minim. Eiusmod laboris eu nisi Lorem labore in eiusmod. Dolore sunt enim commodo pariatur ullamco
                                    enim pariatur sunt velit culpa.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="">
                                    <p className="truncate">
                                        Collection:{' '}
                                        <Link href={`/collections/${data.contractAddress}`}>
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
                                        <a className="underline hover:no-underline" href={imageUrl(data.metadata.image)} target="_blank" rel="noreferrer">
                                            Open original asset
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
                                <div className="space-y-2 flex flex-col">
                                    {!wallet.account && (
                                        <button onClick={() => wallet.connect()} type="button" className="bg-zinc-400 w-full text-zinc-900 px-4 py-2">
                                            Connect Wallet
                                        </button>
                                    )}
                                    {wallet.account && (
                                        <>
                                            {isListed && (
                                                <button onClick={() => acceptListing()} type="button" className="bg-zinc-400 w-full text-zinc-900 px-4 py-2">
                                                    Buy Now
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {iAmOwner && (
                                        <>
                                            <button onClick={() => setShowModal('send')} type="button" className="bg-zinc-400 w-full text-zinc-900 px-4 py-2">
                                                Send
                                            </button>
                                            <button onClick={() => setShowModal('list')} type="button" className="bg-zinc-400 w-full text-zinc-900 px-4 py-2">
                                                {isListed ? 'Modify Listing' : 'List for Sale'}
                                            </button>
                                            {isListed && (
                                                <Button onClick={() => revokeListing()} loading={status === 'revoking'}>
                                                    Delist from Sale
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {data.metadata.attributes && (
                            <div className="flex gap-2 flex-wrap">
                                {data.metadata.attributes.map((attribute) => (
                                    <div className="inline-block bg-zinc-400 text-zinc-900 p-2">
                                        <p className="text-xs">{attribute.trait_type}</p>
                                        <p>{attribute.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <History contractAddress={data.contractAddress} tokenId={data.tokenId} />
                    </div>
                </div>
            </div>
        </>
    )
}
