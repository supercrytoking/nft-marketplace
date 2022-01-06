import dayjs from 'dayjs'
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

    const time = block ? dayjs.unix(block.timestamp).format('M/D/YYYY h:mm A') : null
    const value = transaction ? Number(web3.utils.fromWei(transaction.value.toString())).toFixed(2) : null

    return (
        <div className="bg-white text-black p-2">
            <div className="flex items-center justify-center space-x-4">
                <p className="truncate">{event.returnValues.from}</p>
                <p>&rarr;</p>
                <p className="truncate">{event.returnValues.to}</p>
                {/* {value && <p>{value} FTM</p>} */}
            </div>
            <div className="flex items-center space-x-4 text-xs opacity-50">
                <p className="">
                    <a className="underline hover:no-underline" href={`https://ftmscan.com/tx/${event.transactionHash}`} target="_blank" rel="noreferrer">
                        {event.transactionHash.slice(0, 6)}
                        ...
                        {event.transactionHash.slice(-6)}
                    </a>
                    <span> @ {time}</span>
                </p>
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
                <div className="bg-white text-black p-4  text-center">
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
