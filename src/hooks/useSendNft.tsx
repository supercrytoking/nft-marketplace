import { useState } from "react"
import { useWallet } from "use-wallet"
import { erc721ABI, useContractWrite } from "wagmi"
import Web3 from "web3"
import { erc721 } from "../data/abis"

export const useSendNft = (contractAddress, tokenId, to) => {

    const wallet = useWallet()
    const web3 = new Web3(wallet.ethereum || process.env.NEXT_PUBLIC_RPC)
    const contract = new web3.eth.Contract(erc721 as any, contractAddress)

    const [status, setStaus] = useState('idle')
    const [tx, setTx] = useState('')

    const send = async () => {
        try {
            setStaus('loading')
            const gasPrice = await web3.eth.getGasPrice()
            const interaction = await contract.methods.transferFrom(wallet.account, to, tokenId).send({ gasPrice, from: wallet.account })
            setTx(interaction.transactionHash)
            setStaus('complete')
            return interaction
        } catch (error) {
            console.log(error)
            setStaus('error')
            return null
        }
    }

    return { send, tx, status }

}