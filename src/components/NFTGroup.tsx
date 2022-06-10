import classNames from "classnames"
import Link from "next/link"
import { useEffect, useState } from "react"
import { imageUrl } from "../utils/utils"
import Button from "./Button"
import ImageBox from "./ImageBox"

export default function NFTGroup({ items }) {

    const [open, setOpen] = useState()

    const firstItem = items[0]
    const contract = firstItem.contract

    return <div className={classNames("space-y-6")}>
        <button className="group flex w-full text-left gap-4 p-4 hover:bg-zinc-800 rounded items-center hover" onClick={() => setOpen(_ => !_)}>
            <div className="flex flex-1 items-center gap-4">
                <img className="w-12 border border-white border-opacity-10 bg-black bg-opacity-25 rounded" src={imageUrl(firstItem.metadata.image)} />
                <div>
                    <p>{contract.name || 'Unknown Collection'} </p>
                    <p>{items.length} items</p>
                </div>
            </div>
            <Link href={`/${contract.contractAddress}`}><a className="underline hover:no-underline opacity-50 hover:opacity-100">View Marketplace</a></Link>
            <p>{open ? <><Button>Close</Button></> : <Button>Open</Button>}</p>
        </button>
        {open && <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((nft) => (
                <ImageBox nft={nft} />
            ))}
        </div>}
    </div>
}