import { useEffect, useState } from "react"
import ImageBox from "./ImageBox copy 2"

export default function NFTGroup({ items }) {


    const [open, setOpen] = useState()

    const contract = items[0]?.contract
    const contractName = contract?.name

    return <div className="space-y-6">
        <div className="space-y-2">
            <button className="flex w-full text-left" onClick={() => setOpen(_ => !_)}>
                <p className="flex-1">{contractName || 'Unknown Collection'} ({items.length} items)</p>
                <p>{open ? <>&uarr;</> : <>&darr;</>}</p>
            </button>
        </div>
        {open && <div>
            <p>{contract?.contractAddress}</p>
        </div>}
        {open && <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((nft) => (
                <ImageBox nft={nft} />
            ))}
        </div>}
    </div>
}