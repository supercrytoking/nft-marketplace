import { useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Button from '../components/Button'
import Input from '../components/Input'
import Wallet from './wallet/[[...params]]'

export default function Test() {
    const wallet = useWallet()

    const web3 = new Web3(wallet.ethereum)

    const [contractName, setContractName] = useState('')
    const [contractTicker, setContractTicker] = useState('')

    const { data, isValidating } = useSWR(contractName && contractTicker ? encodeURI(`http://localhost:8888/deploy?name=${contractName}&symbol=${contractTicker}`) : null)

    const Contract = data ? new web3.eth.Contract(data.abi) : null

    const onClick = async () => {
        try {
            if (!wallet.account) return wallet.connect()
            const gas = await Contract.deploy({ data: `${data.bytecode}` }).estimateGas()
            console.log(gas)
            const deploy = await Contract.deploy({ data: `${data.bytecode}` }).send({ from: wallet.account })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-6 py-12 max-w-7xl mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p>Publish a Collection</p>
                        <p>Using this interface, you can publish your own colection on NFTs on your own custom smart contracts to the Fantom Blockchain.</p>
                        <p>To publish new items to your collection, you'll head to the collections newly generated collection page, where you'll have an option to "Publish" if you are the owner of the contract.</p>
                        <p>The contract follows the ERC721 standard, the most popular standard for NFTs. Therefore, it will be supported on all marketplaces.</p>
                        <p>After publishing your contract, we recommened verifying it on ftmscan. You'll need the following information to verify your contract. We recommend saving the following data:</p>
                    </div>

                    {!data && <p className="opacity-50">Data will appear when your contract is ready to be published.</p>}

                    {data && (
                        <div className="space-y-2">
                            <div>
                                <p className="mb-1 text-xs">abi</p>
                                <p className="bg-zinc-900 p-2 border-zinc-800 border rounded whitespace-nowrap overflow-auto">{JSON.stringify(data.abi)}</p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs">bytecode</p>
                                <p className="bg-zinc-900 p-2 border-zinc-800 border rounded whitespace-nowrap overflow-auto">{data.bytecode}</p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs">source</p>
                                <p className="bg-zinc-900 p-2 border-zinc-800 border rounded whitespace-nowrap overflow-auto">{JSON.stringify(data.source)}</p>
                            </div>
                        </div>
                    )}
                </div>
                <form className="space-y-4">
                    <Input label="Collection Name" value={contractName} onChange={(e) => setContractName(e.target.value)} />
                    <Input label="Collection Ticker" value={contractTicker} onChange={(e) => setContractTicker(e.target.value)} />

                    <div className="flex justify-end">
                        <Button onClick={onClick} loading={contractName && contractTicker && isValidating && wallet.account} disabled={wallet.account && !(contractName && contractTicker)}>
                            {wallet.account ? 'Deploy' : 'Connect Wallet'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
