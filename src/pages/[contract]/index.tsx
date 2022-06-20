import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactTyped from 'react-typed'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import AttributesSidebar from '../../components/AttributesSidebar'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import Input from '../../components/Input'
import SideBar from '../../components/Sidebar'
import Sorting from '../../components/Sorting'
import TokenMasonry from '../../components/TokenMasonry'
import { erc721 } from '../../data/abis'

export function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Collection({ contract }) {
    const wallet = useWallet()
    const router = useRouter()

    const filterPresets = {
        all: {
            name: 'All',
            sort: null,
            match: null
        },
        listed: {
            name: 'Listed',
            sort: { 'listing.priceEth': 1 },
            match: { 'listing.status': 'listed' }
        },
        sold: {
            name: 'Sold',
            sort: { 'listing.priceEth': 1 },
            match: { 'listing.status': 'accepted' }
        },
        ...wallet?.account ? {
            owned: {
                name: 'Owned',
                sort: { 'blockNumber': -1 },
                match: { 'owner': wallet?.account }
            }
        } : {}
    }

    const sortPresets = {
        priceasc: {
            name: 'Lowest Price First',
            sort: { "listing.priceEth": 1 },
        },
        pricedesc: {
            name: 'Highest Price First',
            sort: { "listing.priceEth": -1 },
        },
        idasc: {
            name: 'Low Token ID First',
            sort: { "tokenId": 1 },
        },
        iddesc: {
            name: 'High Token ID First',
            sort: { "tokenId": -1 },
        },
        rarity: {
            name: 'Rarest First',
            sort: { "rarity": 1 },
        },
        clear: {
            name: 'None',
            sort: null,
        },
    }

    const [_filter, setFilter] = useState(filterPresets.all)
    const [match, setMatch] = useState([])
    const [sort, setSort] = useState(null)
    const filter = {
        ..._filter,
        match: {
            ..._filter.match,
            ...(match && match.length > 0) ? {
                'metadata.attributes.value': {
                    $all: match
                }
            } : {}
        },
        sort: sort?.sort || _filter.sort
    }

    const { data, error } = useSWR(
        [
            `/data/${contract}/?`,
            ...filter.match ? [`match=${encodeURIComponent(JSON.stringify(filter.match))}&`] : [],
            ...filter.sort ? [`sort=${encodeURIComponent(JSON.stringify(filter.sort) as string)}&`] : [],
        ].join('')
    )
    const listed = data && data.filter(token => token?.listing?.status === 'listed')

    const { data: collection } = useSWR(`/data/${contract}/details`)


    const [showAttributesSidebar, setShowAttributesSidebar] = useState(false)

    return (
        <>
            <AttributesSidebar
                visible={showAttributesSidebar}
                onClose={() => setShowAttributesSidebar(false)}
                contractAddress={contract}
                match={match}
                setMatch={setMatch}
            />

            <div className="p-6 py-12 max-w-7xl mx-auto space-y-12 w-full">
                {collection && <div className="space-y-4 flex-1">
                    <p className='text-3xl uppercase font-extended'>{collection.name}</p>
                    <div className="space-y-1">
                        <p>
                            <span>{collection.totalIndexed} Tokens Indexed</span>
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
                </div>}

                <div className="flex gap-4 items-center flex-wrap">

                    <div className="shrink-0 flex gap-4 whitespace-nowrap overflow-auto no-scrollbar">
                        {Object.keys(filterPresets).map((key, index) => {
                            const preset = filterPresets[key]
                            return <Button onClick={() => setFilter(preset)} className={filter.name === preset.name && 'bg-blue-500'}>{preset.name}</Button>
                        })}
                    </div>

                    <div className="hidden md:block flex-1" />

                    <div className='flex gap-4 items-center whitespace-nowrap '>
                        <Dropdown
                            onChange={e => setSort(sortPresets[e.target.value])}
                            options={Object.keys(sortPresets).map((key, index) => {
                                const sortPreset = sortPresets[key]
                                return { name: sortPreset.name, value: key }
                            })}
                        />

                        <Button onClick={() => setShowAttributesSidebar(true)}>
                            {(match && match.length > 0) && <span>({match.length}) </span>}
                            <i className='fas fa-filter' />
                        </Button>
                    </div>
                </div>

                {(error && !data) && < p className="opacity-50">
                    An error occurred. Please wait 1 minute and retry.
                </p>}


                {
                    ((!data || !collection) && !error) && <div>
                        <p className="opacity-50">
                            <ReactTyped strings={['Loading...']} loop />
                        </p>
                    </div>
                }

                {
                    (data && data.length <= 0 && !error) && <p className="opacity-50">
                        No items found matching this criteria.
                    </p>
                }

                {data && <TokenMasonry tokens={data} />}
            </div >
        </>
    )
}
