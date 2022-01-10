import { useState } from 'react'
import useSWR from 'swr'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Button from './Button'
import CopyableCode from './CopyableCode'
import Input from './Input'

export default function CreateCollection() {
    const wallet = useWallet()

    const web3 = new Web3(wallet.ethereum)

    const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle')
    const [contractName, setContractName] = useState('')
    const [contractTicker, setContractTicker] = useState('')
    const [contractAddress, setContractAddress] = useState('')

    const { data, isValidating } = useSWR(contractName && contractTicker ? encodeURI(`http://localhost:8888/deploy?name=${contractName}&ticker=${contractTicker}`) : null)

    const Contract = data ? new web3.eth.Contract(data.abi) : null

    const onClick = async () => {
        try {
            if (!wallet.account) return wallet.connect()
            setStatus('loading')
            const gas = await Contract.deploy({ data: `${data.bytecode}` }).estimateGas()
            console.log(gas)
            const deploy = await Contract.deploy({ data: `${data.bytecode}` }).send({ from: wallet.account })
            setContractAddress(deploy._address)
            setStatus('complete')
        } catch (error) {
            console.log(error)
        }
    }

    return (
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
                        <CopyableCode label="Contract ABI">{JSON.stringify(data.abi)}</CopyableCode>
                        <CopyableCode label="Contract Bytecode">{data.bytecode}</CopyableCode>
                        <CopyableCode label="Contract Source Code">{data.source}</CopyableCode>
                    </div>
                )}
            </div>
            <div className="space-y-6">
                <form className="space-y-4">
                    <Input label="Collection Name" value={contractName} onChange={(e) => setContractName(e.target.value)} />
                    <Input label="Collection Ticker" value={contractTicker} onChange={(e) => setContractTicker(e.target.value)} />
                    <div className="flex justify-end">
                        <Button onClick={onClick} loading={status === 'loading' || (contractName && contractTicker && isValidating && wallet.account)} disabled={wallet.account && !(contractName && contractTicker)}>
                            {wallet.account ? 'Deploy' : 'Connect Wallet'}
                        </Button>
                    </div>
                </form>

                {contractAddress && (
                    <div className="space-y-2">
                        <p>
                            Hooray! Your smart contract has been{' '}
                            <a href={`https://testnet.ftmscan.com/address/${contractAddress}`} target="_blank" rel="noreferrer" className="underline hover:no-underline">
                                published
                            </a>
                            !
                        </p>
                        <CopyableCode label="Contract Address">{contractAddress}</CopyableCode>
                        <p>
                            You can now publish your items to your collection on the{' '}
                            <a href={`/collections/${contractAddress}`} target="_blank" rel="noreferrer" className="underline hover:no-underline">
                                collection page
                            </a>
                            .
                        </p>

                        <p>
                            We recommened{' '}
                            <a
                                href={`https://testnet.ftmscan.com/verifyContract-solc?a=${contractAddress}&c=v0.8.11%2bcommit.d7f03943&lictype=3`}
                                target="_blank"
                                rel="noreferrer"
                                className="underline hover:not-underline"
                            >
                                verifying your smart contract on ftmscan
                            </a>
                            . You will need to copy and paste the source code below:
                        </p>
                        <CopyableCode label="Contract Source Code">{data.source}</CopyableCode>
                    </div>
                )}
            </div>
        </div>
    )
}
