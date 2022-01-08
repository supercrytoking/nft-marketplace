import useSWR from 'swr'
import Link from 'next/link'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import LazyLoad from 'react-lazyload'
import { erc721 } from '../../data/abis'
import { cacheImage } from '../../utils/utils'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Collection({ contractAddress }) {
    const { data } = useSWR(`/data/${contractAddress}`)

    const web3 = new Web3(`${process.env.NEXT_PUBLIC_RPC}`)
    const contract = new web3.eth.Contract(erc721 as any, contractAddress)

    const [name, setName] = useState('')
    const [totalSupply, setTotalSupply] = useState('')

    useEffect(() => {
        const onLoad = async () => {
            const nameFromWeb3 = await contract.methods.name().call()
            setName(nameFromWeb3)
            const totalSupplyFromWeb3 = await contract.methods.totalSupply().call()
            setTotalSupply(totalSupplyFromWeb3)
        }
        onLoad()
    }, [])

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <p>{name}</p>
                <p className="truncate">
                    <a href={`https://ftmscan.com/address/${contractAddress}`} target="_blank" className="underline hover:no-underline" rel="noreferrer">
                        {contractAddress.slice(0, 6)}
                        ...
                        {contractAddress.slice(-6)}
                    </a>
                </p>
                {totalSupply && <p>{totalSupply} items</p>}
            </div>
            {data && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {data.map((nft) => (
                        <LazyLoad once>
                            <Link href={`/${nft.contractAddress}/${nft.tokenId}`}>
                                <a className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center">
                                    <img className="w-full" src={cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))} alt="" />
                                </a>
                            </Link>
                        </LazyLoad>
                    ))}
                </div>
            )}
        </div>
    )
}
