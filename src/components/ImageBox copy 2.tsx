import axios from 'axios'
import classNames from 'classnames'
import hash from 'hash-string'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import { useIsScrolling } from 'react-use-is-scrolling'
import LazyLoad from 'react-lazyload'
import useWallet from 'use-wallet'
import Web3 from 'web3'
import useOnScreen from '../hooks/useOnScreen'
import { api, cacheImage, imageCacheUrl, imageUrl } from '../utils/utils'

const fetcher = (url) => axios.get(url, { responseType: 'arraybuffer' }).then((res) => res.data)

export default function ImageBox({ nft }) {
    const wallet = useWallet()

    const imageId = hash(nft.metadata.image)

    const ref = useRef()
    const isVisible = useOnScreen(ref, '1000px')

    const { data: cachedImageData, error: cacheImageError } = useSWR(isVisible ? `${imageCacheUrl}/${imageId}` : null, fetcher)
    const { data: defaultImage } = useSWR(cacheImageError && isVisible ? `${imageUrl(nft.metadata.image)}` : null, fetcher)

    const binaryToBase64 = (data) => (data ? Buffer.from(data, 'binary').toString('base64') : null)
    const imageData = binaryToBase64(defaultImage || cachedImageData)

    useEffect(() => {
        if (!isVisible) return
        if (cachedImageData) return
        if (!cacheImageError) return

        const onLoad = async () => api.get(cacheImage(nft.metadata.image)).catch(() => {})
        onLoad()
    }, [isVisible, cachedImageData, cacheImageError])

    const web3 = new Web3(wallet.account ? wallet.ethereum : `${process.env.NEXT_PUBLIC_RPC}`)

    const like = async (e) => {
        try {
            e.preventDefault()
            if (!wallet.account) return wallet.connect()
            const signature = await web3.eth.personal.sign('I am who I say I am.', wallet.account, '')
            api.post('/social/like', {
                contractAddress: nft.contractAddress,
                tokenId: nft.tokenId,
                signature
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
            <a ref={ref} className={classNames('relative group rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex flex-col items-center justify-center h-full', !imageData && 'square')}>
                {/* <div className="hidden group-hover:block absolute top-0 right-0 p-4 z-20">
                    <button onClick={like} type="button">
                        <i className="fas fa-heart" />
                    </button>
                </div> */}
                {!imageData && (
                    <div className="content w-full h-full flex items-center justify-center">
                        <p className="animate-spin">x</p>
                    </div>
                )}
                {imageData && <img src={`data:image/jpeg;charset=utf-8;base64,${imageData}`} alt="" />}
            </a>
        </Link>
    )
}
