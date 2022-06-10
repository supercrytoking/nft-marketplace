import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import ImageBox from '../components/ImageBox'

export default function Search() {
    const [_searchQuery, setSearchQuery] = useState('')
    const [searchQuery] = useDebounce(_searchQuery, 300);

    const { data, isValidating } = useSWR(searchQuery && `/data/search?q=${searchQuery}`)

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">

            <div className="space-y-6">
                <div className='bg-white bg-opacity-10 relative'>
                    <input autoFocus placeholder='Enter a search term' className='w-full p-4 text-2xl bg-transparent' type="text" value={_searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    {searchQuery && isValidating && (<div className='absolute top-0 right-0 p-4 h-full flex items-center justify-center'>
                        <i className='fas fa-circle-notch fa-spin'></i>
                    </div>)}
                </div>
                {data && data.collections.length <= 0 && data.tokens.length <= 0 && !isValidating && searchQuery && <p className="text-lg opacity-75">There is no results to display for the `{searchQuery}` query.</p>}
            </div>


            {data && data.collections.length > 0 && <div className='overflow-scroll'>
                <table className="w-full table-auto text-left">
                    <thead className="bg-white bg-opacity-10 uppercase">
                        <tr>
                            <th className="p-2">Collection Name</th>
                            <th>Total Supply</th>
                            <th>Contract Address</th>
                        </tr>
                    </thead>

                    <tbody>

                        {data.collections.map((collection, index) => (
                            <tr className={classNames(index % 2 != 0 && 'bg-white bg-opacity-5')}>
                                <td className="px-1 py-2">
                                    <Link href={`/${collection.contractAddress}`}><a className="underline hover:no-underline truncate" >{collection.name}</a></Link>
                                </td>
                                <td>
                                    {collection.totalSupply}
                                </td>
                                <td>
                                    <a className="underline hover:no-underline truncate" href={`https://ftmscan.com/address/${collection.contractAddress}`}>{collection.contractAddress}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            {data && data.tokens.length > 0 && (
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry
                        gutter="1em"
                    >
                        {data.tokens.map((nft) => (
                            <>{nft &&
                                <ImageBox nft={nft} key={nft._id} />
                            }</>
                        ))}
                    </Masonry></ResponsiveMasonry>
            )
            }
        </div>
    )
}
