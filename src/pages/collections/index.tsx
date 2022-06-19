import useSWR from "swr"
import TokenMasonry from "../../components/TokenMasonry"

export default function CollectionsIndex() {
    const { data } = useSWR('/collections')

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12 w-full">
            {data && <TokenMasonry tokens={data} />}
        </div>
    )
}
