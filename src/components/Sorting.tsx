export const SortingItem = ({ option }) => {
    return <div className="flex">
        <p className="flex-1">{option}</p>
        <p>1</p>
    </div>
}

export default function Sorting() {

    const options = ['rarity', 'tokenId', 'blockNumberMinted']

    return <div className="max-w-sm">
        {options.map(option => <SortingItem option={option} />)}
    </div>
}