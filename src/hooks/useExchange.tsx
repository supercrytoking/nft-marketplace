import Web3 from 'web3'
import { useWallet } from 'use-wallet'
import { useState } from 'react'
import { erc721, exchange } from '../data/abis'

export default function useExchange() {
    const wallet = useWallet()
    const web3 = new Web3(wallet.account ? wallet.ethereum : 'https://rpc.ftm.tools')
    const contract = new web3.eth.Contract(exchange as any, process.env.NEXT_PUBLIC_EXCHANGE_CONTRACT as any)

    const [status, setStatus] = useState<'idle' | 'creating' | 'revoking' | 'accepting' | 'error'>('idle')

    const doApprovalCheck = async (contractAddress: string, tokenId: string) => {
        const erc721Contract = new web3.eth.Contract(erc721 as any, contractAddress)
        const getApproved = await erc721Contract.methods.getApproved(tokenId).call()
        const isApproved = Web3.utils.toChecksumAddress(getApproved) === Web3.utils.toChecksumAddress(process.env.NEXT_PUBLIC_EXCHANGE_CONTRACT)

        if (!isApproved) {
            await erc721Contract.methods.approve(process.env.NEXT_PUBLIC_EXCHANGE_CONTRACT, tokenId).send({ from: wallet.account })
        }
    }

    const createListing = async (contractAddress: string, tokenId: string, price: any) => {
        try {
            if (!wallet.account) return wallet.connect()
            await doApprovalCheck(contractAddress, tokenId)
            setStatus('creating')
            await contract.methods.createListing(contractAddress, tokenId, price).send({ from: wallet.account })
        } catch (error) {
            setStatus('error')
            console.log(error)
        }
    }

    const revokeListing = async (contractAddress: string, tokenId: string) => {
        try {
            if (!wallet.account) return wallet.connect()
            setStatus('revoking')
            await contract.methods.revokeListing(contractAddress, tokenId).send({ from: wallet.account })
        } catch (error) {
            setStatus('error')
            console.log(error)
        }
    }

    const acceptListing = async (contractAddress: string, tokenId: string, price) => {
        try {
            if (!wallet.account) return wallet.connect()
            setStatus('accepting')
            await contract.methods.acceptListing(contractAddress, tokenId).send({ value: price, from: wallet.account })
        } catch (error) {
            setStatus('error')
            console.log(error)
        }
    }

    return {
        createListing,
        revokeListing,
        acceptListing,
        status
    }
}
