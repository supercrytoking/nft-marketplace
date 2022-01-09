import { useRouter } from 'next/router'
import { useState } from 'react'
import Web3 from 'web3'
import Input from './Input'

export default function TokenLookup() {
    const router = useRouter()

    const [tokenId, setTokenId] = useState('')
    const [contractAddress, setContractAddress] = useState('')

    const onSubmit = (e) => {
        try {
            e.preventDefault()
            if (!tokenId || !contractAddress) return
            if (!Web3.utils.isAddress(contractAddress)) return
            router.push(`/${contractAddress}/${tokenId}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="md:max-w-md w-full border border-zinc-400 p-6 space-y-4">
            <div className="space-y-1">
                <p>Token Lookup</p>
                <p>Find any ERC721 on the Fantom Blockchain.</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
                <Input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} label="Token ID" />
                <Input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} label="Contract Address" />
                <button type="submit" className="hidden" />
            </form>
        </div>
    )
}
