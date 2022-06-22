import Web3 from 'web3'
import commaNumber from 'comma-number'
import shortNumber from 'short-number'
import axios from 'axios'
import { mutate } from 'swr'

// export const apiUrl = 'https://api.fantom.digital'
export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api.fantom.digital' : 'http://localhost:8888'
export const api = axios.create({ baseURL: apiUrl })

export const imageCacheUrl = 'https://enbzwejmbbmiirvimcib.supabase.in/storage/v1/object/public/cache'
export const ipfsGateway = 'https://ftmdead.mypinata.cloud/ipfs/'
export const imageUrl = (string = "") => {
    string = string.replace('ipfs://', ipfsGateway)
    string = string.replace('https://ipfs.io/ipfs/', ipfsGateway)
    string = string.replace('https://ipfs.io/ipfs/', ipfsGateway)
    string = string.replace('https://gateway.pinata.cloud/ipfs/', ipfsGateway)
    return `${string}`
    // return `http://nft-marketplace-optimizer.alsina.xyz/image/${string}`
}

export const indexCollection = async (contractAddress: string) => {
    const run = await api.post(`/indexr/collection/${contractAddress}?all=true`)
    await mutate('/stats')
    return run
}

export const cacheImage = (url: string) => `${apiUrl}/cache/${encodeURIComponent(url)}`
// export const cacheImage = (url: string) => url
export const formatPricing = (price) => `${Number(price) > 10000 ? shortNumber(Number(Web3.utils.fromWei(price))) : commaNumber(Number(Web3.utils.fromWei(price)))} FTM`

