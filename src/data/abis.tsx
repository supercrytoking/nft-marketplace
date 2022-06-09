export const exchange = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'acceptListing',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256'
            }
        ],
        name: 'createListing',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'revokeListing',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'price',
                type: 'uint256'
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'eventType',
                type: 'string'
            }
        ],
        name: 'MarketplaceEvent',
        type: 'event'
    },
    {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'Listings',
        outputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                internalType: 'address',
                name: 'contractAddress',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256'
            },
            {
                internalType: 'bool',
                name: 'exists',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
]

export const nftKey = [{ "inputs": [{ "internalType": "address", "name": "_paymentTokenAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "feeFraction", "type": "uint256" }], "name": "SetRoyalty", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "indexed": false, "internalType": "struct INFTKEYMarketplaceV2.Bid", "name": "bid", "type": "tuple" }, { "indexed": false, "internalType": "uint256", "name": "serviceFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "royaltyFee", "type": "uint256" }], "name": "TokenBidAccepted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "indexed": false, "internalType": "struct INFTKEYMarketplaceV2.Bid", "name": "bid", "type": "tuple" }], "name": "TokenBidEntered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "indexed": false, "internalType": "struct INFTKEYMarketplaceV2.Bid", "name": "bid", "type": "tuple" }], "name": "TokenBidWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "indexed": false, "internalType": "struct INFTKEYMarketplaceV2.Listing", "name": "listing", "type": "tuple" }, { "indexed": false, "internalType": "uint256", "name": "serviceFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "royaltyFee", "type": "uint256" }], "name": "TokenBought", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "indexed": false, "internalType": "struct INFTKEYMarketplaceV2.Listing", "name": "listing", "type": "tuple" }], "name": "TokenDelisted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "erc721Address", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "indexed": false, "internalType": "struct INFTKEYMarketplaceV2.Listing", "name": "listing", "type": "tuple" }], "name": "TokenListed", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "acceptBidForToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "actionTimeOutRangeMax", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "actionTimeOutRangeMin", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "buyToken", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "enabled", "type": "bool" }], "name": "changeMarketplaceStatus", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "timeInSec", "type": "uint256" }], "name": "changeMaxActionTimeLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "timeInSec", "type": "uint256" }], "name": "changeMinActionTimeLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "serviceFeeFraction_", "type": "uint8" }], "name": "changeSeriveFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "defaultRoyaltyFraction", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "delistToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "name": "enterBidForToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "from", "type": "uint256" }, { "internalType": "uint256", "name": "size", "type": "uint256" }], "name": "getBidderBids", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Bid[]", "name": "bidderBids", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }], "name": "getBidderTokenBid", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Bid", "name": "validBid", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getTokenBids", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Bid[]", "name": "bids", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getTokenHighestBid", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Bid", "name": "highestBid", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "from", "type": "uint256" }, { "internalType": "uint256", "name": "size", "type": "uint256" }], "name": "getTokenHighestBids", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Bid[]", "name": "highestBids", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getTokenListing", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Listing", "name": "validListing", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "from", "type": "uint256" }, { "internalType": "uint256", "name": "size", "type": "uint256" }], "name": "getTokenListings", "outputs": [{ "components": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "internalType": "struct INFTKEYMarketplaceV2.Listing[]", "name": "listings", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isTradingEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "expireTimestamp", "type": "uint256" }], "name": "listToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }], "name": "numTokenListings", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }], "name": "numTokenWithBids", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paymentToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }], "name": "royalty", "outputs": [{ "components": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "feeFraction", "type": "uint256" }, { "internalType": "address", "name": "setBy", "type": "address" }], "internalType": "struct INFTKEYMarketplaceRoyalty.ERC721CollectionRoyalty", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "royaltyUpperLimit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "serviceFee", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "address", "name": "newRecipient", "type": "address" }, { "internalType": "uint256", "name": "feeFraction", "type": "uint256" }], "name": "setRoyalty", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "address", "name": "newRecipient", "type": "address" }, { "internalType": "uint256", "name": "feeFraction", "type": "uint256" }], "name": "setRoyaltyForCollection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newUpperLimit", "type": "uint256" }], "name": "updateRoyaltyUpperLimit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "erc721Address", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "withdrawBidForToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]


export const erc721 = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'approved',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'Approval',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'approved',
                type: 'bool'
            }
        ],
        name: 'ApprovalForAll',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address'
            }
        ],
        name: 'OwnershipTransferred',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'Paused',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'Transfer',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'Unpaused',
        type: 'event'
    },
    {
        inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'baseURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'endingBlock',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' }
        ],
        name: 'isApprovedForAll',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'maxSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'string', name: 'uri', type: 'string' }],
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'paused',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'price',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'string', name: 'uri', type: 'string' }
        ],
        name: 'safeMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'bytes', name: '_data', type: 'bytes' }
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'operator', type: 'address' },
            { internalType: 'bool', name: 'approved', type: 'bool' }
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'string', name: 'newBaseURI', type: 'string' }],
        name: 'setBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'newEndingBlock', type: 'uint256' }],
        name: 'setEndingBlock',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'newMaxSupply', type: 'uint256' }],
        name: 'setMaxSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'newPrice', type: 'uint256' }],
        name: 'setPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'newStartingBlock', type: 'uint256' }],
        name: 'setStartingBlock',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'newWalletCap', type: 'uint256' }],
        name: 'setWalletCap',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'startingBlock',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: 'blacklistAddress', type: 'address' }],
        name: 'toggleBlacklist',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'uint256', name: 'index', type: 'uint256' }
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'unpause',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'walletCap',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function'
    }
]
