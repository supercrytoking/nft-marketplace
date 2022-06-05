import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactTyped from 'react-typed'
import useSWR from 'swr'
import Button from '../../components/Button'
import ImageBox from '../../components/ImageBox'
import LazyLoad from 'react-lazyload';

const feeds = [
    {
        slug: '/',
        name: 'New',
        query: '/feeds/new'
    },
    {
        slug: 'moving',
        name: 'Moving',
        query: '/feeds/moving'
    },
    {
        slug: 'listed',
        name: 'Listed',
        query: '/feeds/listed'
    },
    {
        slug: 'sold',
        name: 'Sold',
        query: '/feeds/accepted'
    }
]

export async function getServerSideProps(ctx: any) {
    return { props: ctx.query }
}

export default function Explore({ feed: feedFromProps }) {
    const router = useRouter()

    const feedFromQuery = feedFromProps ? feeds.find((search) => search.slug === feedFromProps[0]) : feeds[0]

    const [feed, setFeed] = useState(feedFromQuery)
    const { data, error } = useSWR(feed.query)

    const navigateToFeed = (feedId) => {
        const newFeed = feeds[feedId]
        setFeed(newFeed)
        router.push(`/explore/${newFeed.slug}`, `/explore/${newFeed.slug}`, { shallow: true })
    }

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            {/* {JSON.stringify(feedFromProps)} */}
            <div className="flex gap-4 items-center overflow-auto whitespace-nowrap no-scrollbar">
                <div className="flex-1 flex gap-4">
                    {feeds.map(({ slug, name }, index) => (
                        <Button className={classNames(feed.slug === slug && 'bg-blue-500')} key={slug} onClick={() => navigateToFeed(index)}>
                            {name}
                        </Button>
                    ))}
                </div>
                <div>
                    <Link href="/search" passHref>
                        <a>
                            <Button>Search </Button>
                        </a>
                    </Link>
                </div>
            </div>

            {!error && !data && (
                <div>
                    <p className="opacity-50">
                        <ReactTyped strings={['Loading...']} loop />
                    </p>
                </div>
            )}

            {error && (
                <div>
                    <p className="opacity-50">An error has occurred. Please check back in a few minutes.</p>
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
                        <>{nft &&
                            <ImageBox nft={nft} key={nft._id} />
                        }</>
                    ))}
                </div>
            )}
        </div>
    )
}
