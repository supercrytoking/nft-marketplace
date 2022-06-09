import { useState } from 'react'
import ReactTyped from 'react-typed'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import ImageBox from '../components/ImageBox'
import Input from '../components/Input'

export default function Search() {
    const [_searchQuery, setSearchQuery] = useState('')
    const [searchQuery] = useDebounce(_searchQuery, 1000);

    const { data, isValidating } = useSWR(`/data/search?q=${searchQuery}`)

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            <div className="py-24 max-w-md w-full mx-auto space-y-4">
                <Input label="Search Terms" value={_searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                {data && data.length <= 0 && !isValidating && searchQuery && <p className="text-center opacity-50">There is no data to display.</p>}

                {searchQuery && isValidating && (
                    <p className="text-center opacity-50">
                        <ReactTyped strings={['Loading...']} loop />
                    </p>
                )}
            </div>

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {data.collections.map((collection) => (
                        <p>{collection.name}</p>
                    ))}
                </div>
            )}

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {data.tokens.map((nft) => (
                        <ImageBox nft={nft} key={nft.id} />
                    ))}
                </div>
            )}
        </div>
    )
}
