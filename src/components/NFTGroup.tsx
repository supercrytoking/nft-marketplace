import classNames from "classnames"
import Link from "next/link"
import { useState } from "react"
import { imageUrl } from "../utils/utils"
import Button from "./Button"
import ImageBox from "./ImageBox"
import TokenMasonry from "./TokenMasonry"

export default function NFTGroup({ items }) {

    const [open, setOpen] = useState()

    const firstItem = items[0]
    const contract = firstItem.contract

    return <div className={classNames("space-y-6")}>
        <button className={classNames("group flex w-full text-left gap-4 p-4 hover:bg-zinc-800 rounded items-center hover", open && 'bg-zinc-800')} onClick={() => setOpen(_ => !_)}>
            <div className="flex flex-1 items-center gap-4">
                <div style={{ backgroundImage: `url("${imageUrl(firstItem.metadata.image)}")` }} className="w-12 h-12 border-white border-opacity-10 bg-black bg-opacity-25 rounded bg-center bg-cover" />
                {/* <img className="w-12 border " src={} /> */}
                <div>
                    <p>{contract?.name || 'Unknown Collection'} </p>
                    <p>{items.length} items</p>
                </div>
            </div>
            <Link href={`/${firstItem.contractAddress}`}><a className="underline hover:no-underline opacity-50 hover:opacity-100">View Marketplace</a></Link>
            <p>{open ? <><Button>Close</Button></> : <Button>Open</Button>}</p>
        </button>

        {open && <TokenMasonry tokens={items} />}



        {/* {open && <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((nft) => (
                <ImageBox nft={nft} />
            ))}
        </div>} */}
    </div>
}