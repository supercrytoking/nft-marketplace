import classNames from "classnames";
import { useEffect } from "react";
import useSWR from "swr"
import SideBar from "./Sidebar"

export default function AttributesSidebar({ visible, onClose, contractAddress, match, setMatch }) {

    const { data: attributes } = useSWR(`/attributes/${contractAddress}`)

    const grouped = attributes?.reduce(function (r, a) {
        r[a.trait_type] = r[a.trait_type] || [];
        r[a.trait_type].push(a);
        return r;
    }, Object.create(null))


    const hasAttribute = (attribute) => match && match.includes(attribute)
    const removeAttribute = (attribute) => {
        const copy = [...match]
        const filter = copy.filter(search => search !== attribute)
        setMatch(filter)
    }

    const addAttribute = (attribute) => {
        removeAttribute(attribute)
        const copy = [...match]
        copy.push(attribute)
        setMatch(copy)
    }

    const toggleAttribute = (attribute) => hasAttribute(attribute) ? removeAttribute(attribute) : addAttribute(attribute)


    return <SideBar {...{ visible, onClose }}>
        {grouped && <div>
            {Object.keys(grouped).sort((a, b) => a?.localeCompare(b))?.map(attributeGroupKey => {
                const attributeGroup = grouped[attributeGroupKey].sort((a, b) => ((a?.rate - b?.rate) || a?.value?.localeCompare(b?.value)))
                return <div>

                    <div className="py-2 px-4 bg-zinc-700">
                        <p>{attributeGroupKey}</p>
                    </div>

                    <div className="divide divide-y divide-zinc-700">
                        {attributeGroup.map(attribute => (
                            <button onClick={() => toggleAttribute(attribute.value)} className="opacity-75 hover:opacity-100 flex gap-4 w-full text-left items-center py-2 px-4">
                                <p className="flex-1">{attribute.value}</p>
                                <p>{Number(attribute.rate).toFixed(2)}%</p>
                                <p>
                                    <i className={classNames("fas", hasAttribute(attribute.value) ? 'fa-square-check text-blue-500' : 'fa-square')} />
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            })}

        </div>}
    </SideBar>
}