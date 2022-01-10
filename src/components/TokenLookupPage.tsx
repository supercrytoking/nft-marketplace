import TokenLookup from './TokenLookup'

export default function TokenLookupPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div className="space-y-2">
                    <p>Import a Token</p>
                    <p>You can quickly import tokens minted off-site here. All ERC721-compliant tokens minted on the Fantom blockchain are available are will appear.</p>
                    <p>To import a token, you'll need it's contract address and token ID found in your transaction record.</p>
                </div>
                {/* <div>
                    <CopyableCode multiLine label="Non-fungible Token Metadata">
                        123
                    </CopyableCode>
                </div> */}
            </div>
            <div>
                <TokenLookup />
            </div>
        </div>
    )
}
