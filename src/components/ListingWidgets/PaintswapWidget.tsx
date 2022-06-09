import useSWR from "swr"
import Web3 from "web3"

interface PaintswapWidgetInterface {
    contractAddress: string
    tokenId: string
}

export default function PaintswapWidget({ contractAddress, tokenId }: PaintswapWidgetInterface) {
    const { data } = useSWR(
        `https://api.paintswap.finance/marketplace/${contractAddress}/${tokenId}?numToFetch=50&numToSkip=0&orderBy=price`
    )
    const listing = data && data.sales[0]
    const price = listing && listing.price

    if (!listing) return <></>
    return <div className="bg-white text-zinc-900 p-4 text-sm rounded flex flex-wrap">
        <a href={`https://paintswap.finance/marketplace/${listing.id}`} target="_blank" className="flex items-center flex-1">
            <img className="w-5 mr-2 rounded" src="/img/logos/paintswap.png" alt="" />
            <p className="mr-2">Paintswap</p>
            <i className="fa-solid fa-square-arrow-up-right" />
        </a>
        <p>{price && Web3.utils.fromWei(price)} FTM</p>
    </div>
}