import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import CreateCollection from '../../components/CreateCollection'
import CreateNft from '../../components/CreateNft'
import TokenLookup from '../../components/TokenLookup'

const tabs = [
    { slug: 'create', href: '/create', title: 'Create' },
    { slug: 'import', href: '/create/import', title: 'Import' },
    { slug: 'collection', href: '/create/collection', title: 'Create Collection' }
]

export async function getServerSideProps(ctx) {
    return { props: ctx.query }
}

export default function Index({ args }) {
    const router = useRouter()

    const tabFromQuery = args ? args[0] : null
    const contractAddressFromQuery = args ? args[1] : null

    const findTab = (slug) => tabs.find((tab) => tab.slug === slug)

    const [tab, setTab] = useState(findTab(tabFromQuery) || tabs[0])

    useEffect(() => router.push(tab.href, tab.href, { shallow: true }), [tab])

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            <div className="flex gap-4 overflow-auto whitespace-nowrap no-scrollbar">
                {tabs.map(({ slug, title }) => (
                    <Button onClick={() => setTab(findTab(slug))}>{title}</Button>
                ))}
            </div>

            {tab.slug === 'create' && <CreateNft />}
            {tab.slug === 'import' && <TokenLookup />}
            {tab.slug === 'collection' && <CreateCollection />}
            {tab.slug === 'collection' && contractAddressFromQuery && <CreateNft contractAddress={contractAddressFromQuery} />}

            {contractAddressFromQuery}
        </div>
    )
}
