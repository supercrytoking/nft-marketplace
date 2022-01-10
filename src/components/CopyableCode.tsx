import classNames from 'classnames'
import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

export default function CopyableCode({ label, multiLine, children }) {
    const [recentlyClicked, setRecentlyClicked] = useState(false)

    useEffect(() => {
        setTimeout(() => setRecentlyClicked(false), 1000)
    }, [recentlyClicked])

    return (
        <CopyToClipboard text={children}>
            <div className="block" onClick={() => setRecentlyClicked(true)}>
                {label && (
                    <p className="mb-1 text-xs">
                        {label} <span className="opacity-50">click to copy</span>
                    </p>
                )}
                <p className={classNames('bg-zinc-900 p-2 border-zinc-800 border rounded no-scrollbar relative break-all', recentlyClicked && 'text-center', !multiLine && 'whitespace-nowrap overflow-auto ')}>
                    {recentlyClicked && <span>copied!</span>}
                    {!recentlyClicked && children}
                </p>
            </div>
        </CopyToClipboard>
    )
}
