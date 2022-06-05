import { useState } from "react";
import useSWR from "swr";
import { indexCollection } from "../utils/utils";
import Button from "./Button";
import Input from "./Input";

export default function CollectionIndexer() {
    const [status, setStaus] = useState('idle')
    const [input, setInput] = useState()

    return <div className="space-y-4">
        <p>Collecton Indexer</p>
        <div className="flex-1" >
            <Input value={input} onChange={e => setInput(e.target.value)} label="Contract Address" />
        </div>
        <Button loading={status === 'loading'} onClick={async () => {
            setStaus('loading')
            await indexCollection(input)
            setStaus('idle')
        }}>Index Contract</Button>
    </div>
}