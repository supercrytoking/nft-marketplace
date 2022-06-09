import { useEffect, useState } from 'react'
import Web3 from 'web3'

// const { data: priceData } = (
//     {
//         addressOrName: process.env.NEXT_PUBLIC_ZENITH_ADDRESS,
//         contractInterface: erc721Abi
//     },
//     'getPrice'
// )

export default function useContractRead(config, method, args) {
    const [data, setData] = useState(null)
    const [status, setStatus] = useState('idle')
    const isLoading = status === 'loading'
    const isError = status === 'error'

    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC)
    const contract = new web3.eth.Contract(config.contractInterface, config.addressOrName)

    useEffect(() => {
        const onLoad = async () => {
            try {
                setStatus('loading')
                const result = await contract.methods[method](...args).call()
                setData(result)
                setStatus('idle')
            } catch (error) {
                setStatus('error')
            }
        }
        onLoad()
    }, [])

    return { data, status, isLoading, isError }
}
