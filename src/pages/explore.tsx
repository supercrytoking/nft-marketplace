import classNames from 'classnames'
import { useState } from 'react'
import ReactTyped from 'react-typed'
import useSWR from 'swr'
import Button from '../components/Button'
import ImageBox from '../components/ImageBox'

const feeds = [
    {
        slug: 'latest',
        name: 'Latest',
        query: '/feeds/latest'
    },
    {
        slug: 'listed',
        name: 'Listed',
        query: '/feeds/listed'
    }
]

export default function Explore() {
    const [feed, setFeed] = useState(feeds[0])
    const { data } = useSWR(feed.query)

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-4">
                {feeds.map(({ slug, name }, index) => (
                    <Button className={classNames(feed.slug === slug && 'bg-blue-500')} key={slug} onClick={() => setFeed(feeds[index])}>
                        {name}
                    </Button>
                ))}
            </div>

            {!data && (
                <div>
                    <p className="opacity-50">
                        <ReactTyped strings={['Loading...']} loop />
                    </p>
                </div>
            )}

            {data && data.length <= 0 && (
                <div>
                    <p className="opacity-50">There is no data to display.</p>
                </div>
            )}

            {data && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((nft) => (
                        <ImageBox nft={nft} />
                    ))}
                </div>
            )}
        </div>
    )
}
