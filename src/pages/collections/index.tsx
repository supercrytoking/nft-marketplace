import Link from "next/link"
import useSWR from "swr"

export default function CollectionsIndex() {
    const { data } = useSWR('/data/collections')
    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            {data && <div className="grid grid-cols-2 gap-6">
                {data.map(contract => {
                    return <Link href={`/${contract.contractAddress}`}>
                        <a className="bg-zinc-400 text-zinc-900 p-4 text-xl opacity-75 hover:opacity-100">
                            <p>{contract.name}</p>
                        </a>
                    </Link>
                })}
            </div>}
        </div>
    )
}
