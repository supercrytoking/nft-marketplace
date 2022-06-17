import dayjs from 'dayjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactTyped from 'react-typed'
import Web3 from 'web3'
import { erc721 } from '../data/abis'

const web3 = new Web3(process.env.NEXT_PUBLIC_RPC)

const HistoryItem = ({ event }) => {
    const [block, setBlock] = useState()
    const [transaction, setTransaction] = useState()

    useEffect(() => {
        const onLoad = async () => {
            const transactionFromWeb3 = await web3.eth.getTransaction(event.transactionHash)
            setTransaction(transactionFromWeb3)
            const blockFromWeb3 = await web3.eth.getBlock(event.blockNumber)
            setBlock(blockFromWeb3)
            console.log(transactionFromWeb3)
        }
        onLoad()
    }, [])

    // .fromNow()

    const time = block ? (dayjs.unix(block.timestamp).diff(dayjs(new Date()), 'days') > 1 ? dayjs.unix(block.timestamp).format('M/D/YYYY h:mm A') : dayjs.unix(block.timestamp).fromNow()) : null
    const value = transaction ? Number(web3.utils.fromWei(transaction.value.toString())).toFixed(2) : null

    return (
        <div className="bg-zinc-400 text-zinc-900 p-2">
            <div className="flex items-center justify-center space-x-4">
                <Link href={`/wallet/${event.returnValues.from}`}>
                    <a className="underline hover:no-underline truncate">{event.returnValues.from}</a>
                </Link>
                <p>&rarr;</p>
                <Link href={`/wallet/${event.returnValues.to}`}>
                    <a className="underline hover:no-underline truncate">{event.returnValues.to}</a>
                </Link>
            </div>
            <div className="flex items-center space-x-4 text-xs opacity-50">
                <p>{value} FTM</p>
                <p className='flex-1'>{time}</p>
                <a className="underline hover:no-underline" href={`https://ftmscan.com/tx/${event.transactionHash}`} target="_blank" rel="noreferrer">
                    {event.transactionHash.slice(0, 6)}
                    ...
                    {event.transactionHash.slice(-6)}
                </a>
            </div>
        </div>
    )
}

export default function History({ contractAddress, tokenId }) {
    const contract = new web3.eth.Contract(erc721 as any, contractAddress)

    const [events, setEvents] = useState<any[]>([])

    useEffect(() => {
        const onLoad = async () => {
            await contract.getPastEvents(
                'Transfer',
                {
                    filter: { tokenId },
                    fromBlock: 0,
                    toBlock: 'latest'
                },
                async (error, results) => {
                    if (error) return console.log(error)
                    console.log(results)
                    setEvents(results.reverse())
                }
            )
        }
        onLoad()
    }, [])

    return (
        <div className="space-y-2">
            {(!events || events.length <= 0) && (
                <div className="bg-zinc-400 text-zinc-900 p-4  text-center">
                    <p>
                        <ReactTyped strings={['Loading history...']} loop />
                    </p>
                </div>
            )}
            {events.map((event) => (
                <HistoryItem event={event} key={event.transactionHash} />
            ))}
        </div>
    )
}
