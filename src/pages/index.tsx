import useSWR from 'swr'
import Link from 'next/link'
import { formatPricing } from '../utils/utils'

export default function IndexPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white text-black h-96 flex items-center justify-center">
                <p className="text-2xl">Welcome to a new kind of marketplace.</p>
            </div>
        </div>
    )
}
