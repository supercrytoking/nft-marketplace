import Link from 'next/link'
import { useEffect, useState } from 'react'
import Web3 from 'web3'

export default function Footer() {
    const [blockNumber, setBlockNumber] = useState(0)

    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC)

    useEffect(() => {
        const onLoad = async () => {
            try {
                const blockNumberFromWeb3 = await web3.eth.getBlockNumber()
                setBlockNumber(blockNumberFromWeb3)
            } catch (error) {
                console.log(error)
            }
        }
        onLoad()

        const interval = setInterval(onLoad, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="px-6 pb-12 max-w-7xl mx-auto  items-center space-x-4">
            <div className="flex w-full items-center gap-6">
                <p className="text-xs md:text-base ">Fantom Digital &copy; {new Date().getFullYear()}</p>

                <p>
                    <Link href="/stats">
                        <a className='underline hover:no-underline'>Stats</a>
                    </Link>
                </p>

                <div className="flex-1" />

                <p>
                    <span className="text-xs">{blockNumber}</span> ❤️
                </p>
            </div>
        </div >
    )
}
