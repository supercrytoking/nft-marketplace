import { useState } from 'react'
import useSWR from 'swr'
import useExchange from '../hooks/useExchange'

export default function CreatePage() {
    const [tab, setTab] = useState<null | 'create' | 'import'>(null)

    const { createOrUpdateListing } = useExchange()

    const [contractAddress, setContractAddress] = useState('')
    const [token, setToken] = useState('')
    const [price, setPrice] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { data: nft, error } = useSWR(contractAddress && token ? `/${contractAddress}/${token}` : null)

    const onImport = async (e) => {
        try {
            e.preventDefault()
            if (!contractAddress || !token || !price) return alert('You must fill in all fields.')
            await createOrUpdateListing(contractAddress, token, price)
        } catch (error) {
            setErrorMessage(JSON.stringify(error.message))
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="space-x-4">
                <button onClick={() => setTab('import')} type="button" className="bg-zinc-400 px-4 py-2 text-zinc-900">
                    Import NFT
                </button>
                <button disabled onClick={() => setTab('create')} type="button" className="bg-zinc-400 px-4 py-2 text-zinc-900 opacity-50 cursor-not-allowed">
                    Create NFT
                </button>
            </div>
            {tab === 'create' && (
                <>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p>Name</p>
                            <input type="text" name="name" className="bg-zinc-400 bg-opacity-25 p-2" />
                        </div>
                        <div className="space-y-1">
                            <p>Description</p>
                            <input type="text" name="name" className="bg-zinc-400 bg-opacity-25 p-2" />
                        </div>
                        <div className="space-y-1">
                            <p>Price</p>
                            <input type="text" name="name" className="bg-zinc-400 bg-opacity-25 p-2" />
                        </div>
                        <div className="space-y-1">
                            <p>Image</p>
                            <input type="file" />
                        </div>
                    </div>
                </>
            )}
            {tab === 'import' && (
                <>
                    <form onSubmit={onImport} className="space-y-4">
                        <div className="space-y-1">
                            <p>Contract Address</p>
                            <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} type="text" name="name" className="bg-zinc-400 bg-opacity-25 p-2" />
                        </div>
                        <div className="space-y-1">
                            <p>Token</p>
                            <input value={token} onChange={(e) => setToken(e.target.value)} type="text" name="name" className="bg-zinc-400 bg-opacity-25 p-2" />
                        </div>
                        <div className="space-y-1">
                            <p>Price</p>
                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="name" className="bg-zinc-400 bg-opacity-25 p-2" />
                        </div>
                        <div>
                            <button className="bg-zinc-400 text-zinc-900 px-4 py-2" type="submit">
                                List NFT
                            </button>
                        </div>
                    </form>

                    {errorMessage && <div className="bg-red-400 text-zinc-900 p-2">{errorMessage}</div>}
                    {nft && (
                        <div>
                            <img className="w-32" src={nft.metadata.image} alt="" />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
