import commaNumber from 'comma-number'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Button from '../Button'

export default function ConnectWallet() {
    const wallet = useWallet()

    const [balance, setBalance] = useState('')
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

    const shortAddress = wallet.account ? `${wallet.account.slice(0, 6)}..${wallet.account.slice(-6)}` : null

    return (
        <div className="text-right">
            <div className="flex space-x-2">
                {!wallet.account && (
                    <Button onClick={() => wallet.connect()}>
                        {wallet.account ? shortAddress : 'Connect Wallet'}
                    </Button>
                )}
                {wallet.account && (
                    <Link href="/wallet">
                        <Button>{wallet.account ? shortAddress : 'Connect Wallet'}</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}
