import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Web3 from 'web3'
import ImageBox from '../../components/ImageBox'
import { erc721 } from '../../data/abis'

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
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((nft) => (
                        <ImageBox nft={nft} />
                    ))}
                </div>
            )}
        </div>
    )
}
