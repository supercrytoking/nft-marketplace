import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactTyped from 'react-typed'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Button from '../../components/Button'
import ImageBox from '../../components/ImageBox'
import Input from '../../components/Input'
import { erc721 } from '../../data/abis'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Collection({ contract }) {
    const wallet = useWallet()

    const router = useRouter()

    const { data, error } = useSWR(`/data/${contract}`)

    const web3 = new Web3(`${process.env.NEXT_PUBLIC_RPC}`)
    // const web3 = new Web3(`${process.env.NEXT_PUBLIC_TESNET_RPC}`)
    const contractInstance = new web3.eth.Contract(erc721 as any, contract)

    const [tokenLookup, setTokenLookup] = useState('')

    const listed = data && data.filter(token => token?.listing?.status === 'listed')

    const { data: collection } = useSWR(`/data/${contract}/details`)

    useEffect(() => console.log(collection), [collection])

    const isMyCollection = wallet.account && owner ? Web3.utils.toChecksumAddress(wallet.account) === Web3.utils.toChecksumAddress(owner) : null

    const searchToken = (e) => {
        try {
            e.preventDefault()
            if (!tokenLookup) return
            router.push(`/${contract}/${tokenLookup}`)
        } catch (error) {
            console.log(error)
        }
    }

    if (!data) {
        return (
            <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
                {!data && !error && (
                    <p className="opacity-50">
                        <ReactTyped strings={['Loading...']} loop />
                    </p>
                )}
                {!data && error && (
                    <p className="opacity-50">
                        Error. Not found. If you believe this is an error,{' '}
                        <a className="underline hover:not-underline" href="https://discord.gg/TUgJg338kS" target="_blank" rel="noreferrer">
                            report it to the team
                        </a>
                        .
                    </p>
                )}
            </div>
        )
    }

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-wrap gap-6">
                {collection && <div className="space-y-4 flex-1">
                    <p className='text-3xl uppercase font-extended'>{collection.name}</p>

                    <div className="space-y-1">
                        <p>
                            <span>{collection.count} Tokens Indexed</span>
                            <span className='opacity-50'> {collection.totalSupply || 'Unknown'} Total Supply</span>
                        </p>
                        <p></p>
                        <p>
                            <a href={`https://ftmscan.com/address/${contract}`} target="_blank" className="underline hover:no-underline" rel="noreferrer">
                                {contract.slice(0, 12)}
                                ...
                                {contract.slice(-12)}
                            </a>
                        </p>
                    </div>
                    {isMyCollection && (
                        <Link href={`/create/${contract}`} passHref>
                            <a className="block">
                                <Button>Publish to Collection</Button>
                            </a>
                        </Link>
                    )}
                </div>}
                {/* <div className="w-full md:w-auto">
                    {!showFilters && <Button onClick={() => setShowFilters(true)}>Filter</Button>}
                    {showFilters && (
                        <form onSubmit={searchToken}>
                            <Input value={tokenLookup} onChange={(e) => setTokenLookup(e.target.value)} label="Token ID" />
                            <button type="submit" className="hidden" />
                        </form>
                    )}
                </div> */}
            </div>

            {/* <div>
                <button onClick={() => indexCollection(contract)} className='underline hover:no-underline'>Index Collection</button>
            </div> */}



            {listed && listed.length > 0 &&
                <div className='space-y-4'>
                    <p>Listed</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {listed.map((nft) => (
                            <ImageBox nft={nft} />
                        ))}
                    </div>
                </div>
            }

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
