import classNames from "classnames"
import useSWR from "swr"
import commaNumber from 'comma-number'
import dayjs from "dayjs"

export default function IndexPage() {

    const { data } = useSWR('/stats')
    const { data: indexrData } = useSWR('/indexr')

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">

            {data && <>

                <div className="flex gap-6">
                    <div className="bg-zinc-400 text-zinc-900 p-4">
                        <p className="text-xl">{commaNumber(data.tokenCount)}</p>
                        <p>Total Tokens</p>
                    </div>
                    <div className="bg-zinc-400 text-zinc-900 p-4">
                        <p className="text-xl">{commaNumber(data.contractCount)}</p>
                        <p>Total Contracts</p>
                    </div>
                </div>
            </>}

            {indexrData && <>
                <div className="space-y-4">
                    <p>Collecton Indexer</p>

                    <div className="overflow-scroll whitespace-nowrap">
                        <table className="w-full table-auto text-left">
                            <thead className="bg-white bg-opacity-10 uppercase">
                                <tr>
                                    <th className="p-2">Contract</th>
                                    <th >Started</th>
                                    {/* <th>Token ID</th> */}
                                    {/* <th>Time</th> */}
                                </tr>
                            </thead>

                            {indexrData.currentlyIndexing.length < 1 && <div className="p-2 opacity-50">
                                <p>The collection indexer is currently not indexing any collections.</p></div>}
                            <tbody>
                                {indexrData.currentlyIndexing.map((collection, index) =>
                                    <tr className={classNames(index % 2 != 0 && 'bg-white bg-opacity-5')}>
                                        <td className="px-1 py-2">
                                            <a className="underline hover:no-underline truncate" href={`/collections/${collection.address}`}>{collection.address}</a>
                                        </td>
                                        <td>
                                            {dayjs(collection.timestamp).fromNow()}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </>}

            {data && <>
                <div className="space-y-4 ">
                    <p>Recent Marketplace Events</p>
                    <div className="overflow-scroll whitespace-nowrap">
                        <table className="w-full table-auto text-left">
                            <thead className="bg-white bg-opacity-10 uppercase">
                                <tr>
                                    <th className="p-2">Token</th>
                                    <th>Event</th>
                                    <th>Block Number</th>
                                    <th>Hash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentEvents.map((event, index) =>
                                    <tr className={classNames(index % 2 != 0 && 'bg-white bg-opacity-5')}>
                                        <td className="p-1 py-2">
                                            {<a className="underline hover:no-underline" href={`/${event.token.contractAddress}/${event.token.tokenId}`}>{event.token.metadata.name}</a>}
                                        </td>
                                        <td className="p-1 py-2">
                                            {event.status}
                                        </td>
                                        <td>{event.blockNumber} ({event.logIndex})</td>
                                        <td>
                                            <a className="underline hover:no-underline" href={`https://ftmscan.com/tx/${event.tx}`}> {event.tx.slice(0, 12)}</a>
                                        </td>
                                        {/* <td>
                                            <a className="underline hover:no-underline" href={`/collections/${token.contractAddress}`}> {token?.contract?.name || 'Unknown Collection'}</a>
                                        </td>
                                        <td>
                                            <a className="underline hover:no-underline" href={`/collections/${token.contractAddress}`}>{token.contractAddress.slice(0, 12)}...</a>
                                        </td>
                                        <td>{token.tokenId}</td>
                                        <td>{dayjs(token.updatedAt).format('DD/MM hh:mm:ss:SSS')}</td> */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="space-y-4 ">
                    <p>Recently Indexed Tokens</p>
                    <div className="overflow-scroll whitespace-nowrap">
                        <table className="w-full table-auto text-left">
                            <thead className="bg-white bg-opacity-10 uppercase">
                                <tr>
                                    <th className="p-2">Token</th>
                                    <th>Collection</th>
                                    <th>Contract</th>
                                    <th>Token ID</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentTokens.map((token, index) =>
                                    <tr className={classNames(index % 2 != 0 && 'bg-white bg-opacity-5')}>
                                        <td className="p-1 py-2">
                                            <a className="underline hover:no-underline" href={`/${token.contractAddress}/${token.tokenId}`}>{token.metadata.name}</a>
                                        </td>
                                        <td>
                                            <a className="underline hover:no-underline" href={`/collections/${token.contractAddress}`}> {token?.contract?.name || 'Unknown Collection'}</a>
                                        </td>
                                        <td>
                                            <a className="underline hover:no-underline" href={`/collections/${token.contractAddress}`}>{token.contractAddress.slice(0, 12)}...</a>
                                        </td>
                                        <td>{token.tokenId}</td>
                                        <td>{dayjs(token.updatedAt).format('DD/MM hh:mm:ss:SSS')}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>}
        </div >
    )
}
