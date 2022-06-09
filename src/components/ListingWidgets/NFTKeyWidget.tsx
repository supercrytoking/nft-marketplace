import { useEffect } from "react"
import useSWR from "swr"
import Web3 from "web3"
import { erc721, nftKey } from "../../data/abis"
import useContractRead from "../../hooks/useContractRead"

interface NFTKeyWidgetInterface {
    contractAddress: string
    tokenId: string
}

export default function NFTKeyWidget({ contractAddress, tokenId }: NFTKeyWidgetInterface) {
    const { data: listing } = useContractRead(
        {
            addressOrName: '0x1A7d6ed890b6C284271AD27E7AbE8Fb5211D0739',
            contractInterface: nftKey
        },
        'getTokenListing',
        [contractAddress, tokenId]
    )
    const price = listing && listing.value
    const isListed = listing && price !== '0'

    if (!isListed) return <></>
    return <div className="bg-gray-600 text-zinc-300 p-4 text-sm rounded flex items-center flex-wrap">
        <a className="flex items-center flex-1">
            <img className="w-5 mr-2 rounded" src="/img/logos/nftkey.png" alt="" />
            <p className="mr-2">NFTKey</p>
            {/* <i className="fa-solid fa-square-arrow-up-right" /> */}
        </a>
        <p>{price && Web3.utils.fromWei(price)} FTM</p>
    </div>
}