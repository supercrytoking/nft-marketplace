import axios from 'axios'
import classNames from 'classnames'
import hash from 'hash-string'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'
import { useIsScrolling } from 'react-use-is-scrolling'
import LazyLoad from 'react-lazyload'
import useOnScreen from '../hooks/useOnScreen'
import { api, cacheImage, imageCacheUrl, imageUrl } from '../utils/utils'

const fetcher = (url) => axios.get(url, { responseType: 'arraybuffer' }).then((res) => res.data)

export default function ImageBox({ nft }) {
    const imageId = hash(nft.metadata.image)

    const turnedOff = true
    const ref = useRef()
    const isVisible = useOnScreen(ref, '1000px')
    const { isScrolling } = useIsScrolling()

    const { data: defaultImage } = useSWR(isVisible ? `${imageUrl(nft.metadata.image)}` : null, fetcher)
    const { data: cachedImageData, error: cacheImageError } = useSWR(!defaultImage && isVisible ? `${imageCacheUrl}/${imageId}` : null, fetcher)

    const binaryToBase64 = (data) => (data ? Buffer.from(data, 'binary').toString('base64') : null)
    const imageData = binaryToBase64(defaultImage || cachedImageData)

    useEffect(() => {
        if (!isVisible) return
        if (cachedImageData) return

        const onLoad = async () => api.get(cacheImage(nft.metadata.image)).catch(() => {})
        onLoad()
    }, [isVisible, cachedImageData])

    return (
        <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
            <a ref={ref} className={classNames('relative rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex flex-col items-center justify-center h-full', !imageData && 'square')}>
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
