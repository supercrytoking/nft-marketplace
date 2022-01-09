import CoolStuff from '../components/CoolStuff'
import Input from '../components/Input'
import TokenLookup from '../components/TokenLookup'

export default function IndexPage() {
    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            <div className="bg-zinc-400 text-zinc-900 h-96 flex items-center justify-center p-6 relative">
                <CoolStuff />
                <p className="text-2xl z-10">Welcome to a new kind of marketplace.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                    <p className="text-xs py-1 px-2 bg-zinc-400 text-zinc-900 inline-block">Non-custodial</p>
                    <p>Your token never leaves your wallet. Never miss an airdrop again, ever.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-xs py-1 px-2 bg-zinc-400 text-zinc-900 inline-block">Chain-wide Tokens</p>
                    <p>Collections don't need to be registered. We let da robots do the job.</p>
                </div>
                <div className="space-y-2">
                    <p className="text-xs py-1 px-2 bg-zinc-400 text-zinc-900 inline-block">Feeless Minting</p>
                    <p>You can upload your art for free. Minting currently costs 0 FTM (+gas).</p>
                </div>
                <div className="space-y-2">
                    <p className="text-xs py-1 px-2 bg-zinc-400 text-zinc-900 inline-block">Decentralized Storage</p>
                    <p>Tokens minted here have their data safely stored (and pinned) on IPFS.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full h-60 md:h-auto bg-zinc-400 text-zinc-900 bg-cover bg-center p-6" style={{ backgroundImage: 'url("/img/madson-sample.png")' }}>
                    <div className="bg-zinc-900 inline-block border border-zinc-400">
                        <p className="translate translate-x-1 -translate-y-1 bg-zinc-400 text-zinc-900 px-4 py-1 inline-block border border-zinc-900 text-xs md:text-base">Featured Collection</p>
                    </div>
                </div>
                <TokenLookup />
            </div>

            <div className="flex items-center">
                <p className="flex-1">Fantom Digital &copy; {new Date().getFullYear()}</p>
                <p>❤️</p>
            </div>
        </div>
    )
}
