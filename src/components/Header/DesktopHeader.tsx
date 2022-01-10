import commaNumber from 'comma-number'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'

export default function DesktopHeader() {
    const wallet = useWallet()

    const [balance, setBalance] = useState()
    const formattedBalance = balance ? commaNumber(Number(Web3.utils.fromWei(balance)).toFixed(2)) : null

    const web3 = new Web3(wallet.account ? wallet.ethereum : process.env.NEXT_PUBLIC_RPC)

    useEffect(() => {
        if (!wallet.account) return

        const onLoad = async () => {
            try {
                const balanceFromWeb3 = await web3.eth.getBalance(wallet.account)
                setBalance(balanceFromWeb3)
            } catch (error) {
                console.log(error)
            }
        }
        onLoad()
    }, [wallet])

    return (
        <>
            <div className="hidden md:flex px-6 pt-12 max-w-7xl mx-auto  items-center space-x-4">
                <Link href="/" passHref>
                    <a>Home</a>
                </Link>
                <Link href="/explore" passHref>
                    <a>Explore</a>
                </Link>
                <Link href="/create" passHref>
                    <a>Create</a>
                </Link>
                <Link href="/wallet" passHref>
                    <a>Wallet</a>
                </Link>
                <div className="flex-1" />
                <div className="text-right">
                    <button type="button" onClick={() => wallet.connect()}>
                        {wallet.account ? (
                            <>
                                {wallet.account.slice(0, 6)}
                                ..
                                {wallet.account.slice(-6)}
                            </>
                        ) : (
                            'Connect Wallet'
                        )}
                    </button>
                    <p className="text-xs">{formattedBalance | 0.0} FTM</p>
                </div>
            </div>
        </>
    )
}
