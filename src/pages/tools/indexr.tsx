import { useState } from 'react'
import useSWR from 'swr'
import Web3 from 'web3'
import Input from '../../components/Input'

export default function Indexr() {
    const [contractAddress, setContractAddress] = useState('')

    const { data } = useSWR('/indexr')
    const { data: process } = useSWR(Web3.utils.isAddress(contractAddress) ? `/indexr/collections/${contractAddress}` : null)

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="max-w-2xl space-y-6">
                {' '}
                <div className="space-y-4">
                    <p>Enter an ERC721-compliant NFT contract address to track all its tokens.</p>

                    <Input disable={!data || !data.status} value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
                </div>
                {(data || process) && (
                    <p className="bg-zinc-900 p-2 border-zinc-800 border rounded">
                        {data && <>Status: {JSON.stringify(data, null, 4)}</>} <br />
                        {process && <>Process: {JSON.stringify(process, null, 4)}</>}
                    </p>
                )}
            </div>
        </div>
    )
}
