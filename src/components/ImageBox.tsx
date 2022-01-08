import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LazyLoad from 'react-lazyload'
import useOnScreen from '../hooks/useOnScreen'
import hash from 'hash-string'
import { api, cacheImage } from '../utils/utils'
import axios from 'axios'

export default function ImageBox({ nft }) {
    const imageId = hash(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))
    const baseURL = `https://enbzwejmbbmiirvimcib.supabase.in/storage/v1/object/public/cache/${imageId}`
    // const baseURL = cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))

    const [isLoaded, setIsLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [imageBinary, setImageBinary] = useState(null)

    const boxRef = useRef()
    const ref = useRef()
    const isVisible = useOnScreen(boxRef)

    const queueImage = async () => {
        setRefreshing(true)
        if (!refreshing) {
            console.log('Queueing...')
            try {
                await api.get(cacheImage(nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')))
            } catch (error) {
                queueImage()
            }
        }
    }

    useEffect(() => {
        if (isLoaded) return
        if (!ref) return

        const timer = setInterval(() => {
            if (!ref.current) return
            console.log('Trying to load again...', nft.contractAddress, nft.tokenId)
            ref.current.src = ref.current.src
        }, 1000)
        return () => clearInterval(timer)
    }, [isLoaded, ref])

    useEffect(() => {
        if (!ref.current) return
        if (isLoaded) return
        if (!isVisible) ref.current.src = ''
        if (isVisible) ref.current.src = baseURL
    }, [ref, isVisible, isLoaded])

    useEffect(() => {
        const onLoad = async () => {
            try {
                const { data } = await axios.get(baseURL, {
                    responseType: 'arraybuffer'
                })

                if (data) {
                    const binary = Buffer.from(data, 'binary').toString('base64')
                    setImageBinary(binary)
                    return
                }
            } catch (error) {
                queueImage()
                console.log(error)
            }
        }
        onLoad()
    }, [])

    return (
        <>
            <Link key={`${nft.contractAddress}-${nft.tokenId}`} href={`/${nft.contractAddress}/${nft.tokenId}`}>
                <a ref={boxRef} className="relative rounded bg-zinc-900 border-zinc-800 border overflow-hidden flex items-center justify-center h-full ">
                    {!isLoaded && <img className="absolute" src={'/img/loading.gif'} alt="" />}
                    <img
                        ref={ref}
                        className="h-full relative"
                        src={`data:image/jpeg;charset=utf-8;base64,${imageBinary}`}
                        // onLoad={() => setIsLoaded(true)}
                        // onError={(e) => {
                        //     setIsLoaded(false)
                        //     console.log('error')
                        //     queueImage()
                        // }}
                        alt=""
                    />
                </a>
            </Link>
        </>
    )
}
