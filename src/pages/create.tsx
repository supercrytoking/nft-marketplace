import { nanoid } from 'nanoid'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'
import Textarea from '../components/Textarea'
import { erc721 } from '../data/abis'
import { api } from '../utils/utils'

export default function Create() {
    const wallet = useWallet()

    const [status, setStatus] = useState('idle')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date().toString())
    const [file, setFile] = useState('')

    const [cid, setCid] = useState('')
    const [tokenId, setTokenId] = useState('')

    const fileRef = useRef()
    const fileURL = file ? URL.createObjectURL(file) : ''

    const metadata = {
        name,
        description,
        date
    }

    const upload = async (e) => {
        try {
            setStatus('uploading')
            if (e) e.preventDefault()
            const formData = new FormData()
            formData.append('file', file)
            formData.append('metadata', JSON.stringify(metadata))
            const { data } = await api.post('/upload', formData)
            setCid(data.cid)
            setStatus('idle')
        } catch (error) {
            setStatus('error')
            console.error(error)
        }
    }

    const web3 = new Web3(wallet.account ? wallet.ethereum : 'https://rpc.ftm.tools')
    const contract = new web3.eth.Contract(erc721 as any, process.env.NEXT_PUBLIC_MINTING_CONTRACT as string)
    const mint = async (e) => {
        try {
            if (!wallet.account) return wallet.connect()
            setStatus('minting')
            await contract.methods.mint(wallet.account, cid).estimateGas({ from: wallet.account })
            const doMint = await contract.methods.mint(wallet.account, cid).send({ from: wallet.account })
            const transferEvent = doMint.events.Transfer
            let tokenId
            if (Array.isArray(transferEvent)) {
                tokenId = transferEvent[transferEvent.length - 1].returnValues.tokenId
            } else {
                tokenId = transferEvent.returnValues.tokenId
            }
            setTokenId(tokenId)
            setStatus('idle')
        } catch (error) {
            setStatus('error')
            console.error(error)
        }
    }

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date().toString()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <Modal visible={cid} onClose={() => setCid('')}>
                <div className="space-y-4">
                    <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" className="bg-zinc-900 p-2 block w-full border-zinc-800 border rounded truncate" rel="noreferrer">
                        ipfs://
                        {cid}
                    </a>
                    <p>1. Your NFT has been uploaded to IPFS. You can proceed to mint it to the Fantom Blockchain now:</p>
                    <div className="flex justify-end">
                        <Button onClick={mint} loading={status === 'minting'}>
                            {wallet.account ? 'Mint NFT' : 'Connect Wallet'}
                        </Button>
                    </div>

                    {tokenId && (
                        <>
                            <p>
                                2. Your token (#
                                {tokenId}
                                ) has been minted and is now in your wallet. Next, you can optionally list it for sale.
                            </p>
                            <div className="flex gap-4 justify-end items-center">
                                <Link href="/wallet">
                                    <a>View Wallet</a>
                                </Link>
                                <Link href={`/${process.env.NEXT_PUBLIC_MINTING_CONTRACT}/${tokenId}`}>
                                    <a className="bg-white text-black px-4 py-2">View Token</a>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </Modal>

            <div className="p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p>Mint an NFT</p>
                        <p>Upload an asset to mint your NFT. Minting your NFT is completely free (+gas).</p>
                        <p>Minting an NFT is a 3-step process. You'll first upload your NFT's metadata to IPFS, then mint the token to your wallet, and finally, optionally approve and list the new NFT for sale.</p>
                        <p>Your asset(s) are uploaded to IPFS (The InterPlanetary File System) for life-long safe keeping, and pinned indefinitely.</p>
                        <p>The NFT is minted to an immutable ERC721-compliant smart contract on the Fantom Blockchain.</p>
                    </div>
                    <div className="w-full space-y-6">
                        <form onSubmit={upload} className="flex flex-col space-y-4">
                            {!fileURL && (
                                <>
                                    <button onClick={() => fileRef.current.click()} type="button" className="h-64 rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center justify-center">
                                        <p>X</p>
                                    </button>
                                </>
                            )}
                            {fileURL && (
                                <>
                                    <button onClick={() => setFile(null)} className="w-full" type="button">
                                        <img className="rounded bg-zinc-900 border-zinc-800 border overflow-hidden w-full" src={fileURL} alt="" />
                                    </button>
                                </>
                            )}
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" ref={fileRef} accept="image/*" />
                            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <div className="flex justify-end">
                                <Button type="submit" onClick={upload} loading={status === 'uploading'}>
                                    Upload to IPFS
                                </Button>
                            </div>
                        </form>
                        <div>
                            <p className="bg-zinc-900 p-2 border-zinc-800 border rounded">{JSON.stringify(metadata, null, 4)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
