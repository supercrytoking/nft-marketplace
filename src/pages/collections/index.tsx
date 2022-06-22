import Link from "next/link"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import useSWR from "swr"
import { imageUrl } from "../../utils/utils"

export default function CollectionsIndex() {
    const { data: collections } = useSWR('/collections')

    const largeGrid = true

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12 w-full">
            {collections && <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: largeGrid ? 1 : 2, 750: largeGrid ? 2 : 4, 900: largeGrid ? 3 : 5 }}
            >
                <Masonry
                    gutter="2em"
                >{collections.map(collection =>
                    <Link href={collection.contractAddress}>
                        <a className="bg-white rounded overflow-hidden transform transition hover:-translate-y-2">
                            <img loading="lazy" className="w-full" src={imageUrl(collection.image[0])} alt="" />
                            <div className="p-6 text-center">
                                <p className="text-zinc-900 truncate uppercase font-extended text-xl">{collection.name}</p>
                                <p>{collection.totalSupply} Items</p>
                            </div>
                        </a>
                    </Link>
                )}
                </Masonry>
            </ResponsiveMasonry>}
        </div>
    )
}
