import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Web3 from 'web3'
import Button from '../../components/Button'
import ImageBox from '../../components/ImageBox'
import Input from '../../components/Input'
import { erc721 } from '../../data/abis'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Collection({ contractAddress }) {
    const router = useRouter()

    const { data } = useSWR(`/data/${contractAddress}`)

    const web3 = new Web3(`${process.env.NEXT_PUBLIC_RPC}`)
    const contract = new web3.eth.Contract(erc721 as any, contractAddress)

    const [showFilters, setShowFilters] = useState(false)
    const [tokenLookup, setTokenLookup] = useState('')
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

    const searchToken = (e) => {
        try {
            e.preventDefault()
            if (!tokenLookup) return
            router.push(`/${contractAddress}/${tokenLookup}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-wrap gap-6">
                <div className="flex-1">
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
                <div className="w-full md:w-auto">
                    {!showFilters && <Button onClick={() => setShowFilters(true)}>Filter</Button>}
                    {showFilters && (
                        <form onSubmit={searchToken}>
                            <Input value={tokenLookup} onChange={(e) => setTokenLookup(e.target.value)} label="Token ID" />
                            <button type="submit" className="hidden" />
                        </form>
                    )}
                </div>
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
