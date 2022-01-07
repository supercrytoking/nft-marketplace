import useSWR from 'swr'
import Link from 'next/link'
import { formatPricing } from '../utils/utils'
import CoolStuff from '../components/CoolStuff'

export default function IndexPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="bg-white text-black h-96 flex items-center justify-center p-6 relative">
                <CoolStuff />
                <p className="text-2xl z-10">Welcome to a new kind of marketplace.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                    <p className="text-xs py-1 px-2 bg-white text-black inline-block">Non-custodial</p>
                    <p>Your token never leaves your wallet. Never miss an airdrop again, ever.</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs py-1 px-2 bg-white text-black inline-block">Chain-wide Tokens</p>
                    <p>Collections don't need to be registered. We let da robots do the job.</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs py-1 px-2 bg-white text-black inline-block">Feeless Minting</p>
                    <p>You can upload your art for free. Minting currently costs 0 FTM (+gas).</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs py-1 px-2 bg-white text-black inline-block">Decentralized Storage</p>
                    <p>Tokens minted here have their data safely stored (and pinned) on IPFS.</p>
                </div>
            </div>
        </div>
    )
}
