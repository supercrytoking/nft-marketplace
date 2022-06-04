import { send } from "process";
import { useState } from "react";
import { useSendNft } from "../hooks/useSendNft";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

export default function SendModal({ visible, onClose, nft }) {
    const [toAddress, setToAddress] = useState()
    const { send, tx, status } = useSendNft(nft.contract, nft.id, toAddress)

    return <Modal {...{ visible, onClose }}>
        <div className="space-y-4">
            <Input placeholder="0x2831DE5613AbE521BAF8B974F36342c40037b9c" label="Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />

            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Button onClick={send}>Send NFT</Button>
                </div>

                <div className="text-xs text-right opacity-50 max-w-xs truncate">
                    {status !== 'idle' && <p className="truncate">
                        <span>{status}</span>
                        {status === 'loading' && <i className="fas fa-circle-notch fa-spin ml-2" />}
                    </p>}
                    {tx && <a href={`https://ftmscan.com/tx/${tx}`} target="_blank" className="truncate underline hover:no-underline">{tx}</a>}
                </div>
            </div>
        </div>
    </Modal>
}