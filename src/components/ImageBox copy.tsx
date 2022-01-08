import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LazyLoad from 'react-lazyload'
import useOnScreen from '../hooks/useOnScreen'
import hash from 'hash-string'
import { api, cacheImage } from '../utils/utils'
import axios from 'axios'
import classNames from 'classnames'

export default function ImageBox({ nft }) {
    const imageId = hash(nft.metadata.image)
    const baseURL = `https://enbzwejmbbmiirvimcib.supabase.in/storage/v1/object/public/cache/${imageId}`

    const [isLoaded, setIsLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [imageBinary, setImageBinary] = useState(null)

    const boxRef = useRef()
    const ref = useRef()
    const isVisible = useOnScreen(boxRef)

    const controller = new AbortController()

    useEffect(() => {
        if (!isVisible) {
            console.log('aboritn bv invis')
            controller.abort()
        }
    }, [isVisible])

    useEffect(() => {
        if (imageBinary) return
        if (!isVisible) return

        const onLoad = async () => {
            try {
                console.log('Getting image again...')

                const { data } = await axios.get(baseURL, {
                    responseType: 'arraybuffer'
                })

                if (data) {
                    const binary = Buffer.from(data, 'binary').toString('base64')
                    setImageBinary(binary)
                    return
                }
            } catch (error) {
                if (refreshing) return
                try {
                    setRefreshing(true)
                    await api.get(cacheImage(nft.metadata.image), { signal: controller.signal })
                } catch (error) {
                    setRefreshing(false)
                }
                console.log(error)
            }
        }

        onLoad()

        const timer = setInterval(onLoad, 1000)
        return () => clearInterval(timer)
    }, [isVisible, imageBinary, refreshing])

    return (
        <>
            <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
                <div>
                    <a ref={boxRef} className={classNames('relative rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center justify-center h-full', !imageBinary && 'square')}>
                        {!imageBinary && (
                            <div className="content">
                                <img className="" src={'/img/loading.gif'} alt="" />
                            </div>
                        )}
                        <img ref={ref} className="" src={`data:image/jpeg;charset=utf-8;base64,${imageBinary}`} alt="" />
                    </a>
                </div>
            </Link>
        </>
    )
}
